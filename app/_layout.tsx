import "../global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/config/queryClient";
import { useAuthStore } from "../src/store/authStore";
import { useEffect } from "react";
import { Stack, useSegments, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../src/config/constants";
import { View, ActivityIndicator } from "react-native";
import OfflineBanner from "@/src/components/common/OfflineBanner";
import { requestNotificationPermissions } from "@/src/services/notificationService";
import { useAppState } from "@/src/hooks/useAppState";

export default function RootLayout() {
  const { isAuthenticated, isLoading, loadToken } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadToken();
    requestNotificationPermissions();
  }, []);

  useAppState();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/Index");
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SafeAreaView
          edges={["bottom"]}
          style={{ flex: 1, backgroundColor: COLORS.background }}
        >
          <OfflineBanner />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
