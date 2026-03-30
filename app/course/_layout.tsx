import { Stack } from 'expo-router';
import { COLORS } from '@/src/config/constants';

export default function CourseLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.textPrimary,                
        headerTitleStyle: { 
          color: COLORS.textPrimary,
          fontWeight: '600',
        },
        headerTitleAlign: 'center',                         
        headerBackTitle: 'Back', 
        headerTitle: "Course Details"                           
      }}
    />
  );
}