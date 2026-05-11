import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../layouts/Navbar';
import { CreditCard, Truck, Shield, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const [step, setStep] = useState(1);
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  
  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Checkout Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-light mb-2">Checkout</h1>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className={`${step >= 1 ? 'text-black' : 'text-gray-400'}`}>Information</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className={`${step >= 2 ? 'text-black' : 'text-gray-400'}`}>Shipping</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className={`${step >= 3 ? 'text-black' : 'text-gray-400'}`}>Payment</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-sm shadow-sm"
              >
                <h2 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">1</span>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone (optional)" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                </div>
              </motion.section>

              {/* Shipping Address */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-sm shadow-sm"
              >
                <h2 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Address" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                  <input 
                    type="text" 
                    placeholder="Apartment, suite, etc. (optional)" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                    <input 
                      type="text" 
                      placeholder="Postal Code" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Country/Region" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                </div>
              </motion.section>

              {/* Payment */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-sm shadow-sm"
              >
                <h2 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">3</span>
                  Payment
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      placeholder="Card Number" 
                      className="w-full border border-gray-200 p-3 pl-12 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="MM / YY" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                    <input 
                      placeholder="CVC" 
                      className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                    />
                  </div>
                  <input 
                    placeholder="Name on Card" 
                    className="w-full border border-gray-200 p-3 rounded-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition" 
                  />
                </div>
              </motion.section>
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-8 rounded-sm shadow-sm sticky top-24">
                <h2 className="text-lg font-bold uppercase tracking-widest mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                        <div className="w-20 h-24 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                          <p className="text-sm font-semibold mt-1">${item.product.price.toFixed(2)}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black transition"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black transition"
                            >
                              <Plus size={12} />
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="ml-2 text-gray-400 hover:text-red-500 transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <hr className="mb-6" />
                
                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : 'text-gray-500'}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="mb-6" />
                
                <div className="flex justify-between font-bold text-lg mb-8">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition">
                  Complete Order
                </button>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                  <Truck size={20} title="Free Shipping" />
                  <Shield size={20} title="Secure Checkout" />
                  <CreditCard size={20} title="Secure Payment" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
