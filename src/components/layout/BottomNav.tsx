import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Shirt, Layers, BarChart3, ShoppingBag } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Wardrobe', href: '/wardrobe', icon: Shirt },
  { label: 'Outfits', href: '/outfits', icon: Layers },
  { label: 'Insights', href: '/insights', icon: BarChart3 },
  { label: 'Market', href: '/marketplace', icon: ShoppingBag },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 transition-colors duration-200',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground active:text-foreground'
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="font-body text-[9px] tracking-wider uppercase">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-foreground rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
