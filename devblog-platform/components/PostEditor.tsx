
import React, { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import Button from './Button';

interface PostEditorProps {
  post: Post | null;
  categories: Category[];
  onSave: (postData: Omit<Post, 'id' | 'author' | 'createdAt'> | Post) => void;
  onCancel: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, categories, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.category.id);
    } else {
        if(categories.length > 0) {
            setCategoryId(categories[0].id)
        }
    }
  }, [post, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !categoryId) {
        alert("Please fill all fields");
        return;
    }

    const selectedCategory = categories.find(c => c.id === categoryId);
    if (!selectedCategory) return;
    
    const postData = {
        title,
        content,
        category: selectedCategory
    };

    if (post) {
        onSave({ ...post, ...postData });
    } else {
        onSave(postData);
    }
  };

  return (
    <div className="bg-secondary p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-textPrimary">{post ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-textSecondary mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-accent rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight text-textPrimary"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-textSecondary mb-1">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full p-2 bg-accent rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight text-textPrimary"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-textSecondary mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-accent rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight text-textPrimary"
            rows={15}
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{post ? 'Save Changes' : 'Publish Post'}</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
