from bs4 import BeautifulSoup
import pandas as pd

with open("docs/questions.html", 'r', encoding='utf-8') as page:
    soup = BeautifulSoup(page.read(), 'lxml')

questions = list(map(lambda x: x.text, soup.findAll('span', class_ = 'Container')))
answers = list(map(lambda x: x.text, soup.findAll('div', class_ = "Container")))
answer_details_beta = soup.findAll('a')

answers_details = []
for x in answer_details_beta:
    if x.text == "узнать больше":
        answers_details.append(f"https://zakupki.mos.ru/{x.get('href')}")

table = pd.DataFrame({
    'question' : questions,
    'answer' : answers,
    'answer_detail' : answers_details
})

table.to_excel('docs/Questions.xlsx')