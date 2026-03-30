import { View, Text } from 'react-native';
import { useNetwork } from '@/src/hooks/useNetwork';
import { COLORS } from '@/src/config/constants';

export default function OfflineBanner() {
  const { isOffline } = useNetwork();

  if (!isOffline) return null;

  return (
    <View className="bg-danger py-2 px-4">
      <Text className="text-white text-center text-sm font-medium">
        You are offline. Please check your internet connection.
      </Text>
    </View>
  );
}