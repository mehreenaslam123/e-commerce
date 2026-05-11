import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../constants/mockData';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize with some default items
    return [
      {
        product: {
          id: '1',
          name: 'Essential Oversized Tee',
          price: 45.00,
          category: 'Apparel',
          image: '/images/product-1.jpg',
          description: 'A premium heavy-weight cotton tee with a relaxed fit.',
          sizes: ['S', 'M', 'L', 'XL'],
        },
        size: 'M',
        quantity: 1,
      },
      {
        product: {
          id: '2',
          name: 'Minimalist Tote Bag',
          price: 32.00,
          category: 'Accessories',
          image: '/images/product-2.jpg',
          description: 'Durable canvas tote for your daily essentials.',
          sizes: ['One Size'],
        },
        size: 'One Size',
        quantity: 1,
      },
    ];
  });

  const addToCart = (product: Product, size: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems(currentItems =>
      currentItems.filter(
        item => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
