import { client } from './client';

export interface User {
  id: number;
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export const getRandomUsers = () => client.get('/public/randomusers');