
export interface User {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: Category;
  author: User;
  createdAt: string;
}

export interface Comment {
  id: number;
  text: string;
  author: User;
  postId: number;
  createdAt: string;
}
