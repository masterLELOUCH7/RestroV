export type SpiceLevel = 'mild' | 'medium' | 'fiery';

export type DishCategory =
  | 'bestseller'
  | 'veg'
  | 'nonveg'
  | 'biryani'
  | 'starter'
  | 'dessert'
  | 'drinks';

export interface DishAddon {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: number;
  name: string;
  hindiName: string;
  desc: string;
  story: string;
  price: number;
  oldPrice: number | null;
  img: string;
  badge?: 'hot' | 'veg' | 'bestseller' | 'new';
  category: DishCategory[];
  isVeg: boolean;
  spiceDefault: SpiceLevel;
  prepTime: string;
  calories: string;
  stars: number;
  reviewsCount: number;
  addons: DishAddon[];
}

export interface CartItem {
  cartKey: string;
  id: number;
  name: string;
  price: number;
  unitPrice: number;
  img: string;
  qty: number;
  isVeg: boolean;
  spice?: SpiceLevel;
  selectedAddons?: DishAddon[];
  customSummary?: string;
  itemType: 'dish' | 'thali' | 'subscription' | 'catering-deposit';
}

export interface Offer {
  code: string;
  icon: string;
  pct: string;
  pctSuffix?: string;
  pctPrefix?: string;
  title: string;
  desc: string;
  validity: string;
  featured?: boolean;
  ribbon?: string;
  discountType: 'percent' | 'flat' | 'freeDelivery';
  discountValue: number;
  minOrder: number;
  modelTag: string;
}

export interface DiningTable {
  id: string;
  label: string;
  zone: 'Tandoor Counter' | 'Window Luxe' | 'Courtyard' | 'Royal Private Room';
  seats: number;
  status: 'available' | 'limited' | 'booked';
  minSpend: number;
  perks: string[];
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ThaliSlotItem {
  id: string;
  name: string;
  isVeg: boolean;
  alacartePrice: number;
  tag: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  isVegOption: boolean;
  mealsPerWeek: number;
  weeklyPrice: number;
  monthlyPrice: number;
  retailValue: number;
  popular?: boolean;
  features: string[];
  sampleMenu: string[];
}

export interface CateringTier {
  id: string;
  name: string;
  subtitle: string;
  pricePerPlate: number;
  courses: string;
  highlights: string[];
}

export interface CateringAddon {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: 'flat' | 'per-guest';
}

export interface ReservationRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  tableLabel: string;
  zone: string;
  requests: string;
  createdAt: string;
}

export interface BusinessModelSpec {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  marginProfile: string;
  revenueRole: string;
  problemSolved: string;
  mechanism: string;
  kpis: { label: string; value: string }[];
  uiTouchpoint: string;
}
