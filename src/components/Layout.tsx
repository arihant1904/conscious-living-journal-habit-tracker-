
import React from 'react';
import Sidebar from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/providers/AuthProvider';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };
  
  return (
    <div className="min-h-screen flex bg-journal-light dark:bg-journal-dark">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:pl-64" : "pl-0"
      )}>
        <div className="p-4 md:p-8 h-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              {!sidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 bg-journal-sage text-white p-2 rounded-md shadow-md hover:bg-journal-forest transition-colors"
                >
                  <Menu size={24} />
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-journal-forest dark:text-journal-cream">
                Hello, {user?.name || 'User'}
              </div>
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleLogout}
                className="rounded-full border-journal-taupe/20 bg-white dark:bg-journal-forest dark:text-journal-cream"
              >
                <LogOut size={18} />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
