import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  title: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function StatCard({ title, count, icon, color }: StatCardProps) {
  return (
    <View className="flex-1 bg-card rounded-xl p-4 mx-2 items-center border border-border" style={{ elevation: 2 }}>
      <Ionicons name={icon} size={28} color={color} />
      <Text className="text-2xl font-bold text-textPrimary mt-2">{count}</Text>
      <Text className="text-textSecondary text-sm mt-1 text-center">{title}</Text>
    </View>
  );
}