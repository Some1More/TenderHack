import pickle
import re
import yake
import pandas as pd
import pymorphy3
from razdel import tokenize
from typing import List
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, SnowballStemmer

dataset_path = "model\\dataset.xlsx"
model_path = "model\\model.pickle"
morph = pymorphy3.MorphAnalyzer()

def my_tokenize(text: str) -> str:
  return [t.text for t in tokenize(text)]

def my_normalize(word: str) -> str:
  return morph.parse(word)[0].normal_form

def is_valid_word(word: str) -> str:
  return re.search(r'[^a-zа-яё\-]', word.lower().strip()) is None

df = pd.read_excel(dataset_path)
texts = list(df['Вопрос']) + list(df['Тип вопроса']) + list(df['Подтип вопроса']) + list(df['Ответ'])
def is_strange(word: str) -> bool:
  return (re.search(r'[a-zа-яё\-]', word.strip()) is not None
          and re.search(r'[^a-zа-яё\-]', word.strip()) is not None)

strange_tokens = set()
for text in texts:
  text = text.lower()
  tokens = my_tokenize(text)
  strange_tokens |= {t for t in tokens if is_strange(t)}

def is_valid_word(word: str) -> str:
  return (re.search(r'[a-zа-яё0-9]', word.lower().strip()) is not None
          and re.search(r'[^a-zа-яё0-9_/\-]', word.lower().strip()) is None)

all(is_valid_word(t) for t in strange_tokens)

language = "ru"
max_ngram_size = 4

custom_kw_extractor = yake.KeywordExtractor(
    lan=language,
    n=max_ngram_size
)

def get_keywords(text: str) -> List[str]:
  return [
      k for k, v
      in custom_kw_extractor.extract_keywords(text)
      if k.count(' ') > 0
  ]

nltk.download('stopwords')
ru_stopwords = stopwords.words('russian')

ps = PorterStemmer()

def process_text(text: str) -> List[str]:
  tokens = my_tokenize(text)
  normal_tokens = [my_normalize(t) for t in tokens]
  valid_tokens = [t for t in normal_tokens if is_valid_word(t)]
  valid_text = ' '.join(valid_tokens)
  keywords = get_keywords(valid_text)
  result_tokens = valid_tokens + keywords
  result_tokens = [t for t in result_tokens if t not in ru_stopwords]

  for i in range(len(result_tokens)):
      result_tokens[i] = ps.stem(result_tokens[i])

  result = ', '.join(result_tokens)
  return result

def predict(text):

    with open(model_path, 'rb') as file:
      clf, vectorizer = pickle.load(file)

      processed_text = process_text(text)

      text_vector = vectorizer.transform([processed_text]).toarray()[0]
      answer = clf.predict([text_vector])[0]
      return answer