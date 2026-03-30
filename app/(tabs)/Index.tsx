import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import SearchBar from "@/src/components/common/SearchBar";
import CourseCard from "@/src/components/course/CourseCard";
import { useCourseStore } from "@/src/store/courseStore";
import { useCourses } from "@/src/hooks/useCourses";
import { useAuthStore } from "@/src/store/authStore";
import { COLORS } from "@/src/config/constants";

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const { bookmarks, toggleBookmark } = useCourseStore();
  const { user } = useAuthStore(); // get logged-in user
  const { data: courses, isLoading, error, refetch, isFetching } = useCourses();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredCourses =
    courses?.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase()),
    ) || [];

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
          Failed to load courses
        </Text>
        <Text className="text-textSecondary text-center">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Text className="text-4xl font-bold text-textPrimary mt-6 mb-1 px-4">
        Hello, {user?.username || "User"}!
      </Text>
      <SearchBar onSearch={handleSearch} placeholder="Search courses..." />
      <View className="flex-1 px-2">
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            onRefresh={refetch}
            refreshing={isFetching} // shows refresh indicator while fetching
            renderItem={({ item }) => {
              const imageUrl = item.thumbnail
                ? item.thumbnail
                : `https://picsum.photos/400/300?random=${item.id}`;
              return (
                <CourseCard
                  id={item.id.toString()}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  instructor={item.instructor}
                  imageSource={{ uri: imageUrl }}
                  isBookmarked={bookmarks.includes(item.id.toString())}
                  onBookmarkPress={() => toggleBookmark(item.id.toString())}
                  onPress={() =>
                    router.push({
                      pathname: "/course/[id]",
                      params: {
                        id: item.id.toString(),
                        title: item.title,
                        description: item.description,
                        price: item.price.toString(),
                        imageUrl: item.thumbnail,
                        instructor: item.instructor,
                      },
                    })
                  }
                />
              );
            }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-textSecondary text-lg">
              {searchText
                ? "No matching courses found"
                : "No courses available"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
