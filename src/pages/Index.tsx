import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ClothingCard } from '@/components/wardrobe/ClothingCard';
import { CategoryFilter } from '@/components/wardrobe/CategoryFilter';
import { mockClothingItems } from '@/data/mockData';
import { Category } from '@/types/wardrobe';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredItems = selectedCategory === 'all'
    ? mockClothingItems
    : mockClothingItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-20">
        <div className="max-w-3xl space-y-4 md:space-y-6 opacity-0 animate-fade-up">
          <p className="mono-caption">Digital Wardrobe</p>
          <h1 className="editorial-heading">
            Your Personal
            <br />
            <em className="italic">Style Archive</em>
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
            Curate, organize, and elevate your wardrobe. 
            Track sustainability, plan outfits, and rediscover your personal style.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {[
              { label: 'Total Items', value: mockClothingItems.length },
              { label: 'Clean', value: mockClothingItems.filter(i => i.status === 'clean').length },
              { label: 'Sustainability', value: `${Math.round(mockClothingItems.reduce((acc, i) => acc + i.sustainabilityScore, 0) / mockClothingItems.length)}/10` },
              { label: 'Categories', value: new Set(mockClothingItems.map(i => i.category)).size },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className={cn(
                  'py-4 md:py-8 px-3 md:px-4 text-center opacity-0 animate-fade-up',
                  `stagger-${index + 1}`
                )}
              >
                <p className="font-display text-xl md:text-3xl mb-1">{stat.value}</p>
                <p className="mono-caption text-[10px] md:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wardrobe Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="editorial-subheading">Your Collection</h2>
          <CategoryFilter 
            selected={selectedCategory} 
            onChange={setSelectedCategory} 
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <ClothingCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">No items in this category</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default Index;
