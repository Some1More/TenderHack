from django.http import HttpResponse
from . import predict

def get_answer(request):
    question = request.GET.get("question")
    return HttpResponse(predict(question))