import { Routes, Route, Navigate } from "react-router-dom";
import CustomerDashboard from "./pages/customer/home";
import HostDashboard from "./pages/host/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import FilterSearch from "./pages/customer/filterSearch";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { Collections } from "./pages/Collections";
import { About } from "./pages/About";

function App() {
  return (
    <Routes>
      {/* E-commerce Prototype Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/about" element={<About />} />
      
      {/* Existing Routes */}
      <Route path="/customer/home" element={<CustomerDashboard />} />
      <Route path="/customer/filterSearch" element={<FilterSearch />} /> 
      <Route path="/host/dashboard" element={<HostDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
