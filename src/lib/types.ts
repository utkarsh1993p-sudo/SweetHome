export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export type MenuCategory =
  | "starters"
  | "mains"
  | "breads"
  | "desserts"
  | "drinks";

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
