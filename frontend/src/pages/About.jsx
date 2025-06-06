import { useState, useEffect } from "react";
import { ArrowRight, Users, Globe, Calendar, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Team members data
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      image: "/api/placeholder/200/200",
      bio: "Alex founded EventApp in 2020 with a vision to transform how people discover and attend events."
    },
    {
      name: "Jamie Chen",
      role: "CTO",
      image: "/api/placeholder/200/200",
      bio: "Jamie leads our engineering team, bringing 15 years of experience in building scalable platforms."
    },
    {
      name: "Taylor Reynolds",
      role: "Head of Marketing",
      image: "/api/placeholder/200/200",
      bio: "Taylor drives our marketing strategy, focusing on community growth and engagement."
    }
  ];

  // History timeline data
  const timeline = [
    {
      year: "2020",
      title: "EventApp Founded",
      description: "Started as a small local events platform in San Francisco."
    },
    {
      year: "2021",
      title: "National Expansion",
      description: "Expanded to cover events across all major US cities."
    },
    {
      year: "2022",
      title: "Milestone: 1M Users",
      description: "Celebrated our first million users and 50,000 events hosted."
    },
    {
      year: "2023",
      title: "International Launch",
      description: "Expanded operations to Europe and Asia."
    },
    {
      year: "2024",
      title: "Major Partnerships",
      description: "Secured partnerships with leading event venues and ticketing services."
    },
    {
      year: "2025",
      title: "Innovative Features",
      description: "Launched AI-powered event recommendations and virtual event solutions."
    }
  ];

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
    <div className="bg-white">
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
                  <Star className="h-4 w-4 mr-1.5 text-yellow-300" /> Our Story
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                About <br />
                <span className="text-yellow-300">EventApp</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                EventApp connects people through unforgettable experiences. Whether you're looking to attend a music concert, tech conference, or community workshop, we've got you covered.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div 
              className={`md:w-1/2 mt-12 md:mt-0 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
            >
              <div className="relative mx-auto max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Team collaboration" 
                    className="w-full h-auto rounded-2xl"
                  />
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

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-12 md:mb-0 reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Our mission" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl flex items-center space-x-3 animate-float">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Our mission</p>
                    <p className="font-semibold text-gray-800">Connect & Celebrate</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mt-1 mr-4">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Connection</h3>
                    <p className="text-gray-600">
                      We believe in the power of bringing people together. Our platform is designed to foster meaningful connections and create vibrant communities around shared interests.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mt-1 mr-4">
                    <Globe className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility & Inclusivity</h3>
                    <p className="text-gray-600">
                      We're committed to making events accessible to everyone. Our platform is designed with inclusivity in mind, ensuring that people from all backgrounds can discover and participate in events.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mt-1 mr-4">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Experience</h3>
                    <p className="text-gray-600">
                      We strive to make the event discovery and attendance process as smooth as possible. From finding the perfect event to getting your ticket, we're dedicated to providing a hassle-free experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The story of how EventApp evolved from a simple idea to a leading event platform
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>
            
            <div className="relative z-10">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-12 flex items-center reveal-element transform transition-all duration-700 opacity-0 ${
                    index % 2 === 0 ? "translate-x-12" : "-translate-x-12"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 order-last"}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className="z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-lg border-4 border-white">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  
                  <div className={`w-1/2 ${index % 2 === 0 ? "pl-12 order-last" : "pr-12 text-right"}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind EventApp, working to create memorable experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="reveal-element transform transition-all duration-700 opacity-0 translate-y-12"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-6 -mt-12 relative">
                    <div className="bg-red-600 text-white font-medium py-2 px-4 rounded-full inline-block mb-2">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-gray-600">
                      {member.bio}
                    </p>
                  </div>
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join us in our mission</h2>
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
                    to="/contact"
                    className="inline-flex items-center justify-center bg-red-700/50 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700/70 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="md:w-2/5 relative hidden md:block">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full bg-gradient-to-r from-red-600/50 to-transparent"></div>
                  <img 
                    src="/api/placeholder/500/600" 
                    alt="Our team" 
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