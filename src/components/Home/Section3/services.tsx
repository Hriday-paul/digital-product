export type Service = {
  slug: string;
  title: string;
  category: string;
  price: number;
  image: string;
  priceRange?: string;
};

export const serviceCategories = [
  "AI Tools",
  "Software",
  "Design",
  "Streaming",
  "VPN",
];

const base = {
  price: 25,
};

export const services: Service[] = [
  {
    ...base,
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    image: "/serviceImg.webp",
    category: "Design",
    priceRange: "$20.00 – $250.00",
  },
  {
    ...base,
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    category: "Software",
    image: "/serviceImg.webp",
    priceRange: "$35.00 – $180.00",
  },
  {
    ...base,
    slug: "the-power-of-big-data",
    title: "The Power of Big Data",
    category: "AI Tools",
    image: "/serviceImg.webp",
    priceRange: "$25.00 – $120.00",
  },
  {
    ...base,
    slug: "balancing-productivity-and-focus",
    title: "Balancing Productivity and Focus",
    category: "Streaming",
    image: "/serviceImg.webp",
    priceRange: "$15.00 – $90.00",
  },
  {
    ...base,
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    category: "VPN",
    image: "/serviceImg.webp",
    priceRange: "$30.00 – $150.00",
  },
  {
    ...base,
    slug: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    category: "Software",
    image: "/serviceImg.webp",
    priceRange: "$40.00 – $220.00",
  },
  {
    ...base,
    slug: "creative-ui-ux-design-system",
    title: "Creative UI/UX Design System",
    category: "Design",
    image: "/serviceImg.webp",
    priceRange: "$29.00 – $199.00",
  },
  {
    ...base,
    slug: "advanced-fullstack-dev-kit",
    title: "Advanced Fullstack Dev Kit",
    category: "Software",
    image: "/serviceImg.webp",
    priceRange: "$49.00 – $299.00",
  },
];