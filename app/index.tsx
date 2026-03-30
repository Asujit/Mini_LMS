import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/config/constants';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Ionicons name="school-outline" size={80} color={COLORS.primary} />
      <View className="mt-4">
        <Text className="text-3xl font-bold text-textPrimary">
          Mini<Text className="text-primary">LMS</Text>
        </Text>
      </View>
      <Text className="text-textSecondary text-base mt-2 text-center px-8">
        Your learning companion
      </Text>
    </View>
  );
}