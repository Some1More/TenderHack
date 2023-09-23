import re
import pandas as pd
import numpy as np
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import zipfile

def clean_str(r):
  r = r.lower()
  r = [c for c in r if c in alphabet]
  return ''.join(r)

alphabet = ' 1234567890-йцукенгшщзхъфывапролджэячсмитьбюёqwertyuiopasdfghjklzxcvbnm?%.,()!:;'

def learn_model():
    df = pd.read_excel("Python/docs/База знаний ответов.xlsx")

    X_text = df['Новая редакция вопроса'].values 
    y = df['ОТВЕТ'].values

    global vectorizer
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(X_text)

    global clf
    clf = LogisticRegression()
    clf.fit(X, y)
    return clf

pickle_filename = 'model.pkl'
with open(pickle_filename, 'wb') as file:
    pickle.dump((learn_model(), vectorizer), file)

def get_generative_replica(text):
    text_vector = vectorizer.transform([text]).toarray()[0]
    print(text_vector)
    answer = clf.predict([text_vector])
    return answer

for i in get_generative_replica('Какие действия могут привести к блокировке на Портале Поставщиков?'):
  print(i, "\n")
