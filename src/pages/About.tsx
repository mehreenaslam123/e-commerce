import { motion } from 'framer-motion';
import { Navbar } from '../layouts/Navbar';
import { ArrowRight, Heart, Truck, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-light mb-6">Crafted with Purpose</h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              We believe in the power of thoughtful design and quality craftsmanship. 
              Every piece in our collection is created with intention, designed to last, 
              and meant to be cherished for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: 'Quality First',
                description: 'We source only the finest materials and partner with skilled artisans to create products that stand the test of time.'
              },
              {
                icon: Truck,
                title: 'Sustainable Shipping',
                description: 'Our packaging is fully recyclable, and we work to minimize our carbon footprint in every delivery.'
              },
              {
                icon: Shield,
                title: 'Timeless Design',
                description: 'We create pieces that transcend trends. Our designs are meant to be worn and loved for years, not seasons.'
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-300 rounded-full">
                  <value.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium uppercase tracking-widest mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img 
                src="/images/about-story.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">The Journey</p>
              <h2 className="text-3xl font-light mb-6">From Vision to Reality</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, we started with a simple mission: to create beautiful, 
                  lasting pieces that people would love to wear every day. What began as a 
                  small studio has grown into a community of individuals who value quality 
                  over quantity.
                </p>
                <p>
                  Our design philosophy centers on minimalism and functionality. We believe 
                  that the best products are those that serve their purpose elegantly, without 
                  unnecessary complexity or ornamentation.
                </p>
                <p>
                  Today, we continue to push boundaries while staying true to our core values 
                  of sustainability, ethical production, and timeless design.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team/Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Our Process</p>
            <h2 className="text-3xl font-light">How We Create</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Design', desc: 'Sketching ideas and refining concepts' },
              { step: '02', title: 'Source', desc: 'Finding the finest sustainable materials' },
              { step: '03', title: 'Craft', desc: 'Partnering with skilled artisans' },
              { step: '04', title: 'Deliver', desc: 'Quality checked and shipped to you' },
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl font-light text-gray-300 block mb-4">{item.step}</span>
                <h4 className="text-sm font-medium uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-96 overflow-hidden rounded-sm"
          >
            <img 
              src="/images/hero.jpg"
              alt="CTA"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to Explore?</h2>
                <a 
                  href="/collections"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition duration-300"
                >
                  View Collections <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
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
