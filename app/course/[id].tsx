import { View, Text, Image, ScrollView, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/config/constants';
import { useEnrollmentStore } from '@/src/store/enrollmentStore';

export default function CourseDetailScreen() {
  const { id, title, price, imageUrl } = useLocalSearchParams<{
    id: string;
    title: string;
    price: string;
    imageUrl: string;
  }>();
  const { height } = useWindowDimensions();
  const { enroll, isEnrolled } = useEnrollmentStore();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (id) {
      setEnrolled(isEnrolled(id));
    }
  }, [id, isEnrolled]);

  const instructor = 'John Doe';
  const duration = '8 hours';
  const lessons = 42;
  const rating = 4.8;
  const enrolledCount = 1234;
  const description = 'Learn React Native from scratch with hands-on projects. Build real-world mobile apps for iOS and Android using Expo and modern best practices. This course covers navigation, state management, animations, and deployment.';

  const handleEnroll = () => {
    if (!enrolled) {
      enroll(id);
      setEnrolled(true);
      Alert.alert('Success', 'You have been enrolled in this course!');
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <Image
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: height * 0.4 }}
        resizeMode="contain"
      />
      <View className="px-5 pt-5 pb-8">
        <Text className="text-3xl font-bold text-textPrimary mb-2">{title}</Text>

        <View className="flex-row flex-wrap items-center mb-4">
          <Ionicons name="person-outline" size={18} color={COLORS.textSecondary} />
          <Text className="text-textSecondary ml-1 mr-4">{instructor}</Text>
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
        <Text className="text-textSecondary leading-6 mb-6">{description}</Text>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
            <Text className="text-2xl font-bold text-primary ml-1">${parseFloat(price).toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            className={`px-8 py-3 rounded-xl ${enrolled ? 'bg-success' : 'bg-primary'}`}
            onPress={handleEnroll}
            disabled={enrolled}
          >
            <Text className="text-white font-semibold text-lg">
              {enrolled ? 'Enrolled ✓' : 'Enroll Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}