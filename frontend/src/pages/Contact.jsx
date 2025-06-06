import { useState, useEffect } from "react";
import { ArrowRight, Mail, Phone, MapPin, Send, MessageSquare,Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-red-600" />,
      title: "Email Us",
      details: "support@eventapp.com",
      action: "mailto:support@eventapp.com"
    },
    {
      icon: <Phone className="h-5 w-5 text-red-600" />,
      title: "Call Us",
      details: "(555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-5 w-5 text-red-600" />,
      title: "Visit Us",
      details: "123 Event Street, San Francisco, CA 94107",
      action: "https://maps.google.com"
    }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    // Show success message (would be implemented with state in a real app)
    alert("Message sent! We'll get back to you soon.");
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-16 -left-16 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div 
              className={`md:w-1/2 text-center md:text-left transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <div className="inline-block mb-3 bg-red-700/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-white/90 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1.5 text-yellow-300" /> Get In Touch
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Contact <br />
                <span className="text-yellow-300">EventApp</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Have questions or need assistance? We're here to help! Reach out to our friendly team for support with any event-related inquiries.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
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
                    alt="Customer support team" 
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

      {/* Contact Information */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ways to Connect</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reach out to us through any of these channels and we'll get back to you as soon as possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8"
              >
                <a 
                  href={item.action}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl p-8 text-center transition-all duration-300 transform hover:-translate-y-2 h-full"
                >
                  <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.details}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start md:space-x-12">
            <div className="md:w-1/3 mb-12 md:mb-0 reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have a question or need help with something? Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <Send className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Quick Response</h3>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Dedicated Support</h3>
                    <p className="text-sm text-gray-500">Our team is here to help you succeed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your message..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about EventApp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How do I create an event?</h3>
                <p className="text-gray-600">
                  To create an event, log into your account, click on "Create Event" in the dashboard, and follow the guided process to input event details, upload images, set ticket prices, and publish your event.
                </p>
              </div>
            </div>
            
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How do refunds work?</h3>
                <p className="text-gray-600">
                  Refund policies are set by event organizers. You can find the specific refund policy for each event on the event details page. To request a refund, contact the event organizer directly through your account dashboard.
                </p>
              </div>
            </div>
            
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Can I transfer my ticket to someone else?</h3>
                <p className="text-gray-600">
                  Yes, most tickets can be transferred. Go to "My Tickets" in your account, select the ticket you want to transfer, and click on "Transfer Ticket." Then enter the recipient's email to complete the process.
                </p>
              </div>
            </div>
            
            <div className="reveal-element transform transition-all duration-700 opacity-0 translate-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and Apple Pay. In some regions, we also support local payment methods. All transactions are secure and encrypted for your protection.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/faq"
              className="inline-flex items-center justify-center text-red-600 font-semibold hover:text-red-800 transition-colors"
            >
              View all FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-96">
        <div className="absolute inset-0 bg-gray-300">
          {/* Replace with an actual map component in a real application */}
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-lg font-medium">Interactive Map Would Be Here</span>
            <img src="/api/placeholder/1200/400" alt="Map" className="w-full h-full object-cover opacity-50" />
          </div>
        </div>
        
        <div className="absolute top-8 left-8 md:left-16 z-10">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Headquarters</h3>
            <p className="text-gray-700 mb-4">
              123 Event Street<br />
              San Francisco, CA 94107<br />
              United States
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-800"
            >
              Get Directions
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
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