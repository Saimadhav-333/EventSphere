import { useState, useEffect } from "react";
import { ArrowRight, LogIn, Mail, Lock, User, AlertCircle, Calendar, Ticket, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../api/config.js';


export default function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(API_BASE_URL);
      
      const response = await axios.post(`${API_BASE_URL}/public/login`, form);

      const { token, role } = response.data;

      // Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Set default axios header
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      // Redirect based on role
      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "ROLE_USER") {
        // navigate("/user-dashboard");
        navigate("/dashboard");
      } else {
        setError("Unknown role! Redirecting to generic dashboard.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data || error.message || "Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      revealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-16 -left-16 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div 
              className={`md:w-1/2 text-center md:text-left transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <div className="inline-block mb-3 bg-red-700/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-white/90 flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-yellow-300" /> Account Access
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Welcome <br />
                <span className="text-yellow-300">Back</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Log in to access your EventApp account and manage your events, tickets, and preferences.
              </p>
              
              <div className="hidden md:block">
                <p className="text-white/80 mb-4">Don't have an account yet?</p>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center bg-red-700/50 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700/70 transition-all duration-300"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div 
              className={`md:w-1/2 mt-8 md:mt-0 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                <div className="px-8 pt-8 pb-2 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <LogIn className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 ml-3">Login</h2>
                  </div>
                  <p className="text-gray-600 mb-4">Enter your credentials to access your account</p>
                </div>
                
                <div className="p-8">
                  {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-900"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-700 font-medium" htmlFor="password">
                          Password
                        </label>
                        <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-800 transition-colors">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-900"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg flex items-center justify-center"
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account yet?{" "}
                      <Link to="/signup" className="font-medium text-red-600 hover:text-red-800 transition-colors">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,128C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use EventApp?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Log in to access these amazing features and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Event Management</h3>
                <p className="text-gray-600">
                  Create, edit, and manage your events with our intuitive dashboard. Track attendance, sales, and engagement.
                </p>
              </div>
            </div>
            
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Ticket className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ticket Management</h3>
                <p className="text-gray-600">
                  Access your purchased tickets, transfer them to friends, or get refunds when needed. All your tickets in one place.
                </p>
              </div>
            </div>
            
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Alerts</h3>
                <p className="text-gray-600">
                  Get notifications about events you might be interested in based on your preferences and past attendance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .revealed {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
      `}</style>
    </div>
  );
}