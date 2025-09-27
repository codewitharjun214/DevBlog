
import React, { useState } from 'react';
import { Post, User } from '../types';
import CommentSection from './CommentSection';
import Button from './Button';
import Modal from './Modal';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  currentUser: User;
  isAuthenticated: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onEdit, onDelete, currentUser, isAuthenticated }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isAuthor = isAuthenticated && currentUser.id === post.author.id;

  const handleDeleteConfirm = () => {
    onDelete(post.id);
    setShowDeleteModal(false);
  };

  return (
    <div>
       <Button onClick={onBack} variant="secondary" className="mb-4">
        &larr; Back to Posts
      </Button>
      <article className="bg-secondary p-8 rounded-lg shadow-lg">
        <header>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold bg-highlight text-white px-3 py-1 rounded-full">{post.category.name}</span>
            <span className="text-sm text-textSecondary">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl font-bold text-textPrimary mb-2">{post.title}</h1>
          <p className="text-md text-textSecondary">by {post.author.name}</p>
        </header>
        {isAuthor && (
          <div className="flex gap-2 my-4 border-t border-b border-accent py-3">
              <Button onClick={() => onEdit(post)} >Edit Post</Button>
              <Button onClick={() => setShowDeleteModal(true)} variant="danger">Delete Post</Button>
          </div>
        )}
        <div className="mt-6 text-textSecondary leading-loose whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <CommentSection postId={post.id} currentUser={currentUser} isAuthenticated={isAuthenticated} />
      
      {showDeleteModal && (
        <Modal
          title="Delete Post"
          onClose={() => setShowDeleteModal(false)}
        >
          <p className="text-textSecondary mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostDetail;
