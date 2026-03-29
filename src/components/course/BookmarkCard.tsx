import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/config/constants';

interface BookmarkCardProps {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  imageUrl?: string;
  onPress?: () => void;
  onRemove?: () => void;
}

export default function BookmarkCard({
  title,
  instructor,
  duration,
  imageUrl,
  onPress,
  onRemove,
}: BookmarkCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row bg-card rounded-2xl mb-5 overflow-hidden border border-border"
      style={{ elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
    >
      {/* Left Image - 30% width, full height */}
      <Image
        source={imageUrl ? { uri: imageUrl } : require('@/assets/images/react-logo.png')}
        className="w-[30%] h-36"
        resizeMode="cover"
      />

      {/* Right Content - 70% width */}
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="text-textPrimary font-bold text-lg mb-2" numberOfLines={2}>
            {title}
          </Text>
          
          {/* Instructor row */}
          <View className="flex-row items-center mb-1.5">
            <Ionicons name="person-outline" size={16} color={COLORS.textSecondary} />
            <Text className="text-textSecondary text-sm ml-2">{instructor}</Text>
          </View>
          
          {/* Duration row */}
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
            <Text className="text-textSecondary text-sm ml-2">{duration}</Text>
          </View>
        </View>
      </View>

      {/* Remove bookmark button */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        className="pr-4 justify-center"
      >
        <View className="bg-danger/10 rounded-full p-1.5">
          <Ionicons name="close-circle" size={24} color={COLORS.danger} />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}