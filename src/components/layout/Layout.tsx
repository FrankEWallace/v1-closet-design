import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {children}
      </main>
      <footer className="border-t border-border/50 mt-24">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-display text-lg">My Closet</span>
            <p className="font-body text-xs text-muted-foreground tracking-wider">
              Your personal digital wardrobe
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
