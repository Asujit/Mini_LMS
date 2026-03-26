export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  // other fields from randomproducts API
}

export interface User {
  id: string;
  name: string;
  email?: string;
  // other fields from randomusers API
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
