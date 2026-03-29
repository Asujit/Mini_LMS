import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { useCourseStore } from '@/src/store/courseStore';
import { useEnrollmentStore } from '@/src/store/enrollmentStore';
import ProfileImagePicker from '@/src/components/profile/ProfileImagePicker';
import StatCard from '@/src/components/profile/StatCard';
import { COLORS } from '@/src/config/constants';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { bookmarks } = useCourseStore();
  const { getEnrolledCount } = useEnrollmentStore();
  const [profileImage, setProfileImage] = useState<string | undefined>(user?.avatar);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  // For demo, if user is not logged in, show placeholder
  const displayName = user?.name || 'John Doe';
  const displayEmail = user?.email || 'john.doe@example.com';

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-5 pt-8">
        {/* Profile Image Picker */}
        <ProfileImagePicker
          currentImage={profileImage}
          onImageSelected={(uri) => {
            setProfileImage(uri);
            // Optionally save to auth store or separate storage
          }}
        />

        {/* Name and Email */}
        <Text className="text-2xl font-bold text-textPrimary text-center mb-1">
          {displayName}
        </Text>
        <Text className="text-textSecondary text-center mb-8">
          {displayEmail}
        </Text>

        {/* Statistics Cards Row */}
        <View className="flex-row mb-8">
          <StatCard
            title="Courses Enrolled"
            count={getEnrolledCount()}
            icon="book"
            color={COLORS.primary}
          />
          <StatCard
            title="Bookmarks"
            count={bookmarks.length}
            icon="bookmark"
            color={COLORS.secondary}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-danger rounded-xl py-3 items-center mt-4"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}