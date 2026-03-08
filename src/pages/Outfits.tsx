import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOutfits, mockClothingItems } from '@/data/mockData';
import { Plus, Calendar, Cloud, Sparkles, Heart, ExternalLink, Instagram, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

const inspirationItems = [
  {
    id: 'insp-1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    source: 'Pinterest',
    sourceIcon: Pin,
    caption: 'Minimal autumn layering',
    saved: true,
  },
  {
    id: 'insp-2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    source: 'Instagram',
    sourceIcon: Instagram,
    caption: 'Oversized knitwear moment',
    saved: false,
  },
  {
    id: 'insp-3',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    source: 'Friend',
    sourceIcon: Heart,
    caption: 'Leather trench styling',
    saved: true,
  },
  {
    id: 'insp-4',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    source: 'Pinterest',
    sourceIcon: Pin,
    caption: 'Effortless summer dress',
    saved: false,
  },
  {
    id: 'insp-5',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    source: 'Instagram',
    sourceIcon: Instagram,
    caption: 'Clean basics done right',
    saved: false,
  },
  {
    id: 'insp-6',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    source: 'Friend',
    sourceIcon: Heart,
    caption: 'Structured blazer look',
    saved: true,
  },
];

const Outfits = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [savedInspo, setSavedInspo] = useState<string[]>(
    inspirationItems.filter(i => i.saved).map(i => i.id)
  );

  const getItemById = (id: string) => mockClothingItems.find(item => item.id === id);

  const toggleInspo = (id: string) => {
    setSavedInspo(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        <div className="max-w-3xl space-y-4 md:space-y-5 opacity-0 animate-fade-up">
          <p className="mono-caption">Outfit Studio</p>
          <h1 className="editorial-heading">
            Create Your
            <br />
            <em className="italic">Perfect Look</em>
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
            Build outfits, save inspiration, and curate your style from every corner of the internet.
          </p>
        </div>
      </section>

      {/* Tabs: My Outfits / Inspiration */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-8">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="bg-secondary/50 backdrop-blur-sm border border-border/30 rounded-lg p-1 mb-8">
            <TabsTrigger value="builder" className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-background">
              Outfit Builder
            </TabsTrigger>
            <TabsTrigger value="saved" className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-background">
              Saved Outfits
            </TabsTrigger>
            <TabsTrigger value="inspiration" className="font-body text-xs tracking-wider uppercase data-[state=active]:bg-background">
              Inspiration
            </TabsTrigger>
          </TabsList>

          {/* Builder Tab */}
          <TabsContent value="builder">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="editorial-subheading text-xl md:text-2xl">Style Board</h2>
                  <Button variant="editorial" size="sm">
                    <Plus size={14} />
                    New Outfit
                  </Button>
                </div>

                <div className="glass-card rounded-xl p-4 md:p-8 min-h-[300px] md:min-h-[500px] border border-dashed border-border">
                  {selectedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Plus size={24} className="text-muted-foreground" />
                      </div>
                      <p className="font-body text-muted-foreground text-sm">
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
                            <img src={item.productImage} alt={item.name} className="w-full h-full object-cover" />
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
                        <img src={item.productImage} alt={item.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Saved Sidebar */}
              <div className="space-y-6">
                <h2 className="font-body text-sm tracking-wider uppercase text-muted-foreground">
                  Recent Outfits
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
                      <div className="flex gap-2">
                        {outfit.items.slice(0, 3).map((itemId) => {
                          const item = getItemById(itemId);
                          if (!item) return null;
                          return (
                            <div key={itemId} className="w-16 aspect-square rounded-md overflow-hidden bg-secondary">
                              <img src={item.productImage} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          );
                        })}
                        {outfit.items.length > 3 && (
                          <div className="w-16 aspect-square rounded-md bg-secondary flex items-center justify-center">
                            <span className="font-body text-xs text-muted-foreground">+{outfit.items.length - 3}</span>
                          </div>
                        )}
                      </div>
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
          </TabsContent>

          {/* Saved Outfits Tab */}
          <TabsContent value="saved">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {mockOutfits.map((outfit, index) => (
                <article
                  key={outfit.id}
                  className={cn(
                    'glass-card rounded-xl p-5 space-y-4 hover-lift cursor-pointer opacity-0 animate-fade-up',
                    `stagger-${index + 1}`
                  )}
                >
                  <div className="grid grid-cols-3 gap-1.5">
                    {outfit.items.slice(0, 3).map((itemId) => {
                      const item = getItemById(itemId);
                      if (!item) return null;
                      return (
                        <div key={itemId} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                          <img src={item.productImage} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{outfit.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {outfit.occasion && <Badge variant="outline" className="text-[9px]">{outfit.occasion}</Badge>}
                      {outfit.weather && <Badge variant="outline" className="text-[9px]">{outfit.weather}</Badge>}
                      {outfit.mood && <Badge variant="outline" className="text-[9px]">{outfit.mood}</Badge>}
                    </div>
                  </div>
                </article>
              ))}
              {/* Add New Card */}
              <div className="glass-card rounded-xl border border-dashed border-border flex items-center justify-center min-h-[250px] hover-lift cursor-pointer group">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-secondary mx-auto flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <Plus size={20} />
                  </div>
                  <p className="mono-caption text-[10px]">Create Outfit</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Inspiration Tab */}
          <TabsContent value="inspiration">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg md:text-xl">Style Inspiration</h2>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    Save looks from Pinterest, Instagram, friends, and more
                  </p>
                </div>
                <Button variant="editorial" size="sm">
                  <Plus size={14} />
                  Add Link
                </Button>
              </div>

              {/* Inspiration Grid - Pinterest / Masonry style */}
              <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
                {inspirationItems.map((item, i) => {
                  const SourceIcon = item.sourceIcon;
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'break-inside-avoid glass-card rounded-xl overflow-hidden hover-lift group opacity-0 animate-fade-up',
                        `stagger-${(i % 6) + 1}`
                      )}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Save Button */}
                        <button
                          onClick={() => toggleInspo(item.id)}
                          className={cn(
                            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                            savedInspo.includes(item.id)
                              ? 'bg-foreground text-background'
                              : 'bg-background/70 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100'
                          )}
                        >
                          <Heart size={14} fill={savedInspo.includes(item.id) ? 'currentColor' : 'none'} />
                        </button>

                        {/* Source Badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <SourceIcon size={10} />
                          <span className="font-body text-[9px]">{item.source}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-body text-xs">{item.caption}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connect Sources CTA */}
              <div className="glass-card rounded-xl p-6 md:p-8 text-center space-y-4 opacity-0 animate-fade-up">
                <h3 className="font-display text-lg">Connect Your Sources</h3>
                <p className="font-body text-xs text-muted-foreground max-w-md mx-auto">
                  Link your Pinterest boards, Instagram saves, or share boards with friends for endless inspiration.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="editorial" size="sm" className="gap-2">
                    <Pin size={14} />
                    Pinterest
                  </Button>
                  <Button variant="editorial" size="sm" className="gap-2">
                    <Instagram size={14} />
                    Instagram
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ExternalLink size={14} />
                    Paste Link
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Outfits;
