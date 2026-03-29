import { View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import SearchBar from '@/src/components/common/SearchBar';
import CourseCard from '@/src/components/course/CourseCard';
import { useCourseStore } from '@/src/store/courseStore';

const SAMPLE_COURSES = [
  { id: '1', title: 'React Native Mastery', price: 49.99 },
  { id: '2', title: 'Advanced TypeScript', price: 39.99 },
  { id: '3', title: 'Expo Deep Dive', price: 59.99 },
  { id: '4', title: 'Mobile UI/UX Design', price: 44.99 },
  { id: '5', title: 'State Management with Zustand', price: 29.99 },
];

export default function Index() {
  const [searchText, setSearchText] = useState('');
  const { bookmarks, toggleBookmark } = useCourseStore();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredCourses = SAMPLE_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      <Text className="text-4xl font-bold text-textPrimary mt-6 mb-1 px-4">Hello, John!</Text>
      <SearchBar onSearch={handleSearch} placeholder="Search courses..." />
      <View className="flex-1 px-2">
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <CourseCard
                id={item.id}
                title={item.title}
                price={item.price}
                isBookmarked={bookmarks.includes(item.id)}
                onBookmarkPress={() => toggleBookmark(item.id)}
                onPress={() =>
                  router.push({
                    pathname: '/course/[id]',
                    params: {
                      id: item.id,
                      title: item.title,
                      price: item.price.toString(),
                      imageUrl: 'https://picsum.photos/400/300?random=' + item.id,
                    },
                  })
                }
              />
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-textSecondary text-lg">No courses found</Text>
          </View>
        )}
      </View>
    </View>
  );
}