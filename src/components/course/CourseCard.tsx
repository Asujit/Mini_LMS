import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/config/constants';

interface CourseCardProps {
  id: string;
  title: string;
  price: number;
  imageSource?: any;
  isBookmarked?: boolean;
  onBookmarkPress?: () => void;
  onPress?: () => void;
}

export default function CourseCard({
  id,
  title,
  price,
  imageSource,
  isBookmarked = false,
  onBookmarkPress,
  onPress,
}: CourseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-card rounded-xl m-2 overflow-hidden border border-border h-80"
      style={{ elevation: 2 }}
    >
      {/* Image Container with Bookmark Button */}
      <View className="relative">
        <Image
          source={imageSource || require('@/assets/images/react-logo.png')}
          className="w-full h-40"
          resizeMode="contain"
        />
        {/* Bookmark Icon */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation(); // prevent card press when tapping bookmark
            onBookmarkPress?.();
          }}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5"
          style={{ elevation: 2 }}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Title area */}
      <View className="p-3 h-24 justify-center">
        <Text className="text-textPrimary font-semibold text-base" numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* Price area */}
      <View className="p-3 h-16 flex-row items-center border-t border-border">
        <Ionicons name="cash-outline" size={16} color={COLORS.primary} />
        <Text className="text-primary font-bold text-sm ml-1">
          ${price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}