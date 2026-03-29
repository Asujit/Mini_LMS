import { Stack } from 'expo-router';
import { COLORS } from '@/src/config/constants';

export default function CourseLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background }, // light background
        headerTintColor: COLORS.textPrimary,                // back button & title color
        headerTitleStyle: { 
          color: COLORS.textPrimary,
          fontWeight: '600',
        },
        headerTitleAlign: 'center',                         // center the title
        headerBackTitle: 'Back', 
        headerTitle: "Course Details"                           // iOS back button text
      }}
    />
  );
}