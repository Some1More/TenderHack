import axios, { AxiosResponse } from 'axios'; 
import { Message } from '../types'; 

export const sendMessageToBot = async (message: string): Promise<Message | undefined> => {
  try {
    const response: AxiosResponse<Message> = await axios.get('http://localhost:8001/api/question/answer', { 
        params: {
          question: message,
          },
        });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Ошибка при отправке сообщения боту:', error.message);
    } else {
      console.error('Неизвестная ошибка при отправке сообщения боту:', error);
    }
  }
};