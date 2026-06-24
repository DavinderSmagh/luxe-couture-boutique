export const CATEGORIES = [
  {
    id: 'custom-suits',
    name: 'Custom Suits',
    description: 'Tailored to your measurements',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    featured: true,
  },
  {
    id: 'kurtas-ethnic',
    name: 'Kurtas & Ethnic',
    description: 'Handcrafted ethnic elegance',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    featured: true,
  },
  {
    id: 'ladies-wear',
    name: 'Ladies Wear',
    description: 'Contemporary & classic styles',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    featured: true,
  },
  {
    id: 'handmade-dresses',
    name: 'Handmade Dresses',
    description: 'Artisan-crafted gowns & dresses',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    featured: true,
  },
  {
    id: 'womens-essentials',
    name: "Women's Essentials",
    description: 'Everyday luxury accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    featured: true,
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

export const getCategoryLink = (name) => `/shop?category=${encodeURIComponent(name)}`;

export const ITEMS_PER_PAGE = 8;
