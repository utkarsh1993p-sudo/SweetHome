import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Paneer Tikka",
    description:
      "Marinated cottage cheese grilled in a tandoor with peppers and onions",
    price: 280,
    category: "starters",
    image: "/images/paneer-tikka.jpg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: "s2",
    name: "Chicken Malai Tikka",
    description: "Tender chicken marinated in cream, cheese, and aromatic spices",
    price: 320,
    category: "starters",
    image: "/images/malai-tikka.jpg",
    isVeg: false,
    isPopular: true,
  },
  {
    id: "s3",
    name: "Veg Spring Rolls",
    description: "Crispy rolls filled with seasoned vegetables and glass noodles",
    price: 200,
    category: "starters",
    image: "/images/spring-rolls.jpg",
    isVeg: true,
  },
  {
    id: "s4",
    name: "Mutton Seekh Kebab",
    description: "Minced mutton with herbs and spices grilled on skewers",
    price: 380,
    category: "starters",
    image: "/images/seekh-kebab.jpg",
    isVeg: false,
  },

  // Mains
  {
    id: "m1",
    name: "Butter Chicken",
    description:
      "Slow-cooked chicken in a rich, creamy tomato-based sauce with aromatic spices",
    price: 420,
    category: "mains",
    image: "/images/butter-chicken.jpg",
    isVeg: false,
    isPopular: true,
  },
  {
    id: "m2",
    name: "Paneer Makhani",
    description:
      "Fresh cottage cheese in a velvety tomato and cream sauce — our vegetarian star",
    price: 360,
    category: "mains",
    image: "/images/paneer-makhani.jpg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: "m3",
    name: "Dal Makhani",
    description:
      "Black lentils slow-cooked overnight with butter and cream",
    price: 300,
    category: "mains",
    image: "/images/dal-makhani.jpg",
    isVeg: true,
  },
  {
    id: "m4",
    name: "Mutton Rogan Josh",
    description:
      "Aromatic Kashmiri lamb curry cooked with whole spices and yogurt",
    price: 520,
    category: "mains",
    image: "/images/rogan-josh.jpg",
    isVeg: false,
  },
  {
    id: "m5",
    name: "Biryani — Veg",
    description:
      "Fragrant basmati rice layered with spiced vegetables and saffron",
    price: 340,
    category: "mains",
    image: "/images/veg-biryani.jpg",
    isVeg: true,
  },
  {
    id: "m6",
    name: "Biryani — Chicken",
    description:
      "Slow-cooked dum biryani with tender chicken, whole spices, and fried onions",
    price: 420,
    category: "mains",
    image: "/images/chicken-biryani.jpg",
    isVeg: false,
    isPopular: true,
  },

  // Breads
  {
    id: "b1",
    name: "Butter Naan",
    description: "Soft leavened bread baked in a tandoor, finished with butter",
    price: 60,
    category: "breads",
    image: "/images/naan.jpg",
    isVeg: true,
  },
  {
    id: "b2",
    name: "Garlic Naan",
    description: "Tandoor bread topped with fresh garlic and coriander",
    price: 80,
    category: "breads",
    image: "/images/garlic-naan.jpg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: "b3",
    name: "Laccha Paratha",
    description: "Flaky, layered whole-wheat bread cooked on a griddle",
    price: 70,
    category: "breads",
    image: "/images/paratha.jpg",
    isVeg: true,
  },

  // Desserts
  {
    id: "d1",
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in rose-flavored sugar syrup, served warm",
    price: 120,
    category: "desserts",
    image: "/images/gulab-jamun.jpg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: "d2",
    name: "Kulfi Falooda",
    description:
      "Traditional Indian ice cream with vermicelli, basil seeds, and rose syrup",
    price: 150,
    category: "desserts",
    image: "/images/kulfi.jpg",
    isVeg: true,
  },
  {
    id: "d3",
    name: "Rasgulla",
    description:
      "Soft cottage-cheese balls simmered in light sugar syrup",
    price: 110,
    category: "desserts",
    image: "/images/rasgulla.jpg",
    isVeg: true,
  },

  // Drinks
  {
    id: "dr1",
    name: "Mango Lassi",
    description: "Thick yogurt blended with ripe Alphonso mangoes",
    price: 120,
    category: "drinks",
    image: "/images/mango-lassi.jpg",
    isVeg: true,
    isPopular: true,
  },
  {
    id: "dr2",
    name: "Masala Chai",
    description:
      "Spiced Indian tea brewed with ginger, cardamom, and cinnamon",
    price: 60,
    category: "drinks",
    image: "/images/chai.jpg",
    isVeg: true,
  },
  {
    id: "dr3",
    name: "Fresh Lime Soda",
    description: "Chilled sparkling water with freshly squeezed lime and mint",
    price: 80,
    category: "drinks",
    image: "/images/lime-soda.jpg",
    isVeg: true,
  },
];

export const categoryLabels: Record<string, string> = {
  starters: "Starters",
  mains: "Main Course",
  breads: "Breads",
  desserts: "Desserts",
  drinks: "Drinks",
};
