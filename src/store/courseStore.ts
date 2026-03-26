import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CourseState {
  bookmarks: string[]; // array of course IDs
  toggleBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (courseId: string) => {
        const bookmarks = get().bookmarks;
        const newBookmarks = bookmarks.includes(courseId)
          ? bookmarks.filter(id => id !== courseId)
          : [...bookmarks, courseId];
        set({ bookmarks: newBookmarks });
      },
      isBookmarked: (courseId: string) => get().bookmarks.includes(courseId),
    }),
    {
      name: 'course-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);