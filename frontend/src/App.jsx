// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Routes using Layout (with Navbar & Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Routes without Layout (like auth pages) */}
      
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}
