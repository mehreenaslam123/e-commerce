import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Navbar } from '../layouts/Navbar';
import { ProductCard } from '../components/ecommerce/ProductCard';
import { PRODUCTS } from '../constants/mockData';
import { getStylistRecommendations } from '@/api';

export const Collections = () => {
  const categories = ['All', 'Apparel', 'Accessories', 'Outerwear'];
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [aiError, setAiError] = useState('');

  const recommendedProducts = useMemo(
    () => PRODUCTS.filter((product) => recommendedIds.includes(product.id)),
    [recommendedIds]
  );

  const handleAskStylist = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setAiError('');
    setAiAnswer('');
    setRecommendedIds([]);

    try {
      const result = await getStylistRecommendations(prompt, PRODUCTS);
      setAiAnswer(result.answer);
      setRecommendedIds(result.recommendedProductIds);
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'Could not get AI recommendations right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Explore</p>
            <h1 className="text-4xl md:text-5xl font-light mb-8">Collections</h1>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-2 text-sm uppercase tracking-widest transition ${
                    index === 0 
                      ? 'bg-black text-white' 
                      : 'border border-gray-300 hover:border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-light mb-4">AI Stylist</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tell us what you are shopping for and get quick recommendations from the current catalog.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Example: I need a smart casual outfit under $200"
              className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
            />
            <button
              onClick={handleAskStylist}
              disabled={isLoading}
              className="bg-black text-white px-6 py-2 text-sm uppercase tracking-widest disabled:opacity-70"
            >
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>

          {aiAnswer && (
            <div className="mt-4 text-sm text-gray-700 leading-relaxed">{aiAnswer}</div>
          )}

          {aiError && (
            <div className="mt-4 text-sm text-red-600">{aiError}</div>
          )}

          {!!recommendedProducts.length && (
            <div className="mt-8">
              <h3 className="text-lg font-light mb-4">Recommended For You</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img 
                src="/images/featured-collection.jpg"
                alt="Featured Collection"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="py-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Featured</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6">Spring Essentials</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Discover our curated selection of timeless pieces designed for the modern wardrobe. 
                Each item is crafted with attention to detail and quality materials, ensuring 
                longevity and style that transcends seasons.
              </p>
              <button className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-zinc-800 transition">
                View Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-light">All Products</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold tracking-tighter uppercase mb-4">Brand</h4>
              <p className="text-sm text-gray-500">Timeless fashion for the modern individual.</p>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-4">Shop</h5>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/" className="hover:text-black transition">New Arrivals</a></li>
                <li><a href="/collections" className="hover:text-black transition">Collections</a></li>
                <li><a href="/" className="hover:text-black transition">Accessories</a></li>
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
