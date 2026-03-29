import "../global.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/config/queryClient';
import { useAuthStore } from '../src/store/authStore';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../src/config/constants';

export default function RootLayout() {
  const loadToken = useAuthStore((state) => state.loadToken);

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SafeAreaView
          edges={['bottom']}
          style={{ flex: 1, backgroundColor: COLORS.background }}
        >
          <Stack screenOptions={{headerShown:false}}/>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}