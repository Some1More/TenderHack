import pandas as pd
from razdel import tokenize
import openai
import time
openai.api_key = "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"
model_engine = "text-davinci-003"

df = pd.read_excel("C:\\Users\\mishl\\Downloads\\Telegram Desktop\\Questions.xlsx")
questions = df['question'].values
answers = df['answer'].values

new_questions = []
new_answers = []

i = 0
while i < 50:
    j = i + 3
    while i<j:
        prompt = f"Переформулируй данный вопрос 5 раз - '{questions[i]}'"

        completion = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1024,
            temperature=0.5,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        for x in completion.choices[0].text.split("\n"):
            if len(x[3:]) > 0:
                new_questions.append(x[3:])
                new_answers.append(answers[i])

        i+=1

    time.sleep(62)

table = pd.DataFrame({
    'question' : new_questions,
    'answer' : new_answers
})

table.to_excel('newQuestionsTable.xlsx')