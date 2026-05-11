export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Essential Oversized Tee',
    price: 45.00,
    category: 'Apparel',
    image: '/images/product-1.jpg',
    description: 'A premium heavy-weight cotton tee with a relaxed fit. Designed for everyday comfort with a minimalist aesthetic.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Minimalist Tote Bag',
    price: 32.00,
    category: 'Accessories',
    image: '/images/product-2.jpg',
    description: 'Durable canvas tote for your daily essentials. Features reinforced handles and a clean, timeless design.',
    sizes: ['One Size'],
  },
  {
    id: '3',
    name: 'Linen Blend Shirt',
    price: 78.00,
    category: 'Apparel',
    image: '/images/product-3.jpg',
    description: 'Breathable linen-cotton blend shirt with a relaxed silhouette. Perfect for warm weather elegance.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '4',
    name: 'Classic Wool Coat',
    price: 245.00,
    category: 'Outerwear',
    image: '/images/product-4.jpg',
    description: 'Timeless wool overcoat with a tailored fit. Crafted from premium Italian wool for lasting warmth.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '5',
    name: 'Leather Crossbody',
    price: 128.00,
    category: 'Accessories',
    image: '/images/product-5.jpg',
    description: 'Handcrafted leather crossbody bag with adjustable strap. Compact yet spacious for daily essentials.',
    sizes: ['One Size'],
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    price: 185.00,
    category: 'Apparel',
    image: '/images/product-6.jpg',
    description: 'Luxurious cashmere sweater with a classic crew neck. Unmatched softness for effortless sophistication.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '7',
    name: 'Slim Fit Trousers',
    price: 95.00,
    category: 'Apparel',
    image: '/images/product-7.jpg',
    description: 'Tailored slim-fit trousers in premium stretch cotton. Clean lines for a polished modern look.',
    sizes: ['28', '30', '32', '34', '36'],
  },
  {
    id: '8',
    name: 'Silk Scarf',
    price: 68.00,
    category: 'Accessories',
    image: '/images/product-8.jpg',
    description: 'Elegant silk scarf with hand-rolled edges. A versatile accessory that elevates any outfit.',
    sizes: ['One Size'],
  },
];
