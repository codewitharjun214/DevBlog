
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary mt-8 py-4">
      <div className="container mx-auto px-4 text-center text-textSecondary">
        <p>&copy; {new Date().getFullYear()} DevBlog Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
