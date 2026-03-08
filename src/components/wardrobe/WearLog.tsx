import { useState } from 'react';
import { mockClothingItems } from '@/data/mockData';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WearLog() {
  const [isOpen, setIsOpen] = useState(false);

  // Build a timeline from all items' wear logs
  const allEntries = mockClothingItems
    .flatMap(item =>
      (item.wearLog || []).map(log => ({
        ...log,
        itemName: item.name,
        itemImage: item.productImage,
        itemBrand: item.brand,
        itemId: item.id,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const grouped = allEntries.reduce<Record<string, typeof allEntries>>((acc, entry) => {
    const key = entry.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center">
            <Clock size={14} className="text-muted-foreground md:w-4 md:h-4" />
          </div>
          <div className="text-left">
            <h3 className="font-display text-base md:text-lg">Wear Journal</h3>
            <p className="mono-caption text-[9px] md:text-[10px] mt-0.5">{allEntries.length} entries logged</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono-caption text-[9px] md:text-[10px] hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
            {isOpen ? 'Collapse' : 'Expand'}
          </span>
          {isOpen ? (
            <ChevronUp size={16} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={16} className="text-muted-foreground" />
          )}
        </div>
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-out',
          isOpen ? 'max-h-[600px] opacity-100 pb-6' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-0 border-l border-border/60 ml-4 md:ml-5">
          {Object.entries(grouped).slice(0, 8).map(([date, entries], groupIdx) => (
            <div key={date} className={cn('relative pl-6 md:pl-8 pb-5', groupIdx === 0 && 'animate-fade-up')}>
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-foreground/30 -translate-x-1" />
              
              {/* Date header */}
              <div className="flex items-baseline gap-2 mb-2.5">
                <span className="font-display text-sm md:text-base">{formatDate(date)}</span>
                <span className="mono-caption text-[9px]">{formatDay(date)}</span>
              </div>

              {/* Items worn that day */}
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                {entries.map((entry, i) => (
                  <div
                    key={`${entry.itemId}-${i}`}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-secondary/50 rounded-lg px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    <img
                      src={entry.itemImage}
                      alt={entry.itemName}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-body text-[11px] md:text-xs truncate max-w-[120px]">{entry.itemName}</p>
                      <p className="mono-caption text-[8px] md:text-[9px]">{entry.itemBrand}</p>
                      {entry.occasion && (
                        <p className="font-body text-[8px] text-muted-foreground italic">{entry.occasion}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}