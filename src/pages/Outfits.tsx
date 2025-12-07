import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOutfits, mockClothingItems } from '@/data/mockData';
import { Plus, Calendar, Cloud, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Outfits = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getItemById = (id: string) => mockClothingItems.find(item => item.id === id);

  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="max-w-3xl space-y-6 opacity-0 animate-fade-up">
          <p className="mono-caption">Outfit Builder</p>
          <h1 className="editorial-heading">
            Create Your
            <br />
            <em className="italic">Perfect Look</em>
          </h1>
          <p className="font-body text-muted-foreground max-w-lg leading-relaxed">
            Combine pieces from your wardrobe to create and save outfits. 
            Plan ahead, match occasions, and never repeat the same look.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Outfit Canvas */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="editorial-subheading">Style Board</h2>
              <Button variant="editorial" size="sm">
                <Plus size={14} />
                New Outfit
              </Button>
            </div>

            {/* Drag & Drop Canvas */}
            <div className="glass-card rounded-xl p-8 min-h-[500px] border border-dashed border-border">
              {selectedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Plus size={24} className="text-muted-foreground" />
                  </div>
                  <p className="font-body text-muted-foreground">
                    Drag items here or select from your wardrobe
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedItems.map((id) => {
                    const item = getItemById(id);
                    if (!item) return null;
                    return (
                      <div key={id} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                        <img
                          src={item.productImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setSelectedItems(prev => prev.filter(i => i !== id))}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foreground/80 text-background flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Available Items */}
            <div className="space-y-4">
              <h3 className="font-body text-sm tracking-wider uppercase text-muted-foreground">
                Select Items
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {mockClothingItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (selectedItems.includes(item.id)) {
                        setSelectedItems(prev => prev.filter(i => i !== item.id));
                      } else {
                        setSelectedItems(prev => [...prev, item.id]);
                      }
                    }}
                    className={cn(
                      'flex-shrink-0 w-20 aspect-[3/4] rounded-md overflow-hidden transition-all duration-300',
                      selectedItems.includes(item.id)
                        ? 'ring-2 ring-foreground scale-95'
                        : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <img
                      src={item.productImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Outfits Sidebar */}
          <div className="space-y-6">
            <h2 className="font-body text-sm tracking-wider uppercase text-muted-foreground">
              Saved Outfits
            </h2>
            
            <div className="space-y-4">
              {mockOutfits.map((outfit, index) => (
                <article 
                  key={outfit.id}
                  className={cn(
                    'glass-card rounded-lg p-4 space-y-4 hover-lift cursor-pointer opacity-0 animate-fade-up',
                    `stagger-${index + 1}`
                  )}
                >
                  {/* Outfit Preview */}
                  <div className="flex gap-2">
                    {outfit.items.slice(0, 3).map((itemId) => {
                      const item = getItemById(itemId);
                      if (!item) return null;
                      return (
                        <div key={itemId} className="w-16 aspect-square rounded-md overflow-hidden bg-secondary">
                          <img
                            src={item.productImage}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    })}
                    {outfit.items.length > 3 && (
                      <div className="w-16 aspect-square rounded-md bg-secondary flex items-center justify-center">
                        <span className="font-body text-xs text-muted-foreground">
                          +{outfit.items.length - 3}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Outfit Info */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg">{outfit.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {outfit.occasion && (
                        <Badge variant="outline" className="text-[10px]">
                          <Sparkles size={10} className="mr-1" />
                          {outfit.occasion}
                        </Badge>
                      )}
                      {outfit.weather && (
                        <Badge variant="outline" className="text-[10px]">
                          <Cloud size={10} className="mr-1" />
                          {outfit.weather}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {outfit.scheduledDate && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <Calendar size={12} className="text-muted-foreground" />
                      <span className="font-body text-xs text-muted-foreground">
                        Scheduled for {new Date(outfit.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Outfits;
