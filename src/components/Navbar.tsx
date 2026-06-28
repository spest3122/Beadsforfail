import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, List } from 'lucide-react';
import { cn } from '../utils';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <div className="glass px-2 py-2 rounded-full flex gap-2 pointer-events-auto">
        <NavLink
          to="/"
          className={({ isActive }) => cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            isActive 
              ? "bg-primary/10 text-primary shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]" 
              : "text-on-background/60 hover:text-on-background hover:bg-black/5"
          )}
        >
          <Target className="w-4 h-4" />
          Tracker
        </NavLink>
        <NavLink
          to="/log"
          className={({ isActive }) => cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            isActive 
              ? "bg-primary/10 text-primary shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]" 
              : "text-on-background/60 hover:text-on-background hover:bg-black/5"
          )}
        >
          <List className="w-4 h-4" />
          Journey Log
        </NavLink>
      </div>
    </nav>
  );
};
