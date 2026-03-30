import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router"; 
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/config/constants";
import { useEnrollmentStore } from "@/src/store/enrollmentStore";
import { showEnrollmentNotification } from "@/src/services/notificationService";

export default function CourseDetailScreen() {
  const { id, title, price, imageUrl, description, instructor } =
    useLocalSearchParams<{
      id: string;
      title: string;
      price: string;
      imageUrl: string;
      description?: string;
      instructor?: string;
    }>();
  const { height } = useWindowDimensions();
  const { enroll, isEnrolled } = useEnrollmentStore();
  const [enrolled, setEnrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      setEnrolled(isEnrolled(id));
    }
  }, [id, isEnrolled]);


  const duration = "8 hours";
  const lessons = 42;
  const rating = 4.8;
  const enrolledCount = 1234;

  const handleEnroll = () => {
    if (!enrolled) {
      enroll(id);
      setEnrolled(true);
      showEnrollmentNotification(title as string);
      Alert.alert('Success', 'You have been enrolled in this course!');
    }
  };

  const handlePlay = () => {
  router.push({
    pathname: '/webview/viewer',
    params: {
      title: title,
      instructor: instructor,
      description: description,
      duration: '8 hours',
    },
  });
};


  const finalImageUrl = imageError ? "https://picsum.photos/400/300" : imageUrl;

  return (
    <ScrollView className="flex-1 bg-background">
      <Image
        source={{ uri: finalImageUrl }}
        style={{ width: "100%", height: height * 0.4 }}
        resizeMode="contain"
        onError={(e) => {
          setImageError(true);
        }}
      />
      <View className="px-5 pt-5 pb-8">
        <Text className="text-3xl font-bold text-textPrimary mb-2">
          {title}
        </Text>

        <View className="flex-row flex-wrap items-center mb-4">
          <Ionicons name="person-outline" size={18} color={COLORS.textSecondary} />
          <Text className="text-textSecondary ml-1 mr-4">
            {instructor || "Unknown Instructor"}
          </Text>
          <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
          <Text className="text-textSecondary ml-1 mr-4">{duration}</Text>
          <Ionicons name="book-outline" size={18} color={COLORS.textSecondary} />
          <Text className="text-textSecondary ml-1">{lessons} lessons</Text>
        </View>

        <View className="flex-row items-center mb-5">
          <Ionicons name="star" size={18} color="#FBBF24" />
          <Text className="text-textSecondary ml-1 mr-4">{rating} rating</Text>
          <Ionicons name="people-outline" size={18} color={COLORS.textSecondary} />
          <Text className="text-textSecondary ml-1">{enrolledCount} students</Text>
        </View>

        <Text className="text-lg font-semibold text-textPrimary mb-2">Description</Text>
        <Text className="text-textSecondary leading-6 mb-6">
          {description || "No description available"}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
            <Text className="text-2xl font-bold text-primary ml-1">
              ${parseFloat(price).toFixed(2)}
            </Text>
          </View>

          {!enrolled ? (
            <TouchableOpacity
              className="bg-primary px-8 py-3 rounded-xl"
              onPress={handleEnroll}
            >
              <Text className="text-white font-semibold text-lg">Enroll Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-success px-8 py-3 rounded-xl flex-row items-center"
              onPress={handlePlay}
            >
              <Ionicons name="play" size={20} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">Play</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}