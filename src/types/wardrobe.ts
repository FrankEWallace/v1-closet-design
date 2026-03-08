export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all-season';
export type ClothingStatus = 'clean' | 'dirty' | 'laundry';
export type Category = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
export type Condition = 'new' | 'excellent' | 'good' | 'fair' | 'worn';

export interface WearLogEntry {
  date: string;
  occasion?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: Category;
  productImage: string;
  wornImage?: string;
  status: ClothingStatus;
  sustainabilityScore: number;
  seasons: Season[];
  lastWorn: string;
  material: string;
  condition: Condition;
  price?: number;
  forSale?: boolean;
  size?: string;
  wearLog?: WearLogEntry[];
}

export interface Outfit {
  id: string;
  name: string;
  items: string[];
  occasion?: string;
  weather?: string;
  mood?: string;
  scheduledDate?: string;
  createdAt: string;
}
