export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface MergedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorId?: string;
  price?: number;
}
