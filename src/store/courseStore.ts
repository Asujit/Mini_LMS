import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showBookmarkThresholdNotification } from "@/src/services/notificationService";

interface CourseState {
  bookmarks: string[];
  toggleBookmark: (courseId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: async (courseId: string) => {
        const current = get().bookmarks;
        const isBookmarked = current.includes(courseId);
        const newBookmarks = isBookmarked
          ? current.filter((id) => id !== courseId)
          : [...current, courseId];
        set({ bookmarks: newBookmarks });

        if (newBookmarks.length >= 5) {
          await showBookmarkThresholdNotification(newBookmarks.length);
        }
      },
    }),
    {
      name: "course-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
