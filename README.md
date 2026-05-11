# Modern E-Commerce Prototype

A sleek, minimalist e-commerce web application built with React, TypeScript, and Tailwind CSS. Features a responsive design, shopping cart functionality, and smooth animations.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.9-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-cyan)

---

## ✨ Features

- 🛍️ **Product Catalog** - Browse products with category filters
- 🛒 **Shopping Cart** - Add items, adjust quantities, remove items
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Minimalist aesthetic with smooth animations
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🖼️ **Local Images** - All assets stored locally for reliability

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

---

## 📁 Project Structure

```
src/
├── components/
│   └── ecommerce/
│       └── ProductCard.tsx    # Product display component
├── constants/
│   └── mockData.ts            # Product data
├── context/
│   └── CartContext.tsx        # Shopping cart state
├── layouts/
│   └── Navbar.tsx             # Navigation header
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── Collections.tsx        # Product catalog
│   ├── ProductDetail.tsx      # Single product view
│   ├── Checkout.tsx           # Cart & payment
│   └── About.tsx              # Brand story
└── main.tsx                   # App entry point
```

---

## 🛒 Cart Features

- Add products with size selection
- Quantity adjustment (+/-)
- Remove individual items
- Automatic price calculation
- Free shipping on orders over $100
- Tax calculation (8%)

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using React & TypeScript
