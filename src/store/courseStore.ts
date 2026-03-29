import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CourseState {
  bookmarks: string[];
  toggleBookmark: (courseId: string) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (courseId) => {
        const current = get().bookmarks;
        const isBookmarked = current.includes(courseId);
        const newBookmarks = isBookmarked
          ? current.filter(id => id !== courseId)
          : [...current, courseId];
        set({ bookmarks: newBookmarks });
      },
    }),
    {
      name: 'course-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);