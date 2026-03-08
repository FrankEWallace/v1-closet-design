import { Layout } from '@/components/layout/Layout';
import { mockClothingItems, mockOutfits } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Layers, BarChart3, TrendingUp, Leaf, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const totalItems = mockClothingItems.length;
  const cleanCount = mockClothingItems.filter(i => i.status === 'clean').length;
  const totalWears = mockClothingItems.reduce((acc, i) => acc + (i.wearLog?.length || 0), 0);
  const avgSustainability = (
    mockClothingItems.reduce((acc, i) => acc + i.sustainabilityScore, 0) / totalItems
  ).toFixed(1);

  // Recent wear entries
  const recentWears = mockClothingItems
    .flatMap(item =>
      (item.wearLog || []).slice(0, 2).map(log => ({
        ...log,
        itemName: item.name,
        itemImage: item.productImage,
        itemBrand: item.brand,
        itemId: item.id,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Most worn items
  const mostWorn = [...mockClothingItems]
    .sort((a, b) => (b.wearLog?.length || 0) - (a.wearLog?.length || 0))
    .slice(0, 4);

  // Least worn items
  const leastWorn = [...mockClothingItems]
    .sort((a, b) => (a.wearLog?.length || 0) - (b.wearLog?.length || 0))
    .slice(0, 3);

  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Layout>
      {/* Hero Greeting */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        <div className="max-w-3xl space-y-3 md:space-y-5 opacity-0 animate-fade-up">
          <p className="mono-caption">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="editorial-heading">
            {timeOfDay()},
            <br />
            <em className="italic">Welcome Back</em>
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
            Here's your wardrobe at a glance. Stay styled, stay sustainable.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 pb-8 md:pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: Shirt, value: totalItems, label: 'Pieces', sub: `${cleanCount} clean`, href: '/wardrobe' },
            { icon: Layers, value: mockOutfits.length, label: 'Outfits', sub: 'Saved looks', href: '/outfits' },
            { icon: TrendingUp, value: totalWears, label: 'Total Wears', sub: 'This season', href: '/insights' },
            { icon: Leaf, value: avgSustainability, label: 'Eco Score', sub: 'Avg rating', href: '/insights' },
          ].map((stat, i) => (
            <Link
              key={stat.label}
              to={stat.href}
              className={cn(
                'glass-card rounded-xl p-4 md:p-5 hover-lift opacity-0 animate-fade-up group',
                `stagger-${i + 1}`
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon size={16} className="text-muted-foreground" />
                </div>
                <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-display text-2xl md:text-3xl">{stat.value}</p>
              <p className="mono-caption text-[9px] md:text-[10px] mt-1">{stat.label}</p>
              <p className="font-body text-[10px] text-muted-foreground">{stat.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="editorial-subheading text-xl md:text-2xl">Recent Wears</h2>
          <Link to="/insights" className="mono-caption text-[10px] hover:text-foreground transition-colors flex items-center gap-1">
            View All <ArrowRight size={10} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {recentWears.map((entry, i) => (
            <Link
              key={`${entry.itemId}-${entry.date}-${i}`}
              to={`/item/${entry.itemId}`}
              className={cn(
                'flex-shrink-0 glass-card rounded-xl p-3 w-[160px] md:w-[200px] hover-lift opacity-0 animate-fade-up',
                `stagger-${i + 1}`
              )}
            >
              <img
                src={entry.itemImage}
                alt={entry.itemName}
                className="w-full aspect-square rounded-lg object-cover mb-3"
              />
              <p className="font-body text-xs truncate">{entry.itemName}</p>
              <p className="mono-caption text-[8px] mt-0.5">{entry.itemBrand}</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock size={9} className="text-muted-foreground" />
                <p className="font-body text-[9px] text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                {entry.occasion && (
                  <Badge variant="outline" className="text-[7px] px-1.5 py-0 ml-auto">{entry.occasion}</Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Most Worn & Least Worn */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Most Worn */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg md:text-xl">Most Worn</h3>
              <Badge variant="secondary" className="text-[9px]">Favourites</Badge>
            </div>
            <div className="space-y-2.5">
              {mostWorn.map((item, i) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className={cn(
                    'flex items-center gap-3 glass-card rounded-lg p-3 hover-lift opacity-0 animate-fade-up',
                    `stagger-${i + 1}`
                  )}
                >
                  <img src={item.productImage} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs truncate">{item.name}</p>
                    <p className="mono-caption text-[8px]">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg">{item.wearLog?.length || 0}</p>
                    <p className="mono-caption text-[8px]">wears</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg md:text-xl">Needs Love</h3>
              <Badge variant="secondary" className="text-[9px]">Underused</Badge>
            </div>
            <div className="space-y-2.5">
              {leastWorn.map((item, i) => (
                <Link
                  key={item.id}
                  to={`/item/${item.id}`}
                  className={cn(
                    'flex items-center gap-3 glass-card rounded-lg p-3 hover-lift opacity-0 animate-fade-up',
                    `stagger-${i + 1}`
                  )}
                >
                  <img src={item.productImage} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs truncate">{item.name}</p>
                    <p className="mono-caption text-[8px]">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg">{item.wearLog?.length || 0}</p>
                    <p className="mono-caption text-[8px]">wears</p>
                  </div>
                </Link>
              ))}
              <Link
                to="/marketplace"
                className="block text-center py-3 glass-card rounded-lg mono-caption text-[10px] hover:text-foreground transition-colors"
              >
                Consider selling underused items →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { label: 'Browse Wardrobe', desc: 'View all pieces', href: '/wardrobe', icon: Shirt },
            { label: 'Build Outfit', desc: 'Create a look', href: '/outfits', icon: Layers },
            { label: 'View Insights', desc: 'Wardrobe analytics', href: '/insights', icon: BarChart3 },
          ].map((action, i) => (
            <Link
              key={action.href}
              to={action.href}
              className={cn(
                'glass-card rounded-xl p-5 md:p-6 hover-lift group opacity-0 animate-fade-up text-center',
                `stagger-${i + 1}`
              )}
            >
              <div className="w-11 h-11 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                <action.icon size={18} />
              </div>
              <p className="font-display text-sm md:text-base">{action.label}</p>
              <p className="mono-caption text-[9px] mt-1">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
