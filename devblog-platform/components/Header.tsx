
import React from 'react';
import Button from './Button';

interface HeaderProps {
  onNewPost: () => void;
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNewPost, isAuthenticated }) => {
  return (
    <header className="bg-secondary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-highlight tracking-wider">
          DevBlog Platform
        </h1>
        {isAuthenticated && (
          <Button onClick={onNewPost}>
            New Post
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
