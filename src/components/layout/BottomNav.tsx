import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shirt, Layers, ShoppingBag } from 'lucide-react';

const navItems = [
  { label: 'Wardrobe', href: '/', icon: Shirt },
  { label: 'Outfits', href: '/outfits', icon: Layers },
  { label: 'Market', href: '/marketplace', icon: ShoppingBag },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50 safe-area-bottom">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors duration-200',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground active:text-foreground'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="font-body text-[10px] tracking-wider uppercase">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-foreground rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
