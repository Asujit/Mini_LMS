import Constants from 'expo-constants';

export const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL as string;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}