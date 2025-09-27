
import React, { useState, useEffect, useCallback } from 'react';
import { Post, Category, User } from './types';
import * as api from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostEditor from './components/PostEditor';
import Spinner from './components/Spinner';

type View = 'list' | 'post' | 'editor';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [view, setView] = useState<View>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authentication
  const [currentUser] = useState<User>(api.mockUser);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        api.getPosts(),
        api.getCategories(),
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setView('post');
  };

  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
    setView('list');
    setSelectedPost(null);
  };
  
  const handleCreatePost = () => {
    setEditingPost(null);
    setView('editor');
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setView('editor');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedPost(null);
    setEditingPost(null);
  };

  const handleSavePost = async (postData: Omit<Post, 'id' | 'author' | 'createdAt'> | Post) => {
    setIsLoading(true);
    if ('id' in postData) {
      await api.updatePost(postData.id, postData);
    } else {
      await api.createPost(postData);
    }
    await fetchData();
    handleBackToList();
  };

  const handleDeletePost = async (postId: number) => {
    setIsLoading(true);
    await api.deletePost(postId);
    await fetchData();
    handleBackToList();
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category.id === selectedCategory.id)
    : posts;

  const renderContent = () => {
    if (isLoading && !selectedPost && view !== 'editor') {
      return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }
    
    switch (view) {
      case 'post':
        return selectedPost ? <PostDetail 
          post={selectedPost} 
          onBack={handleBackToList}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
        /> : null;
      case 'editor':
        return <PostEditor 
          post={editingPost} 
          categories={categories}
          onSave={handleSavePost} 
          onCancel={handleBackToList}
        />;
      case 'list':
      default:
        return <PostList posts={filteredPosts} onPostSelect={handleSelectPost} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header onNewPost={handleCreatePost} isAuthenticated={isAuthenticated} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </aside>
          <div className="w-full md:w-3/4 lg:w-4/5">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
