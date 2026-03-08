import { mockClothingItems } from '@/data/mockData';
import { Shirt, Sparkles, Leaf, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InsightsBar() {
  const totalItems = mockClothingItems.length;
  const cleanCount = mockClothingItems.filter(i => i.status === 'clean').length;
  const cleanPercent = Math.round((cleanCount / totalItems) * 100);
  const avgSustainability = Math.round(
    mockClothingItems.reduce((acc, i) => acc + i.sustainabilityScore, 0) / totalItems * 10
  ) / 10;
  const totalWears = mockClothingItems.reduce((acc, i) => acc + (i.wearLog?.length || 0), 0);
  const costPerWear = mockClothingItems.filter(i => i.price).length > 0
    ? Math.round(
        mockClothingItems.filter(i => i.price).reduce((acc, i) => acc + (i.price || 0), 0) /
        mockClothingItems.filter(i => i.price).reduce((acc, i) => acc + (i.wearLog?.length || 1), 0)
      )
    : null;

  const stats = [
    {
      icon: Shirt,
      value: totalItems.toString(),
      label: 'Total Pieces',
      sub: `${cleanPercent}% ready to wear`,
      color: 'text-foreground',
    },
    {
      icon: TrendingUp,
      value: totalWears.toString(),
      label: 'Total Wears',
      sub: costPerWear ? `~$${costPerWear}/wear` : 'Start logging',
      color: 'text-foreground',
    },
    {
      icon: Leaf,
      value: avgSustainability.toFixed(1),
      label: 'Eco Score',
      sub: avgSustainability >= 7 ? 'Excellent' : avgSustainability >= 5 ? 'Good' : 'Room to grow',
      color: 'text-foreground',
    },
    {
      icon: Sparkles,
      value: new Set(mockClothingItems.map(i => i.category)).size.toString(),
      label: 'Categories',
      sub: `${new Set(mockClothingItems.map(i => i.brand)).size} brands`,
      color: 'text-foreground',
    },
  ];

  return (
    <section className="border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'py-5 md:py-8 px-3 md:px-6 opacity-0 animate-fade-up',
                `stagger-${index + 1}`,
                index < 3 && 'border-r border-border/40',
                index === 1 && 'border-r-0 md:border-r',
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <stat.icon size={14} className="text-muted-foreground md:w-4 md:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl md:text-2xl leading-none">{stat.value}</p>
                  <p className="mono-caption text-[9px] md:text-[10px] mt-1.5">{stat.label}</p>
                  <p className="font-body text-[10px] md:text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}