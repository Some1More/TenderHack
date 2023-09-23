from django.http import HttpResponse
import pickle

def Predict(question):

    model_file_path = '..\\TenderHack.MLmodel\\model.pkl'
    
    with open(model_file_path, 'rb') as file:
        model, vectorizer = pickle.load(file)

        text_vector = vectorizer.transform([question]).toarray()[0]
        answer = model.predict([text_vector])[0]
        return answer

def get_answer(request):
    question = request.GET.get("question")
    return HttpResponse(Predict(question))