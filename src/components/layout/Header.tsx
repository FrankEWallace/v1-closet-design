import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Wardrobe', href: '/wardrobe' },
  { label: 'Outfits', href: '/outfits' },
  { label: 'Insights', href: '/insights' },
  { label: 'Market', href: '/marketplace' },
];

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display text-xl md:text-2xl font-medium tracking-tight">
              My Closet
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'font-body text-xs tracking-widest uppercase transition-all duration-300 hover:text-foreground',
                  location.pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
                {location.pathname === item.href && (
                  <span className="block h-px bg-foreground mt-1 animate-scale-in" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop user menu */}
            <div className="hidden md:flex items-center">
              {user ? (
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-secondary text-foreground text-xs font-medium">
                      {user.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden glass-card border-t border-border/50 animate-fade-up">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block font-body text-sm tracking-widest uppercase transition-all duration-300',
                  location.pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border/50">
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  <User size={16} />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
