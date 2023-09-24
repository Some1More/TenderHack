import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface MyAppProps {
  children: React.ReactNode;
}

function QueryClientApp({ children }: MyAppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryClientApp;