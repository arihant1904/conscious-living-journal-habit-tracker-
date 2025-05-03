
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Book, Calendar, CheckSquare, Home, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Book, label: 'Journal', path: '/journal' },
    { icon: CheckSquare, label: 'Habits', path: '/habits' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  if (!isOpen) return null;
  
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-journal-forest border-r border-journal-taupe/20 dark:border-journal-taupe/10 shadow-md flex flex-col transition-all duration-300 transform",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex justify-between items-center px-6 py-4 border-b border-journal-taupe/20 dark:border-journal-taupe/10">
        <h1 className="text-xl font-serif text-journal-forest dark:text-journal-cream font-semibold">Conscious Living</h1>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-journal-taupe hover:text-journal-dark dark:text-journal-cream dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-journal-sage text-white dark:bg-journal-sage/70"
                : "text-journal-dark dark:text-journal-cream hover:bg-journal-light dark:hover:bg-journal-dark/50"
            )}
          >
            <item.icon size={18} className="mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-journal-taupe/20 dark:border-journal-taupe/10">
        <div className="bg-journal-light dark:bg-journal-dark/70 rounded-md p-4">
          <p className="text-sm text-journal-forest dark:text-journal-cream font-medium mb-2">Today's Intention</p>
          <p className="text-xs italic text-journal-dark/80 dark:text-journal-cream/80">
            "I am present in each moment and grateful for all experiences."
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
