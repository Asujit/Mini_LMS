import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EnrollmentState {
  enrolledCourses: string[]; // array of course IDs
  enroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrolledCount: () => number;
}

export const useEnrollmentStore = create<EnrollmentState>()(
  persist(
    (set, get) => ({
      enrolledCourses: [],
      enroll: (courseId) => {
        const current = get().enrolledCourses;
        if (!current.includes(courseId)) {
          set({ enrolledCourses: [...current, courseId] });
        }
      },
      isEnrolled: (courseId) => get().enrolledCourses.includes(courseId),
      getEnrolledCount: () => get().enrolledCourses.length,
    }),
    {
      name: 'enrollment-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);