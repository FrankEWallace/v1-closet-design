import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockClothingItems } from '@/data/mockData';
import { ArrowLeft, Leaf, Calendar, Tag, Sparkles, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockClothingItems.find(i => i.id === id);
  const [activeImage, setActiveImage] = useState<'product' | 'worn'>('product');

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Item not found</p>
          <Link to="/" className="text-foreground underline mt-4 inline-block">
            Return to wardrobe
          </Link>
        </div>
      </Layout>
    );
  }

  const images = [
    { key: 'product', src: item.productImage, label: 'Product' },
    ...(item.wornImage ? [{ key: 'worn', src: item.wornImage, label: 'Worn' }] : []),
  ];

  const currentImage = activeImage === 'worn' && item.wornImage ? item.wornImage : item.productImage;
  const statusVariant = item.status === 'clean' ? 'clean' : item.status === 'dirty' ? 'dirty' : 'laundry';

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-8">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 font-body text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Wardrobe</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4 opacity-0 animate-fade-up">
            {/* Main Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
              <img
                src={currentImage}
                alt={item.name}
                className="w-full h-full object-cover animate-scale-in"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img) => (
                  <button
                    key={img.key}
                    onClick={() => setActiveImage(img.key as 'product' | 'worn')}
                    className={cn(
                      'relative aspect-square w-20 overflow-hidden rounded-md transition-all duration-300',
                      activeImage === img.key 
                        ? 'ring-2 ring-foreground' 
                        : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 right-1 text-center font-body text-[9px] uppercase tracking-wider text-primary-foreground bg-foreground/70 rounded-sm py-0.5">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8 opacity-0 animate-fade-up stagger-2">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="status">{item.category}</Badge>
                <Badge variant={statusVariant}>{item.status}</Badge>
              </div>
              <p className="mono-caption">{item.brand}</p>
              <h1 className="editorial-heading">{item.name}</h1>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-6 py-8 border-y border-border/50">
              <div className="space-y-1">
                <p className="mono-caption flex items-center gap-2">
                  <Shirt size={12} />
                  Material
                </p>
                <p className="font-body text-sm">{item.material}</p>
              </div>
              <div className="space-y-1">
                <p className="mono-caption flex items-center gap-2">
                  <Tag size={12} />
                  Condition
                </p>
                <p className="font-body text-sm capitalize">{item.condition}</p>
              </div>
              <div className="space-y-1">
                <p className="mono-caption flex items-center gap-2">
                  <Leaf size={12} />
                  Sustainability
                </p>
                <p className="font-body text-sm">{item.sustainabilityScore}/10</p>
              </div>
              <div className="space-y-1">
                <p className="mono-caption flex items-center gap-2">
                  <Calendar size={12} />
                  Last Worn
                </p>
                <p className="font-body text-sm">
                  {new Date(item.lastWorn).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Seasons */}
            <div className="space-y-3">
              <p className="mono-caption flex items-center gap-2">
                <Sparkles size={12} />
                Seasonality
              </p>
              <div className="flex flex-wrap gap-2">
                {item.seasons.map((season) => (
                  <Badge key={season} variant="season">
                    {season}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 md:gap-4 pt-4">
              <Button variant="premium" size="default" className="flex-1 md:flex-none">
                Add to Outfit
              </Button>
              <Button variant="editorial" size="default" className="flex-1 md:flex-none">
                Mark as Worn
              </Button>
            </div>

            {/* For Sale Banner */}
            {item.forSale && item.price && (
              <div className="glass-card rounded-lg p-6 space-y-3 mt-8">
                <p className="mono-caption">Listed for Sale</p>
                <p className="font-display text-3xl">${item.price.toLocaleString()}</p>
                <Button variant="default" className="w-full">
                  View in Marketplace
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
