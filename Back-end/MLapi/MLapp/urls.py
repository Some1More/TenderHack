from django.urls import path
from MLapp import views

urlpatterns = [
    path('GetAnswer', views.get_answer),
]