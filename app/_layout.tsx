import "../global.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/config/queryClient';
import { useAuthStore } from '../src/store/authStore';
import { useEffect } from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const loadToken = useAuthStore((state) => state.loadToken);

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {/* Your screens will be defined here, but since you use Expo Router, you just need the provider */}
        {/* The Stack will be automatically populated by Expo Router */}
      </Stack>
    </QueryClientProvider>
  );
}