import { useQuery, useQueryClient } from 'react-query';
import { useChatStore } from '../stores/useChatStore';
import { getChatHistory } from '../api/getChatHistory';
import { useMemo } from 'react';

export default function useChatHistory () {
    const queryClient = useQueryClient();
    const { data: chatData, isError } = useQuery(['chatHistory'], getChatHistory);
    const setChatHistory = useChatStore((state) => state.setChatHistory);
  
    useMemo(() => {
      if (chatData) {
        setChatHistory(chatData);
      }
    }, [chatData, setChatHistory]);
  
    return {
      chatData,
      isError,
      refetchChatHistory: () => {
        queryClient.invalidateQueries(['chatHistory']);
      },
    };
  }