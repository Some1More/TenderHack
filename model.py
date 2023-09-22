import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split


data = pd.read_excel('ваш_файл.xlsx')

train_data, test_data = train_test_split(data, test_size=0.2)

tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(train_data['Вопросы'])
train_seqs = tokenizer.texts_to_sequences(train_data['Вопросы'])
test_seqs = tokenizer.texts_to_sequences(test_data['Вопросы'])

num_classes = len(set(train_data['Ответы']))
train_labels = tf.keras.utils.to_categorical(train_data['Ответы'], num_classes)
test_labels = tf.keras.utils.to_categorical(test_data['Ответы'], num_classes)

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=64),
    tf.keras.layers.GRU(64),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_seqs, train_labels, epochs=10, validation_data=(test_seqs, test_labels))

loss, accuracy = model.evaluate(test_seqs, test_labels)
print('Test loss:', loss)
print('Test accuracy:', accuracy)