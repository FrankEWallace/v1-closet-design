import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockClothingItems } from '@/data/mockData';
import { Leaf, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter items that are for sale
  const marketplaceItems = mockClothingItems.filter(item => item.forSale);

  // Add some more items for display purposes
  const allMarketplaceItems = [
    ...marketplaceItems,
    ...mockClothingItems.slice(0, 4).map(item => ({
      ...item,
      id: `market-${item.id}`,
      forSale: true,
      price: Math.floor(Math.random() * 500) + 100,
    })),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="max-w-3xl space-y-6 opacity-0 animate-fade-up">
          <p className="mono-caption">Marketplace</p>
          <h1 className="editorial-heading">
            Curated
            <br />
            <em className="italic">Pre-Loved Pieces</em>
          </h1>
          <p className="font-body text-muted-foreground max-w-lg leading-relaxed">
            Discover authenticated, pre-owned fashion from discerning wardrobes. 
            Sustainable luxury, curated with care.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-y border-border/50 sticky top-16 md:top-20 z-40 glass-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <p className="font-body text-sm text-muted-foreground">
              {allMarketplaceItems.length} items available
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter size={14} />
              <span className="hidden md:inline">Filters</span>
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="pb-6 pt-2 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
              {['Category', 'Size', 'Condition', 'Sustainability'].map((filter) => (
                <div key={filter} className="space-y-2">
                  <p className="mono-caption">{filter}</p>
                  <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 font-body text-sm">
                    <option>All</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {allMarketplaceItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/item/${item.id.replace('market-', '')}`}
              className={cn(
                'group block opacity-0 animate-fade-up',
                `stagger-${(index % 6) + 1}`
              )}
            >
              <article className="relative overflow-hidden rounded-lg bg-card hover-lift">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                    src={item.productImage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Condition Badge */}
                  <Badge 
                    variant="outline"
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-[10px]"
                  >
                    {item.condition}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Brand & Category */}
                  <div className="flex items-center justify-between">
                    <span className="mono-caption">{item.brand}</span>
                    <span className="mono-caption">{item.category}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-lg leading-tight group-hover:text-muted-foreground transition-colors">
                    {item.name}
                  </h3>

                  {/* Price & Sustainability */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <p className="font-display text-xl">
                      ${item.price?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Leaf size={12} className="text-sage" />
                      <span className="font-body text-xs text-muted-foreground">
                        {item.sustainabilityScore}/10
                      </span>
                    </div>
                  </div>

                  {/* Size if available */}
                  {item.size && (
                    <Badge variant="secondary" className="text-[10px]">
                      Size {item.size}
                    </Badge>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 lg:px-12 py-20">
        <div className="glass-card rounded-2xl p-12 text-center space-y-6 opacity-0 animate-fade-up">
          <h2 className="editorial-subheading">
            Ready to Sell?
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            List items from your wardrobe and connect with conscious shoppers looking for quality pieces.
          </p>
          <Button variant="premium" size="xl">
            List Your Items
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Marketplace;
