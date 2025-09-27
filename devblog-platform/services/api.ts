
import { Post, Category, Comment, User } from '../types';

// Mock Data
export const mockUser: User = { id: 1, name: 'John Dev' };
const anotherUser: User = { id: 2, name: 'Jane Coder' };

const mockCategories: Category[] = [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Java' },
  { id: 4, name: 'Spring Boot' },
  { id: 5, name: 'Database' },
];

let mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    content: 'React Hooks are a revolution in how we write components. `useState` and `useEffect` are the most common ones, allowing you to add state and side-effects to functional components. This post explores the basics of these hooks and provides practical examples for building modern React applications. We will cover state management, lifecycle events, and how to create custom hooks to encapsulate reusable logic. Dive in to level up your React skills!',
    category: mockCategories[0],
    author: mockUser,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: 'Advanced TypeScript for Modern Web Apps',
    content: 'TypeScript brings static typing to JavaScript, catching errors early and improving developer experience. This article covers advanced features like generics, conditional types, and mapped types. Understanding these concepts is key to building robust and scalable applications. We will also look at how to integrate TypeScript with popular libraries and frameworks, ensuring type safety across your entire stack. By the end, you will have a deeper appreciation for the power of TypeScript.',
    category: mockCategories[1],
    author: mockUser,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: 3,
    title: 'Building a REST API with Spring Boot',
    content: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". In this post, we will walk through the process of building a simple RESTful API for a blog application. We will cover setting up the project, creating controllers, services, and repositories. We will also discuss how to handle requests, responses, and data validation. This is a great starting point for anyone looking to get into backend development with Java.',
    category: mockCategories[3],
    author: anotherUser,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let mockComments: Comment[] = [
  { id: 1, postId: 1, text: 'Great introduction to hooks!', author: anotherUser, createdAt: new Date().toISOString() },
  { id: 2, postId: 1, text: 'This was very helpful, thanks for sharing.', author: mockUser, createdAt: new Date().toISOString() },
  { id: 3, postId: 2, text: 'I never understood generics until now. Thank you!', author: mockUser, createdAt: new Date().toISOString() },
];

const LATENCY = 500;

// Helper to simulate network delay
const simulateNetwork = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), LATENCY));
}

// API functions
export const getPosts = (): Promise<Post[]> => simulateNetwork([...mockPosts].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

export const getPost = (id: number): Promise<Post | undefined> => simulateNetwork(mockPosts.find(p => p.id === id));

export const getCategories = (): Promise<Category[]> => simulateNetwork(mockCategories);

export const getComments = (postId: number): Promise<Comment[]> => simulateNetwork(mockComments.filter(c => c.postId === postId));

export const createComment = (commentData: Omit<Comment, 'id' | 'createdAt' | 'author'>): Promise<Comment> => {
  const newComment: Comment = {
    ...commentData,
    id: Math.max(...mockComments.map(c => c.id)) + 1,
    author: mockUser,
    createdAt: new Date().toISOString()
  };
  mockComments.push(newComment);
  return simulateNetwork(newComment);
};

export const createPost = (postData: Omit<Post, 'id' | 'author' | 'createdAt'>): Promise<Post> => {
    const newPost: Post = {
        ...postData,
        id: Math.max(0, ...mockPosts.map(p => p.id)) + 1,
        author: mockUser,
        createdAt: new Date().toISOString(),
    };
    mockPosts.push(newPost);
    return simulateNetwork(newPost);
}

export const updatePost = (id: number, postData: Post): Promise<Post> => {
    mockPosts = mockPosts.map(p => p.id === id ? { ...p, ...postData } : p);
    return simulateNetwork(postData);
}

export const deletePost = (id: number): Promise<{ success: boolean }> => {
    mockPosts = mockPosts.filter(p => p.id !== id);
    return simulateNetwork({ success: true });
}
