import { View, Text, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { useCourseStore } from '@/src/store/courseStore';
import { useEnrollmentStore } from '@/src/store/enrollmentStore';
import ProfileImagePicker from '@/src/components/profile/ProfileImagePicker';
import StatCard from '@/src/components/profile/StatCard';
import { COLORS } from '@/src/config/constants';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout, updateAvatar } = useAuthStore();
  const { bookmarks } = useCourseStore();
  const { getEnrolledCount } = useEnrollmentStore();

  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const displayName = user?.username || 'User';
  const displayEmail = user?.email || 'user@example.com';

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <View className="px-5 pt-8">
        <ProfileImagePicker
          currentImage={user?.avatar}
          onImageSelected={(uri) => updateAvatar(uri)}
        />

        <Text className="text-2xl font-bold text-textPrimary text-center mb-1">
          {displayName}
        </Text>
        <Text className="text-textSecondary text-center mb-8">
          {displayEmail}
        </Text>

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

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-danger rounded-xl py-3 items-center mt-4 mb-8"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}