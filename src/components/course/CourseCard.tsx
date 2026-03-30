import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "@/src/config/constants";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  imageSource?: any;
  isBookmarked?: boolean;
  onBookmarkPress?: () => void;
  onPress?: () => void;
}

export default function CourseCard({
  id,
  title,
  description,
  price,
  instructor,
  imageSource,
  isBookmarked = false,
  onBookmarkPress,
  onPress,
}: CourseCardProps) {
  const [imageError, setImageError] = useState(false);

  const source = imageError
    ? require("@/assets/images/react-logo.png")
    : imageSource || require("@/assets/images/react-logo.png");

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-card rounded-xl m-2 overflow-hidden border border-border h-80"
      style={{ elevation: 2 }}
    >
      <View className="relative">
        <Image
          source={source}
          className="w-full h-36"
          resizeMode="contain"
          onError={(e) => {
            setImageError(true);
          }}
        />
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onBookmarkPress?.();
          }}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5"
          style={{ elevation: 2 }}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View className="px-3 pt-2 h-12 justify-center">
        <Text
          className="text-textPrimary font-semibold text-base"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>

      <View className="px-3 h-12 justify-start">
        <Text
          className="text-textSecondary text-xs"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>

      <View className="px-3 h-8 justify-center">
        <Text
          className="text-textSecondary text-xs"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {instructor}
        </Text>
      </View>

      <View className="px-3 pb-2 h-8 flex-row items-center border-t border-border">
        <Ionicons name="cash-outline" size={14} color={COLORS.primary} />
        <Text className="text-primary font-bold text-sm ml-1">
          ${price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
