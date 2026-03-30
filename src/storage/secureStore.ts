import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync('accessToken', token);
};

export const getToken = async () => {
  const token = await SecureStore.getItemAsync('accessToken');
  return token;
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('accessToken');
};
