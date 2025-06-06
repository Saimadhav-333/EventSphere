// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, UserCheck, BookOpen, Star, ArrowRight, Clock, MapPin } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Featured events data
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "June 12-14, 2025",
      location: "San Francisco, CA",
      image: "/api/placeholder/600/400",
      category: "Technology",
      attendees: 1240
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "July 18-20, 2025",
      location: "Austin, TX",
      image: "/api/placeholder/600/400",
      category: "Music",
      attendees: 5800
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "August 5-7, 2025",
      location: "Chicago, IL",
      image: "/api/placeholder/600/400",
      category: "Food & Drink",
      attendees: 3200
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Organizer",
      content: "EventApp has revolutionized how I manage my events. The platform is intuitive and the customer support is exceptional!",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Attendee",
      content: "I've discovered so many amazing events through this platform. The booking process is seamless and I love the reminders feature.",
      avatar: "/api/placeholder/50/50"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate featured events
    const interval = setInterval(() => {
      setActiveEventIndex(prevIndex => 
        prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  // Stats counter animation
  const [counters, setCounters] = useState({
    events: 0,
    users: 0,
    countries: 0
  });

  const targetCounters = {
    events: 10000,
    users: 250000,
    countries: 75
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000; // 2 seconds for the animation
          const steps = 50;
          const interval = duration / steps;

          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            
            const progress = currentStep / steps;
            
            setCounters({
              events: Math.floor(progress * targetCounters.events),
              users: Math.floor(progress * targetCounters.users),
              countries: Math.floor(progress * targetCounters.countries)
            });

            if (currentStep === steps) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-16 -left-16 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div 
              className={`md:w-1/2 text-center md:text-left transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <div className="inline-block mb-3 bg-red-700/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-white/90 flex items-center">
                  <Star className="h-4 w-4 mr-1.5 text-yellow-300" /> The #1 Event Platform
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Discover & Join <br />
                <span className="text-yellow-300">Amazing Events</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Connect with your community through exciting events. Find, register, and manage all your event experiences in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center bg-red-700 bg-opacity-50 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-70 transition-all duration-300"
                >
                  Explore Events
                </Link>
              </div>
            </div>
            
            <div 
              className={`md:w-1/2 mt-12 md:mt-0 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
            >
              <div className="relative mx-auto max-w-md">
                {/* Hero image with floating elements */}
                <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Event experience" 
                    className="w-full h-auto rounded-2xl"
                  />
                  
                  {/* Floating card elements */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl flex items-center space-x-3 animate-float">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next event</p>
                      <p className="font-semibold text-gray-800">Tech Summit</p>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl animate-float-delayed">
                    <div className="flex items-center space-x-1">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                      </div>
                      <p className="text-xs font-medium text-gray-800">+258 going</p>
                    </div>
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

      {/* Search Bar Section */}
      <section className="py-8 relative z-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-4 -mt-12 border border-gray-100">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="md:w-1/4">
                <select className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Any Category</option>
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Food & Drink</option>
                  <option>Sports</option>
                </select>
              </div>
              <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
                Find Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How EventApp Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simplifying the way you discover and attend events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div 
              className="flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Browse Events</h3>
              <p className="text-gray-600">
                Explore thousands of events tailored to your interests, from tech conferences to music festivals.
              </p>
            </div>
            
            <div 
              className="flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <UserCheck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Registration</h3>
              <p className="text-gray-600">
                Sign up for events with just a few clicks. No more complicated forms or lengthy processes.
              </p>
            </div>
            
            <div 
              className="flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Manage Bookings</h3>
              <p className="text-gray-600">
                Track, edit, or cancel your event bookings anytime. All your tickets in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Don't miss out on these popular upcoming events</p>
          </div>
          
          <div className="relative">
            <div className="flex overflow-hidden">
              {featuredEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={`w-full transition-all duration-500 ease-in-out transform ${
                    index === activeEventIndex 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 absolute translate-x-full"
                  }`}
                  style={{ 
                    display: index === activeEventIndex ? 'block' : 'none'
                  }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="md:flex">
                      <div className="md:w-2/5 relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="h-full w-full object-cover" 
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {event.category}
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 md:p-8">
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-6">
                          Join {event.attendees.toLocaleString()}+ attendees for this amazing event. Network with industry professionals and enjoy a weekend of learning and fun.
                        </p>
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="flex -space-x-2 mr-2">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">+{(event.attendees - 4).toLocaleString()} attending</span>
                          </div>
                          <Link
                            to={`/events/${event.id}`}
                            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeEventIndex ? "bg-red-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center justify-center text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              View all events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{counters.events.toLocaleString()}+</div>
              <p className="text-xl text-white/80">Events Hosted</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{counters.users.toLocaleString()}+</div>
              <p className="text-xl text-white/80">Happy Users</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{counters.countries}+</div>
              <p className="text-xl text-white/80">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied users who love EventApp</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">"{testimonial.content}"</blockquote>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-3/5 p-12 md:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to discover amazing events?</h2>
                <p className="text-xl text-white/90 mb-8">
                  Create your free account today and start exploring events that match your interests.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-red-50 transition-all duration-300"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center bg-red-700/50 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700/70 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-2/5 relative hidden md:block">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full bg-gradient-to-r from-red-600/50 to-transparent"></div>
                  <img 
                    src="/api/placeholder/500/600" 
                    alt="Event experience" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add a bit of custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 4s ease-in-out 1s infinite;
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}