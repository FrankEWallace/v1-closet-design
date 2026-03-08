import { Layout } from '@/components/layout/Layout';
import { mockClothingItems } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Leaf, Shirt, AlertTriangle, 
  Calendar, BarChart3, PieChart, Clock, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Insights = () => {
  const totalItems = mockClothingItems.length;
  const totalWears = mockClothingItems.reduce((acc, i) => acc + (i.wearLog?.length || 0), 0);
  const cleanCount = mockClothingItems.filter(i => i.status === 'clean').length;
  const dirtyCount = mockClothingItems.filter(i => i.status === 'dirty').length;
  const laundryCount = mockClothingItems.filter(i => i.status === 'laundry').length;
  const avgSustainability = (
    mockClothingItems.reduce((acc, i) => acc + i.sustainabilityScore, 0) / totalItems
  );

  // Most worn
  const sortedByWear = [...mockClothingItems].sort(
    (a, b) => (b.wearLog?.length || 0) - (a.wearLog?.length || 0)
  );
  const mostWorn = sortedByWear.slice(0, 5);
  const leastWorn = sortedByWear.slice(-3).reverse();

  // Never worn (0 wear logs)
  const neverWorn = mockClothingItems.filter(i => !i.wearLog || i.wearLog.length === 0);

  // Category breakdown
  const categoryBreakdown = mockClothingItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Brand breakdown
  const brandBreakdown = mockClothingItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {});

  // Cost per wear for priced items
  const pricedItems = mockClothingItems.filter(i => i.price);
  const avgCostPerWear = pricedItems.length > 0
    ? Math.round(
        pricedItems.reduce((acc, i) => acc + (i.price || 0) / Math.max(i.wearLog?.length || 1, 1), 0) / pricedItems.length
      )
    : null;

  // Full wear timeline
  const allWearEntries = mockClothingItems
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

  const groupedByDate = allWearEntries.reduce<Record<string, typeof allWearEntries>>((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        <div className="max-w-3xl space-y-3 md:space-y-5 opacity-0 animate-fade-up">
          <p className="mono-caption">Wardrobe Analytics</p>
          <h1 className="editorial-heading">
            Your Style
            <br />
            <em className="italic">Insights</em>
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
            Understand your wardrobe habits, discover unused gems, and make smarter style decisions.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="border-y border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: Shirt, value: totalItems, label: 'Total Pieces', sub: `${cleanCount} clean · ${dirtyCount} dirty · ${laundryCount} laundry` },
              { icon: TrendingUp, value: totalWears, label: 'Total Wears', sub: `${(totalWears / totalItems).toFixed(1)} avg per item` },
              { icon: Leaf, value: avgSustainability.toFixed(1), label: 'Avg Eco Score', sub: avgSustainability >= 7 ? 'Excellent' : avgSustainability >= 5 ? 'Good' : 'Improve' },
              { icon: BarChart3, value: avgCostPerWear ? `$${avgCostPerWear}` : '—', label: 'Avg Cost/Wear', sub: pricedItems.length > 0 ? `${pricedItems.length} priced items` : 'No price data' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'py-5 md:py-8 px-3 md:px-6 opacity-0 animate-fade-up',
                  `stagger-${i + 1}`,
                  i < 3 && 'border-r border-border/40',
                  i === 1 && 'border-r-0 md:border-r',
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <stat.icon size={14} className="text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl md:text-2xl leading-none">{stat.value}</p>
                    <p className="mono-caption text-[9px] md:text-[10px] mt-1.5">{stat.label}</p>
                    <p className="font-body text-[9px] md:text-xs text-muted-foreground mt-0.5 truncate">{stat.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 space-y-10 md:space-y-16">
        {/* Most Worn & Least Worn */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Most Worn */}
          <div className="opacity-0 animate-fade-up stagger-1">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} className="text-foreground" />
              <h2 className="font-display text-lg md:text-xl">Most Worn</h2>
            </div>
            <div className="space-y-2">
              {mostWorn.map((item, i) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className="flex items-center gap-3 glass-card rounded-lg p-3 hover-lift group"
                >
                  <span className="font-display text-lg text-muted-foreground w-5">{i + 1}</span>
                  <img src={item.productImage} alt={item.name} className="w-11 h-11 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs truncate group-hover:text-muted-foreground transition-colors">{item.name}</p>
                    <p className="mono-caption text-[8px]">{item.brand}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl">{item.wearLog?.length || 0}</p>
                    <p className="mono-caption text-[8px]">wears</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Least Worn / Never Worn */}
          <div className="opacity-0 animate-fade-up stagger-2">
            <div className="flex items-center gap-2 mb-5">
              <TrendingDown size={16} className="text-foreground" />
              <h2 className="font-display text-lg md:text-xl">Least Worn</h2>
            </div>
            <div className="space-y-2">
              {leastWorn.map((item) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className="flex items-center gap-3 glass-card rounded-lg p-3 hover-lift group"
                >
                  <img src={item.productImage} alt={item.name} className="w-11 h-11 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs truncate">{item.name}</p>
                    <p className="mono-caption text-[8px]">{item.brand}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl">{item.wearLog?.length || 0}</p>
                    <p className="mono-caption text-[8px]">wears</p>
                  </div>
                </Link>
              ))}
              {neverWorn.length > 0 && (
                <div className="glass-card rounded-lg p-3 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-muted-foreground" />
                  <p className="font-body text-xs text-muted-foreground">
                    {neverWorn.length} item{neverWorn.length > 1 ? 's' : ''} never worn
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category & Brand Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Categories */}
          <div className="opacity-0 animate-fade-up stagger-1">
            <div className="flex items-center gap-2 mb-5">
              <PieChart size={16} className="text-foreground" />
              <h2 className="font-display text-lg md:text-xl">Category Breakdown</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="mono-caption text-[10px] capitalize">{category}</span>
                      <span className="font-body text-xs text-muted-foreground">{count} pieces</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground/30 rounded-full transition-all duration-700"
                        style={{ width: `${(count / totalItems) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Brands */}
          <div className="opacity-0 animate-fade-up stagger-2">
            <div className="flex items-center gap-2 mb-5">
              <Shirt size={16} className="text-foreground" />
              <h2 className="font-display text-lg md:text-xl">Brand Distribution</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(brandBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([brand, count]) => (
                  <div
                    key={brand}
                    className="glass-card rounded-lg px-4 py-3 text-center hover-lift"
                  >
                    <p className="font-display text-sm">{brand}</p>
                    <p className="mono-caption text-[9px] mt-0.5">{count} piece{count > 1 ? 's' : ''}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="opacity-0 animate-fade-up">
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={16} className="text-foreground" />
            <h2 className="font-display text-lg md:text-xl">Wardrobe Status</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Clean', count: cleanCount, pct: Math.round((cleanCount / totalItems) * 100), color: 'bg-foreground/10' },
              { label: 'Dirty', count: dirtyCount, pct: Math.round((dirtyCount / totalItems) * 100), color: 'bg-foreground/20' },
              { label: 'Laundry', count: laundryCount, pct: Math.round((laundryCount / totalItems) * 100), color: 'bg-foreground/15' },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 md:p-5 text-center">
                <p className="font-display text-2xl md:text-3xl">{s.count}</p>
                <p className="mono-caption text-[9px] mt-1">{s.label}</p>
                <div className="h-1 bg-secondary rounded-full mt-3 overflow-hidden">
                  <div className={cn('h-full rounded-full', s.color)} style={{ width: `${s.pct}%` }} />
                </div>
                <p className="font-body text-[10px] text-muted-foreground mt-1">{s.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Wear Timeline */}
        <div className="opacity-0 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-foreground" />
              <h2 className="font-display text-lg md:text-xl">Wear Timeline</h2>
            </div>
            <Badge variant="secondary" className="text-[9px]">{allWearEntries.length} entries</Badge>
          </div>

          <div className="space-y-0 border-l border-border/60 ml-4 md:ml-5">
            {Object.entries(groupedByDate).slice(0, 12).map(([date, entries], groupIdx) => (
              <div key={date} className="relative pl-6 md:pl-8 pb-5">
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-foreground/30 -translate-x-1" />
                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className="font-display text-sm md:text-base">{formatDate(date)}</span>
                  <span className="mono-caption text-[9px]">{entries.length} item{entries.length > 1 ? 's' : ''}</span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                  {entries.map((entry, i) => (
                    <Link
                      key={`${entry.itemId}-${i}`}
                      to={`/item/${entry.itemId}`}
                      className="flex-shrink-0 flex items-center gap-2.5 bg-secondary/50 rounded-lg px-3 py-2 hover:bg-secondary transition-colors"
                    >
                      <img src={entry.itemImage} alt={entry.itemName} className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover" />
                      <div className="min-w-0">
                        <p className="font-body text-[11px] md:text-xs truncate max-w-[120px]">{entry.itemName}</p>
                        <p className="mono-caption text-[8px]">{entry.itemBrand}</p>
                        {entry.occasion && (
                          <p className="font-body text-[8px] text-muted-foreground italic">{entry.occasion}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;
