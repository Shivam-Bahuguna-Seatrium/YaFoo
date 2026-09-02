import type { DestinationMeal } from "@/types/domain";

const dosaImage =
  "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85";
const bowlImage =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85";
const thaliImage =
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85";
const saladImage =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85";

export const destinationMeals: DestinationMeal[] = [
  {
    id: "office-thali",
    name: "Everyday Office Thali",
    providerName: "Tiffin Theory",
    description: "Dal, two seasonal sabzis, roti, rice, and a small sweet.",
    imageUrl: thaliImage,
    dietaryTags: ["vegetarian"],
    servingLabel: "One balanced lunch",
    price: 189,
    deliveryMinutes: 35,
    availableDestinationIds: ["bkc-office", "andheri-studio"],
    availableWindowIds: ["lunch-today", "lunch-tomorrow"],
    isPopular: true,
    isAvailable: true,
    promotion: "Free chaas on office lunches",
  },
  {
    id: "paneer-power-bowl",
    name: "Paneer Power Bowl",
    providerName: "Bombay Bowl Co.",
    description: "Paneer, millet, greens, roasted vegetables, and mint dressing.",
    imageUrl: bowlImage,
    dietaryTags: ["vegetarian"],
    servingLabel: "High-protein bowl",
    price: 249,
    deliveryMinutes: 30,
    availableDestinationIds: ["bkc-office", "powai-home", "andheri-studio"],
    availableWindowIds: ["lunch-today", "lunch-tomorrow", "dinner-today"],
    isPopular: true,
    isAvailable: true,
    promotion: null,
  },
  {
    id: "home-masala-dosa",
    name: "Masala Dosa Meal",
    providerName: "Dosa District",
    description: "Crisp masala dosa with sambar, chutneys, and filter coffee.",
    imageUrl: dosaImage,
    dietaryTags: ["vegetarian"],
    servingLabel: "Dosa with sides",
    price: 169,
    deliveryMinutes: 28,
    availableDestinationIds: ["powai-home", "bkc-office"],
    availableWindowIds: ["lunch-today", "dinner-today"],
    isPopular: false,
    isAvailable: true,
    promotion: "Coffee included",
  },
  {
    id: "green-office-salad",
    name: "Greenline Grain Salad",
    providerName: "Greenline Kitchen",
    description: "Seasonal greens, grains, roasted chickpeas, and lemon dressing.",
    imageUrl: saladImage,
    dietaryTags: ["vegetarian", "vegan"],
    servingLabel: "Light lunch bowl",
    price: 229,
    deliveryMinutes: 32,
    availableDestinationIds: ["bkc-office", "powai-home"],
    availableWindowIds: ["lunch-tomorrow", "dinner-today"],
    isPopular: false,
    isAvailable: true,
    promotion: null,
  },
  {
    id: "paused-kitchen-meal",
    name: "Seasonal Kitchen Special",
    providerName: "Monsoon Kitchen",
    description: "A rotating meal currently unavailable for this demo window.",
    imageUrl: bowlImage,
    dietaryTags: ["vegetarian"],
    servingLabel: "One meal",
    price: 199,
    deliveryMinutes: 40,
    availableDestinationIds: ["bkc-office"],
    availableWindowIds: ["lunch-today"],
    isPopular: false,
    isAvailable: false,
    promotion: "Kitchen resumes tomorrow",
  },
];

export const destinationMealById = Object.fromEntries(
  destinationMeals.map((meal) => [meal.id, meal]),
) as Record<string, DestinationMeal>;
