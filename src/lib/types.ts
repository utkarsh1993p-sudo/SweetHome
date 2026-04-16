export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceVariant?: string; // e.g. "100 / 145" for dual-priced items
  category: MenuCategory;
  isPopular?: boolean;
  isSeasonal?: boolean;
}

export type MenuCategory =
  | "beverages"
  | "refreshments"
  | "sandwiches"
  | "snacks"
  | "south-india"
  | "soups"
  | "pizzas"
  | "pav-bhaji"
  | "tandoori"
  | "hindustani"
  | "breads"
  | "rice"
  | "chinese-starters"
  | "chinese-mains"
  | "sizzlers"
  | "salads"
  | "desserts"
  | "milkshakes"
  | "mastanis"
  | "juices"
  | "ice-cream";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
  createdAt: Date;
  customerName?: string;
  specialInstructions?: string;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface CategoryGroup {
  label: string;
  categories: MenuCategory[];
  emoji: string;
}
