import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants/mockData';
import { ProductCard } from '../components/ecommerce/ProductCard';
import { Navbar } from '../layouts/Navbar';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-sm"
          >
            <img 
              src="/images/hero.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-sm uppercase tracking-[0.3em] mb-4"
                >
                  New Collection
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-light mb-6"
                >
                  Timeless Elegance
                </motion.h1>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition duration-300"
                >
                  Shop Now <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Apparel', image: '/images/category-apparel.jpg' },
              { name: 'Accessories', image: '/images/category-accessories.jpg' },
              { name: 'Outerwear', image: '/images/category-outerwear.jpg' },
            ].map((category, index) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-64 overflow-hidden cursor-pointer"
              >
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-medium uppercase tracking-widest">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Curated Selection</p>
            <h2 className="text-3xl font-light">Featured Products</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold tracking-tighter uppercase mb-4">Brand</h4>
              <p className="text-sm text-gray-500">Timeless fashion for the modern individual.</p>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-4">Shop</h5>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black transition">Clothing</a></li>
                <li><a href="#" className="hover:text-black transition">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-4">Help</h5>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition">Shipping</a></li>
                <li><a href="#" className="hover:text-black transition">Returns</a></li>
                <li><a href="#" className="hover:text-black transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-4">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                />
                <button className="text-sm uppercase tracking-widest hover:text-gray-500 transition">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            © 2026 All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
