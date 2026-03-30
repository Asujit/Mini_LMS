import { useQuery } from '@tanstack/react-query';
import { fetchMergedCourses } from '../services/courseService';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchMergedCourses,
    staleTime: 5 * 60 * 1000,
  });
};