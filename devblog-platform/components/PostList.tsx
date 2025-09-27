
import React from 'react';
import { Post } from '../types';
import PostListItem from './PostListItem';

interface PostListProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostSelect }) => {
  if (posts.length === 0) {
    return <div className="text-center text-textSecondary p-8 bg-secondary rounded-lg">No posts found.</div>;
  }
  
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostListItem key={post.id} post={post} onPostSelect={onPostSelect} />
      ))}
    </div>
  );
};

export default PostList;
