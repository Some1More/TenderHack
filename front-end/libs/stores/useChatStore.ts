import { create } from 'zustand';
import { Message } from '../types';

type ChatStore = {
  chatHistory: Message[];
  addMessage: (value: Message) => void;
  setChatHistory: (history: Message[]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chatHistory: [],
  addMessage: (message: Message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),
  setChatHistory: (history: Message[]) => set({ chatHistory: history }),
}));
