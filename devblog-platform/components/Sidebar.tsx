
import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-textPrimary border-b border-accent pb-2">Categories</h2>
      <ul>
        <li 
          className={`cursor-pointer p-2 rounded transition-colors duration-200 ${!selectedCategory ? 'bg-highlight text-white' : 'hover:bg-accent'}`}
          onClick={() => onSelectCategory(null)}
        >
          All Posts
        </li>
        {categories.map(category => (
          <li 
            key={category.id}
            className={`cursor-pointer p-2 rounded transition-colors duration-200 mt-1 ${selectedCategory?.id === category.id ? 'bg-highlight text-white' : 'hover:bg-accent'}`}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
