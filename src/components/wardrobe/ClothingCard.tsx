import { useState } from 'react';
import { ClothingItem } from '@/types/wardrobe';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Leaf, Calendar } from 'lucide-react';

interface ClothingCardProps {
  item: ClothingItem;
  index?: number;
}

export function ClothingCard({ item, index = 0 }: ClothingCardProps) {
  const [showWorn, setShowWorn] = useState(false);
  const currentImage = showWorn && item.wornImage ? item.wornImage : item.productImage;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const statusVariant = item.status === 'clean' ? 'clean' : item.status === 'dirty' ? 'dirty' : 'laundry';

  return (
    <Link
      to={`/item/${item.id}`}
      className={cn(
        'group block opacity-0 animate-fade-up',
        `stagger-${(index % 6) + 1}`
      )}
    >
      <article className="relative overflow-hidden rounded-lg bg-card hover-lift">
        {/* Image Container */}
        <div 
          className="relative aspect-[3/4] overflow-hidden bg-secondary"
          onMouseEnter={() => item.wornImage && setShowWorn(true)}
          onMouseLeave={() => setShowWorn(false)}
        >
          <img
            src={currentImage}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image toggle indicator */}
          {item.wornImage && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                !showWorn ? 'bg-primary-foreground' : 'bg-primary-foreground/40'
              )} />
              <span className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                showWorn ? 'bg-primary-foreground' : 'bg-primary-foreground/40'
              )} />
            </div>
          )}

          {/* Status Badge */}
          <Badge 
            variant={statusVariant}
            className="absolute top-4 right-4 text-[10px]"
          >
            {item.status}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category & Brand */}
          <div className="flex items-center justify-between">
            <span className="mono-caption">{item.category}</span>
            <span className="mono-caption">{item.brand}</span>
          </div>

          {/* Name */}
          <h3 className="font-display text-lg leading-tight group-hover:text-muted-foreground transition-colors">
            {item.name}
          </h3>

          {/* Meta Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {/* Sustainability */}
            <div className="flex items-center gap-1.5">
              <Leaf size={12} className="text-sage" />
              <span className="font-body text-xs text-muted-foreground">
                {item.sustainabilityScore}/10
              </span>
            </div>

            {/* Last Worn */}
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-muted-foreground" />
              <span className="font-body text-xs text-muted-foreground">
                {formatDate(item.lastWorn)}
              </span>
            </div>
          </div>

          {/* Season Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.seasons.map((season) => (
              <Badge key={season} variant="season" className="text-[10px]">
                {season}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
