import { View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import SearchBar from '@/src/components/common/SearchBar';
import BookmarkCard from '@/src/components/course/BookmarkCard';
import { useCourseStore } from '@/src/store/courseStore';

// Sample course data (same as in Index) – ideally share from a common file
const SAMPLE_COURSES = [
  { id: '1', title: 'React Native Mastery', instructor: 'John Doe', duration: '8 hours', price: 49.99, imageUrl: 'https://picsum.photos/400/300?random=1' },
  { id: '2', title: 'Advanced TypeScript', instructor: 'Jane Smith', duration: '6 hours', price: 39.99, imageUrl: 'https://picsum.photos/400/300?random=2' },
  { id: '3', title: 'Expo Deep Dive', instructor: 'Mike Johnson', duration: '10 hours', price: 59.99, imageUrl: 'https://picsum.photos/400/300?random=3' },
  { id: '4', title: 'Mobile UI/UX Design', instructor: 'Sarah Lee', duration: '7 hours', price: 44.99, imageUrl: 'https://picsum.photos/400/300?random=4' },
  { id: '5', title: 'State Management with Zustand', instructor: 'Alex Brown', duration: '5 hours', price: 29.99, imageUrl: 'https://picsum.photos/400/300?random=5' },
];

export default function BookmarksScreen() {
  const [searchText, setSearchText] = useState('');
  const { bookmarks, toggleBookmark } = useCourseStore();

  // Get bookmarked courses from sample data
  const bookmarkedCourses = SAMPLE_COURSES.filter(course => bookmarks.includes(course.id));

  // Filter by search text
  const filteredCourses = bookmarkedCourses.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleRemoveBookmark = (courseId: string) => {
    toggleBookmark(courseId);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <Text className="text-4xl font-bold text-textPrimary mt-6 mb-1 px-4">My Bookmarks</Text>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} placeholder="Search bookmarked courses..." />

      {/* Bookmarked Courses List */}
      <View className="flex-1 px-4 pt-2">
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <BookmarkCard
                id={item.id}
                title={item.title}
                instructor={item.instructor}
                duration={item.duration}
                imageUrl={item.imageUrl}
                onPress={() => router.push(`/course/${item.id}`)}
                onRemove={() => handleRemoveBookmark(item.id)}
              />
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-textSecondary text-lg text-center">
              {searchText ? 'No matching bookmarks' : 'No bookmarks yet.\nTap the bookmark icon on any course to save it here.'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}