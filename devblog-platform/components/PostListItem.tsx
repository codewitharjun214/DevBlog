
import React from 'react';
import { Post } from '../types';

interface PostListItemProps {
  post: Post;
  onPostSelect: (post: Post) => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, onPostSelect }) => {
  const excerpt = post.content.substring(0, 150) + '...';
  
  return (
    <article 
      className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
      onClick={() => onPostSelect(post)}
    >
      <header>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold bg-highlight text-white px-3 py-1 rounded-full">{post.category.name}</span>
            <span className="text-sm text-textSecondary">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h2 className="text-2xl font-bold text-textPrimary group-hover:text-highlight transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-sm text-textSecondary mt-1">by {post.author.name}</p>
      </header>
      <p className="mt-4 text-textSecondary leading-relaxed">{excerpt}</p>
    </article>
  );
};

export default PostListItem;
