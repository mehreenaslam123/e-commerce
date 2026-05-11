import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants/mockData';
import { Navbar } from '../layouts/Navbar';
import { ShoppingBag, ArrowLeft, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      alert('Please select a size');
      return;
    }
    const sizeToAdd = selectedSize || product.sizes[0];
    addToCart(product, sizeToAdd);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-6"
        >
          <ArrowLeft size={18} /> Back to Shop
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
              <img 
                src={product.image} 
                className="w-full h-full object-cover" 
                alt={product.name}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-gray-100 rounded-sm cursor-pointer hover:opacity-80 transition">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover" 
                    alt={`${product.name} view ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center max-w-md"
          >
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-light mb-6">${product.price.toFixed(2)}</p>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase mb-3">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`border px-6 py-2 text-sm transition ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'border-gray-300 hover:border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Features */}
            <div className="mb-8 space-y-2">
              <p className="text-sm text-gray-500">✓ Free shipping on orders over $100</p>
              <p className="text-sm text-gray-500">✓ 30-day return policy</p>
              <p className="text-sm text-gray-500">✓ Premium quality materials</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 ${
                  addedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                {addedToCart ? (
                  <><Check size={18} /> Added!</>
                ) : (
                  <><ShoppingBag size={18} /> Add to Bag</>
                )}
              </button>
              <button className="px-4 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition">
                <Heart size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
