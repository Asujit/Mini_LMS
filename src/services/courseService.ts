import { getRandomProducts, Product } from '../api/courseApi';
import { getRandomUsers, User } from '../api/userApi';

export interface MergedCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor: string;
}

export const fetchMergedCourses = async (): Promise<MergedCourse[]> => {
  const [productsRes, usersRes] = await Promise.all([
    getRandomProducts(),
    getRandomUsers(),
  ]);

  const products = productsRes.data.data.data;
  const users = usersRes.data.data.data;

  return products.map((product: Product, index: number) => {
    const user = users[index % users.length];
    const instructor = `${user.name.title} ${user.name.first} ${user.name.last}`;
    return {
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      instructor,
    };
  });
};