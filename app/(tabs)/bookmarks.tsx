import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import SearchBar from '@/src/components/common/SearchBar';
import BookmarkCard from '@/src/components/course/BookmarkCard';
import { useCourseStore } from '@/src/store/courseStore';
import { useCourses } from '@/src/hooks/useCourses';
import { COLORS } from '@/src/config/constants';

export default function BookmarksScreen() {
  const [searchText, setSearchText] = useState('');
  const { bookmarks, toggleBookmark } = useCourseStore();
  const { data: courses, isLoading, error, refetch, isFetching } = useCourses();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const bookmarkedCourses = courses?.filter(course => bookmarks.includes(course.id)) || [];

  const filteredCourses = bookmarkedCourses.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRemoveBookmark = (courseId: string) => {
    toggleBookmark(courseId);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-danger text-lg text-center mb-2">
          Failed to load bookmarks
        </Text>
        <Text className="text-textSecondary text-center">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Text className="text-4xl font-bold text-textPrimary mt-6 mb-1 px-4">My Bookmarks</Text>
      <SearchBar onSearch={handleSearch} placeholder="Search bookmarked courses..." />

      <View className="flex-1 px-4 pt-2">
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            onRefresh={refetch}
            refreshing={isFetching}
            renderItem={({ item }) => {
              const imageUrl = item.thumbnail
                ? item.thumbnail
                : `https://picsum.photos/400/300?random=${item.id}`;
              const duration = `${Math.floor(Math.random() * 10) + 2} hours`;
              return (
                <BookmarkCard
                  id={item.id}
                  title={item.title}
                  instructor={item.instructor}
                  duration={duration}
                  imageUrl={imageUrl}
                  onPress={() => router.push(`/course/${item.id}`)}
                  onRemove={() => handleRemoveBookmark(item.id)}
                />
              );
            }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-textSecondary text-lg text-center">
              {searchText
                ? 'No matching bookmarks'
                : 'No bookmarks yet.\nTap the bookmark icon on any course to save it here.'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}