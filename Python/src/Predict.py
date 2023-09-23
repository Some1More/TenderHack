# -*- coding: utf-8 -*-

import pickle

def Predict(question):

    model_file_path = 'C:\\Users\\andry\\OneDrive\\Рабочий стол\\Проекты\\Хакатоны\\TenderHack\\Back-end\\TenderHack.MLmodel\\model.pkl'
    
    with open(model_file_path, 'rb') as file:
        model, vectorizer = pickle.load(file)

        text_vector = vectorizer.transform([question]).toarray()[0]
        answer = model.predict([text_vector])[0]
        return answer