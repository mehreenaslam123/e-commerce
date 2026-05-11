import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../constants/mockData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative cursor-pointer"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button 
            className="absolute bottom-4 right-4 bg-white p-3 rounded-full opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg hover:bg-black hover:text-white"
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        <div className="mt-4 flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{product.category}</p>
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          </div>
          <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};
