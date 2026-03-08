import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ClothingCard } from '@/components/wardrobe/ClothingCard';
import { CategoryFilter } from '@/components/wardrobe/CategoryFilter';
import { InsightsBar } from '@/components/wardrobe/InsightsBar';
import { WearLog } from '@/components/wardrobe/WearLog';
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
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        <div className="max-w-3xl space-y-3 md:space-y-5 opacity-0 animate-fade-up">
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

      {/* Insights Bar */}
      <InsightsBar />

      {/* Wear Journal */}
      <div className="border-b border-border/40">
        <WearLog />
      </div>

      {/* Wardrobe Grid */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="editorial-subheading">Your Collection</h2>
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
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

export default Index;