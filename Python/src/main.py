import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np
import tensorflow as tf

# предобработка ввода, токенизация, преобразование в числовой формат, добавление паддинга и преобразование в форму, которую принимает модель
def preprocess_input(text, tokenizer, max_len):
    text = [text]
    text = tokenizer.texts_to_sequences(text) # преобразование текста в числовые последовательности
    text = tf.keras.preprocessing.sequence.pad_sequences(text, maxlen=max_len, dtype='int32', padding='post', truncating='post') # добавление паддинга
    return text

# Загрузка данных из файла .xlsx
data = pd.read_excel("Python/docs/База знаний ответов.xlsx")

# Разделение данных на обучающий и тестовый наборы
train_data, test_data = train_test_split(data, test_size=0.2)

# Токенизация вопросов и масштабирование численных признаков
tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(train_data['Новая редакция вопроса'])
train_questions = tokenizer.texts_to_sequences(train_data['Новая редакция вопроса'])
test_questions = tokenizer.texts_to_sequences(test_data['Новая редакция вопроса'])

# Кодирование меток ответов
label_encoder = LabelEncoder()
label_encoder.fit(pd.concat([train_data['ОТВЕТ'], test_data['ОТВЕТ']]))
train_labels = label_encoder.transform(train_data['ОТВЕТ'])
test_labels = label_encoder.transform(test_data['ОТВЕТ'])
num_classes = np.max(train_labels) + 2  # Максимальное значение метки ответа

train_labels = tf.keras.utils.to_categorical(train_labels, num_classes)
test_labels = tf.keras.utils.to_categorical(test_labels, num_classes)

# Дополнительная предобработка: padding для создания одинаковой длины последовательности
max_len = max(data['Новая редакция вопроса'].apply(lambda x: len(x.split())))
train_padded = tf.keras.preprocessing.sequence.pad_sequences(train_questions, maxlen=max_len)
test_padded = tf.keras.preprocessing.sequence.pad_sequences(test_questions, maxlen=max_len)

# Создание и компиляция модели
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=64, input_length=max_len),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Обучение модели
history = model.fit(train_padded, train_labels, epochs=100, validation_data=(test_padded, test_labels))

loss, accuracy = model.evaluate(test_padded, test_labels)  # Оцениваем точность модели на тестовом наборе данных

print()
print('Test loss:', loss)  # Выводим значение функции потерь на тестовом наборе данных
print('Test accuracy:', accuracy)  # Выводим точность модели на тестовом наборе данных
print()

# задайте максимальную длину вопроса и используйте ваш токенизатор
max_len = 38

# Пример использования predict на одном вопросе
question = "Какой смысл жизни?"
processed_question = preprocess_input(question, tokenizer, max_len)
prediction = model.predict(processed_question)

# Преобразуйте предсказания из вероятностей в метки классов
predicted_labels = np.argmax(prediction, axis=1)

# Преобразуйте обратно предсказанные метки классов в текстовые метки
predicted_answer = label_encoder.inverse_transform(predicted_labels)[0]
print(predicted_answer)

# Проверка
#for question, correct_answer, predicted_answer in zip(test_data['Новая редакция вопроса'], test_data['ОТВЕТ'], predicted_answer):
    #print(f"Вопрос: {question}\nПравильный ответ: {correct_answer}\nПредсказанный ответ: {predicted_answer}\n")