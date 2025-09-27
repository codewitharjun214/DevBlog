import React, { useState, useEffect, useCallback } from 'react';
import { Comment, User } from '../types';
import * as api from '../services/api';
import Button from './Button';
import Spinner from './Spinner';

interface CommentSectionProps {
  postId: number;
  currentUser: User;
  isAuthenticated: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, currentUser, isAuthenticated }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const fetchedComments = await api.getComments(postId);
    setComments(fetchedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    // FIX: The `author` property is not expected by `api.createComment`'s type signature, causing a compilation error. The author is set by the mock API.
    await api.createComment({ text: newComment, postId });
    setNewComment('');
    await fetchComments();
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-lg mb-6 shadow-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 bg-accent rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight text-textPrimary"
            rows={3}
          />
          <div className="text-right mt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </div>
        </form>
      )}

      {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-secondary p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center text-sm mb-2">
                <p className="font-bold text-textPrimary">{comment.author.name}</p>
                <p className="text-textSecondary">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-textSecondary">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
