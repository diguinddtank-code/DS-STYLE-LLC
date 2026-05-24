'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Instagram,
  Phone,
  Mail,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  CheckCircle,
  Menu,
  X,
  Calendar,
  ShieldAlert,
  Wrench,
  Home as HomeIcon,
  Award,
  Sparkles,
  Clock,
  Send,
  Shield,
  MessageSquare,
  Sparkle,
  Calculator,
  ChevronRight,
  UserCheck
} from 'lucide-react';

// Structuring mock portfolio items
interface PortfolioItem {
  id: number;
  title: string;
  category: 'painting' | 'drywall' | 'renovation';
  image: string;
  location: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Windermere Manor Interior Painting',
    category: 'painting',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    location: 'Windermere, FL',
    description: 'Full interior premium multi-coat satin coating, including custom moldings and trim detailing.',
  },
  {
    id: 2,
    title: 'Ceiling Texturing & Level-5 Plastering',
    category: 'drywall',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    location: 'Celebration, FL',
    description: 'Immaculate restoration of ceiling water damage with invisible knockdown spray matching.',
  },
  {
    id: 3,
    title: 'Luxury Kitchen Cabinetry',
    category: 'renovation',
    image: 'https://img.edilportale.com/product-thumbs/b_siematic-pure-se-s2-siematic-298724-rel3c41db23.jpg',
    location: 'Orlando Metro, FL',
    description: 'High-end factory finish polyurethane coating on custom wooden cabinets with hardware upgrades.',
  },
  {
    id: 4,
    title: 'Modern Exterior Home Protection',
    category: 'painting',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    location: 'Celebration, FL',
    description: 'Waterproofing elastomeric painting protecting the estate from Central Florida humidity.',
  },
  {
    id: 5,
    title: 'Walk-In Master Spa Bath',
    category: 'renovation',
    image: 'https://www.beaumont-tiles.com.au/media/wysiwyg/Modern_Bathroom_Ideas_We_Know_Will_Inspire_You_To_Create_LARGE.jpg',
    location: 'Davenport, FL',
    description: 'Immersive floor-to-ceiling wooden organizers, premium vinyl flooring and gold accents.',
  },
  {
    id: 6,
    title: 'Premium Level-5 Skimming',
    category: 'drywall',
    image: 'https://thehouseofsilverlining.com/wp-content/uploads/2017/11/the-forest-modern-fireplace.jpg',
    location: 'Kissimmee, FL',
    description: 'Full structural drywall hanging, seamless taping, and corner bead framing for new estate construction.',
  }
];

// Structural testimonials
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  text: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    initials: 'SM',
    text: 'DS Style completely transformed our living space. They patched multiple drywalls and painted our interior perfectly. They showed up early, worked with extreme focus, and left the home incredibly clean.',
    location: 'Celebration, FL',
    rating: 5,
  },
  {
    id: 2,
    name: 'John Davis',
    initials: 'JD',
    text: 'Finding competent drywall experts in Kissimmee is painful. DS STYLE repaired severe water damage on our high ceiling. I can honestly say the texture matching is invisible.',
    location: 'Kissimmee, FL',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amanda Rodriguez',
    initials: 'AR',
    text: 'We hired DS STYLE LLC for a complete kitchen remodel. From initial plans to the final cabinet painting, they were consummate professionals. If you want premier quality, hire them!',
    location: 'Windermere, FL',
    rating: 5,
  },
  {
    id: 4,
    name: 'Thomas Harris',
    initials: 'TH',
    text: 'They repainted our master bedroom and baseboards with Benjamin Moore paints. Flawless cuts, no spills, extremely professional and respectful crew.',
    location: 'Orlando, FL',
    rating: 5,
  }
];

// Premium Framer Motion animation variants for scrolls and lists
const fadeInScaleVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 90, damping: 18 } 
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 85, damping: 18 } 
  }
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring' as const, stiffness: 90, damping: 20 } 
  }
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring' as const, stiffness: 90, damping: 20 } 
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export default function Home() {
  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gallery filter state
  const [activeTab, setActiveTab] = useState<'all' | 'painting' | 'drywall' | 'renovation'>('all');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'painting',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll handler for navigation height/blur adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form input modifier
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handler with premium UX latency simulator
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating extremely fast cloud routing to Florida dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1300);
  };

  const resetFormState = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'painting',
      details: ''
    });
  };

  // Portfolio filtering logic
  const filteredPortfolio = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <div className="bg-brand-bg text-brand-charcoal font-sans overflow-x-hidden antialiased">
      
      {/* Google Review Custom Floating Badge */}
      <div id="floating-badge-main" className="fixed bottom-6 right-6 z-50 pointer-events-auto hidden sm:block">
        <a 
          href="#reviews" 
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-brand-border shadow-lg shadow-brand-charcoal/5 hover:border-brand-gold transition-all duration-300"
        >
          {/* Authentic Google styled element */}
          <div className="flex h-5 w-5 items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <div className="text-left leading-none">
            <span className="text-[9px] text-brand-muted font-bold block uppercase tracking-wider">Review us on</span>
            <span className="text-xs font-black text-brand-charcoal">Google <span className="text-brand-gold">4.9 ★★★★★</span></span>
          </div>
        </a>
      </div>

      {/* Premium Navigation Header with Glassmorphism */}
      <header 
        id="luxury-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
          isScrolled 
            ? 'bg-brand-bg/95 py-3 shadow-md border-brand-border' 
            : 'bg-brand-bg/90 py-5 lg:py-6 border-brand-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo element directly applied without any raw backgrounds */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative p-1 bg-transparent rounded-xl transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="https://i.imgur.com/39x856J.png" 
                alt="DS STYLE LLC Logo" 
                width={56} 
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-widest text-brand-charcoal group-hover:text-brand-gold transition-colors">DS STYLE</span>
              <span className="text-[9px] text-brand-muted tracking-widest font-semibold block uppercase">PREMIUM RENOVATIONS</span>
            </div>
          </a>

          {/* Minimalist Desk Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold text-brand-charcoal/80">
            <a href="#services" className="hover:text-brand-gold transition-colors duration-200">Services</a>
            <a href="#finishes" className="hover:text-brand-gold transition-colors duration-200">Premium Finishes</a>
            <a href="#standards" className="hover:text-brand-gold transition-colors duration-200">Quality Standards</a>
            <a href="#difference" className="hover:text-brand-gold transition-colors duration-200">The Difference</a>
            <a href="#portfolio" className="hover:text-brand-gold transition-colors duration-200">Our Work</a>
            <a href="#reviews" className="hover:text-brand-gold transition-colors duration-200">Reviews</a>
          </nav>

          {/* Luxury Action Bar */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-card border border-brand-border hover:border-brand-gold hover:text-brand-gold transition-all duration-300 text-brand-charcoal shadow-sm"
              title="Siga nosso Instagram"
            >
              <Instagram className="w-4 h-4 text-brand-gold" />
            </a>
            <a href="tel:+13213937331" className="flex flex-col text-right">
              <span className="text-[9px] uppercase text-brand-muted font-bold tracking-wider">Call Anytime</span>
              <span className="text-sm font-black text-brand-charcoal hover:text-brand-gold transition-colors tracking-wide">(321) 393-7331</span>
            </a>
            <a 
              href="#contact" 
              className="bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white font-extrabold text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-sm transition-all duration-300 btn-shine"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile Drawer Menu Action */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-brand-charcoal hover:text-brand-gold transition-colors duration-200 focus:outline-none"
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Dynamic Mobile Drawer Open Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-menu-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-bg border-b border-brand-border"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <a 
                  href="#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  Services
                </a>
                <a 
                  href="#finishes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  Premium Finishes
                </a>
                <a 
                  href="#standards" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  Quality Standards
                </a>
                <a 
                  href="#difference" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  The Difference
                </a>
                <a 
                  href="#portfolio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  Our Work
                </a>
                <a 
                  href="#reviews" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold text-brand-charcoal hover:bg-brand-white-accent hover:text-brand-gold ml-0"
                >
                  Reviews
                </a>
                <div className="pt-4 border-t border-brand-border space-y-3">
                  <a 
                    href="https://instagram.com/ds.style.llc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-3 py-1.5 text-brand-charcoal hover:text-brand-gold text-xs font-bold ml-0"
                  >
                    <Instagram className="w-4 h-4 text-brand-gold" />
                    <span>@ds.style.llc</span>
                  </a>
                  <a 
                    href="tel:+13213937331" 
                    className="flex items-center gap-3 px-3 py-1.5 text-brand-charcoal hover:text-brand-gold text-xs font-bold ml-0"
                  >
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span>(321) 393-7331</span>
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center w-full bg-brand-charcoal text-white font-bold py-3.5 rounded-xl uppercase text-[10px] tracking-wider ml-0"
                  >
                    Get Free Estimate
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Section with Immersive Editorial Formatting */}
      <section id="hero" className="relative min-h-screen pt-28 sm:pt-36 flex items-center justify-center overflow-hidden bg-brand-bg">
        
        {/* Background Image structure */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior Residencial de Luxo Pintado" 
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Sofisticated gradient overlay block from Alabaster Crème background adjusted for supreme mobile visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-brand-bg/35 to-brand-bg md:bg-gradient-to-r md:from-brand-bg md:via-brand-bg/90 md:to-transparent"></div>
          {/* Transparent modern unified contrast tint for mobile readability */}
          <div className="absolute inset-0 bg-brand-bg/15 md:hidden"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Sales Copy Block (Left) - Uses Plus Jakarta paired with Cormorant Garamond */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              {/* Local Area Pin Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-card/90 backdrop-blur-sm border border-brand-border shadow-sm justify-center lg:justify-start mx-auto lg:mx-0">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-brand-charcoal/80">
                  KISSIMMEE &amp; CENTRAL FLORIDA&apos;S PREMIER STANDARD
                </span>
              </div>

              {/* Main Heading with Elegant Custom Font styles */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-brand-charcoal">
                Elite Painting &amp; <br />
                <span className="font-serif italic font-medium text-brand-gold tracking-normal normal-case block my-1 sm:my-2">
                  Flawless Drywall
                </span>
                Remodeling Craft.
              </h1>

              {/* Description copy using consumer psych */}
              <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                DS STYLE LLC designs and refines spaces with the absolute highest tier of residential coatings, clean dust-free drywall matching, and luxury home renovations. For those who demand structural aesthetic perfection.
              </p>

              {/* Grid indicators for trust signals turned into premium pill badges */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left text-[10px] text-brand-charcoal font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-border/60 hover:border-brand-gold hover:bg-white/90 shadow-sm transition-all duration-300">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span className="truncate">Licensed &amp; Insured</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-border/60 hover:border-brand-gold hover:bg-white/90 shadow-sm transition-all duration-300">
                  <Award className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span className="truncate">A+ Certified Quality</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-border/60 hover:border-brand-gold hover:bg-white/90 shadow-sm transition-all duration-300">
                  <Sparkles className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span className="truncate">Dust-Free Protection</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-border/60 hover:border-brand-gold hover:bg-white/90 shadow-sm transition-all duration-300">
                  <Clock className="w-4.5 h-4.5 text-brand-gold flex-shrink-0" />
                  <span className="truncate">Premium Handover</span>
                </div>
              </div>

              {/* Action conversions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto px-8 py-4.5 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white font-black rounded-xl shadow-md text-center transition-all duration-300 transform hover:-translate-y-1 btn-shine flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Valuation</span>
                </a>
                <a 
                  href="#portfolio" 
                  className="w-full sm:w-auto px-8 py-4.5 bg-brand-card/80 backdrop-blur-sm hover:bg-brand-white-accent border border-brand-border text-brand-charcoal font-bold rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest"
                >
                  <span>Browse Portfolio</span>
                  <ChevronRight className="w-4 h-4 text-brand-gold" />
                </a>
              </div>
            </motion.div>

            {/* Immersive Floating Showcase Panel Card (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative mt-6 lg:mt-0"
            >
              <div className="relative mx-auto max-w-[380px] lg:max-w-none">
                
                {/* Floating Card containing physical completed project preview */}
                <div className="relative bg-brand-card/95 backdrop-blur-sm border border-brand-border rounded-2xl p-5 shadow-xl text-brand-charcoal space-y-5">
                  <div className="flex items-center justify-between border-b border-brand-border pb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Certified custom business logo mark */}
                      <div className="w-12 h-12 rounded-xl bg-brand-white-accent flex items-center justify-center border border-brand-border p-1.5 shadow-inner">
                        <Image 
                          src="https://i.imgur.com/39x856J.png" 
                          alt="DS Signature Logo" 
                          width={40} 
                          height={40}
                          className="object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-charcoal text-[11px] uppercase tracking-wider">DS Premium Standards</h3>
                        <p className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Orlando &amp; Central Florida</p>
                      </div>
                    </div>
                    <span className="bg-brand-white-accent text-brand-gold text-[9px] font-black px-3 py-1 rounded-full border border-brand-border uppercase tracking-widest">A+ RATED</span>
                  </div>

                  {/* Featured Residence image */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] group shadow-inner border border-brand-border">
                    <Image 
                      src="https://images.squarespace-cdn.com/content/v1/681e404e951ede55bb9c134b/bbda5b26-4d61-4cc8-943a-dba98f5c7667/andre-francois-mckenzie-XlGwDBZh_mM-unsplash.jpg" 
                      alt="Beautiful Finished Central Florida Painting Work" 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-transparent flex flex-col justify-end p-5">
                      <span className="text-[9px] text-brand-gold-light uppercase tracking-widest font-black mb-1">Featured Residence • Windermere</span>
                      <h4 className="text-white font-extrabold text-sm leading-snug">Full Interior Coating &amp; Modern Level-5 Drywall Smooth Finish</h4>
                    </div>
                  </div>

                  {/* Trust Signals and Ratings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-white-accent/80 border border-brand-border rounded-xl p-3 text-center">
                      <div className="flex justify-center gap-0.5 text-brand-gold mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-[8px] uppercase text-brand-muted font-bold tracking-wider">Client Reviews</p>
                      <p className="text-sm font-black text-brand-charcoal">4.9 / 5.0 Rating</p>
                    </div>
                    <div className="bg-brand-white-accent/80 border border-brand-border rounded-xl p-3 text-center">
                      <div className="flex justify-center text-brand-gold mb-1">
                        <Shield className="w-4 h-4 text-brand-gold" />
                      </div>
                      <p className="text-[8px] uppercase text-brand-muted font-bold tracking-wider">Protection</p>
                      <p className="text-sm font-black text-brand-charcoal">Fully Insured</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Banner Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainerVariants}
        className="border-y border-brand-border bg-brand-card relative z-20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border">
            <motion.div variants={fadeInUpVariants} className="pt-2 md:pt-0">
              <span className="block text-3xl font-black text-brand-gold tracking-tight">100%</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-muted font-extrabold block mt-0.5">Satisfaction Guaranteed</span>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="pt-4 md:pt-0">
              <span className="block text-3xl font-black text-brand-gold tracking-tight">15+ Yrs</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-muted font-extrabold block mt-0.5">Expert Experience</span>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="pt-4 md:pt-0">
              <span className="block text-3xl font-black text-brand-gold tracking-tight">850+</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-muted font-extrabold block mt-0.5">Projects Completed</span>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="pt-4 md:pt-0">
              <span className="block text-3xl font-black text-brand-gold tracking-tight">Licensed</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-muted font-extrabold block mt-0.5">Central Florida Crew</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bespoke Material Standards Section */}
      <section id="finishes" className="py-24 relative bg-brand-white-accent overflow-hidden border-b border-brand-border">
        <div id="material-standards-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Premium Materials &amp; Standards</span>
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight mb-4">
              Bespoke Coating Systems &amp; Technical Integrity
            </p>
            <p className="text-brand-muted text-sm leading-relaxed font-medium">
              We never cut corners. Our pristine finishes rely on world-class industrial tools, dust-free prep setups, and high-performance commercial-grade paint formulations designed to resist the extreme Florida humidity.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            
            {/* Card 1 */}
            <motion.div 
              id="finishes-card-1" 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:border-brand-gold/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src="https://thehouseofsilverlining.com/wp-content/uploads/2017/11/the-forest-modern-fireplace.jpg" 
                    alt="Premium Level-5 Skimming Standard" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-sm text-xs text-brand-gold font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-brand-gold/30">
                    Satin Level-5 Smooth
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-brand-charcoal">Complete Plaster Level-5 Smoothness</h4>
                  <p className="text-brand-muted text-xs leading-relaxed font-medium">
                    Our master artisans perform multi-phase joint compound skimming, completely neutralizing drywall shadows, uneven valleys, and micro-textures. Designed to appear flawlessly smooth and uniform under direct afternoon Florida sunlight.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-brand-gold tracking-wider">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Ultra-uniform surface reflectivity</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              id="finishes-card-2" 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:border-brand-gold/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600" 
                    alt="Active HEPA-Vacuum Dust Extraction Setup" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-sm text-xs text-brand-gold font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-brand-gold/30">
                    99.7% HEPA Clean
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-brand-charcoal">Advanced Dustless Prep Protection</h4>
                  <p className="text-brand-muted text-xs leading-relaxed font-medium">
                    We maintain absolute health and cleanliness standards. Using heavy-duty power sanders coupled with direct high-flow HEPA vacuum extraction systems, we capture fine gypsum and polymer dust at the moment of abrasion, keeping your home clean.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-brand-gold tracking-wider">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Safeguarding indoor wellness</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              id="finishes-card-3" 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:border-brand-gold/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600" 
                    alt="Premium Architectural Paint Selection" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-sm text-xs text-brand-gold font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-brand-gold/30">
                    Industrial Coatings
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-brand-charcoal">Sherwin-Williams® &amp; Benjamin Moore®</h4>
                  <p className="text-brand-muted text-xs leading-relaxed font-medium">
                    Only authentic ultra-premium coatings are utilized. Standard options include Benjamin Moore Aura® and Sherwin-Williams Emerald® urethane polymers, yielding supreme washability, moisture shielding, and mold defense in the Orlando metro climate.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-brand-gold tracking-wider">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Zero-yellowing pigment fidelity</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          <div className="mt-12 bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">COMMITTED TO UNCOMPROMISING FINISHES</h5>
              <p className="text-sm font-bold text-brand-charcoal">Want to consult color palettes or special cabinetry glazes?</p>
              <p className="text-brand-muted text-xs font-medium">Our master artisans will walk you through paint finishes, elastomeric values, and custom molding layouts.</p>
            </div>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 btn-shine flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Schedule Custom Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Services Presentation Section */}
      <section id="services" className="py-24 relative bg-brand-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2">Our Offerings</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight mb-4">
              Expert Craftsmanship, Impeccable Finishes
            </p>
            <p className="text-brand-muted text-sm leading-relaxed font-medium">
              We use professional-grade paint, advanced drywall sanders, and precise carpentry systems to preserve and enhance your Florida home value.
            </p>
          </motion.div>

          {/* Grid Layout of Services */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            
            {/* Service 1: Painting */}
            <motion.div 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl p-8 border border-brand-border hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal mb-3">Residential &amp; Commercial Painting</h3>
                <p className="text-brand-muted text-xs leading-relaxed mb-6 font-medium">
                  Precision interior and exterior paint coats engineered to resist the extreme Florida humidity and UV rays. Tailored cabinet finishes, moldings, and refined baseboards.
                </p>
              </div>
              <ul className="space-y-2 text-[9px] text-brand-charcoal font-bold uppercase tracking-wider border-t border-brand-border pt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Premium Low-VOC Coating</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Flawless Multi-Coat Protection</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2: Drywall */}
            <motion.div 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl p-8 border border-brand-border hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Wrench className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal mb-3">Drywall Repair &amp; Texture Match</h3>
                <p className="text-brand-muted text-xs leading-relaxed mb-6 font-medium">
                  Say goodbye to unsightly settlement cracks, ceiling holes, or moisture damage. We deliver master-class mudding, smooth skim coatings, and specialized spray texture matching.
                </p>
              </div>
              <ul className="space-y-2 text-[9px] text-brand-charcoal font-bold uppercase tracking-wider border-t border-brand-border pt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Invisible Texture Blending</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Moisture-Resistant Drywall</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3: Renovations */}
            <motion.div 
              variants={fadeInScaleVariants}
              className="bg-brand-card rounded-2xl p-8 border border-brand-border hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <HomeIcon className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal mb-3">Complete Renovations</h3>
                <p className="text-brand-muted text-xs leading-relaxed mb-6 font-medium">
                  Elevating properties with structural beauty. Specialists in luxury bathroom upgrades, premium vinyl tile floor installation, complete custom closets, and kitchen transformations.
                </p>
              </div>
              <ul className="space-y-2 text-[9px] text-brand-charcoal font-bold uppercase tracking-wider border-t border-brand-border pt-5">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Modern Interior Refits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-gold" /> 
                  <span>Custom Trim &amp; Finish Fittings</span>
                </li>
              </ul>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Advanced Quality Standards Section */}
      <section id="standards" className="py-24 bg-brand-white-accent relative overflow-hidden border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Material Showcase (Left) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInLeftVariants}
              className="lg:col-span-6"
            >
              <div className="relative bg-brand-card border border-brand-border rounded-2xl p-3.5 shadow-md">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-inner font-serif">
                  <Image 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800" 
                    alt="Premium Painting Materials" 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-brand-charcoal/5"></div>
                  
                  {/* Brand verification overlay badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-brand-border px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2.5">
                    <Image 
                      src="https://i.imgur.com/39x856J.png" 
                      alt="DS Logo Small" 
                      width={28} 
                      height={28}
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[8px] uppercase text-brand-gold font-extrabold tracking-widest block mb-0.5">Approved Partnerships</span>
                      <span className="text-[10px] font-black text-brand-charcoal tracking-wide">Sherwin-Williams® &amp; Benjamin Moore®</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Detail Descriptions (Right) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainerVariants}
              className="lg:col-span-6 space-y-8"
            >
              <div className="space-y-3">
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold flex items-center gap-2.5">
                  <Image 
                    src="https://i.imgur.com/39x856J.png" 
                    alt="DS Seal" 
                    width={20} 
                    height={20}
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span>DS Standards</span>
                </h2>
                <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight animate-pulse-slow">
                  The Standards Behind Elite Work
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed font-medium">
                  Unlike average residential contractors who rush and cut corners, we operate with a rigorous, architectural-grade checklist on every home in Central Florida.
                </p>
              </div>

              {/* Technical List of Standards */}
              <div className="space-y-6">
                
                {/* Standard 1 */}
                <motion.div variants={fadeInUpVariants} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-gold flex-shrink-0 shadow-sm p-1.5">
                    <Image 
                      src="https://i.imgur.com/39x856J.png" 
                      alt="DS Icon" 
                      width={30} 
                      height={30}
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal uppercase tracking-wider mb-1">Elite Protective Sealing</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-medium">
                      We apply mold-resistant primer sealants in high-moisture Florida environments. We make sure moisture, damp patches, and settlement lines never bleed through.
                    </p>
                  </div>
                </motion.div>

                {/* Standard 2 */}
                <motion.div variants={fadeInUpVariants} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-gold flex-shrink-0 shadow-sm p-1.5">
                    <Image 
                      src="https://i.imgur.com/39x856J.png" 
                      alt="DS Icon" 
                      width={30} 
                      height={30}
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal uppercase tracking-wider mb-1">True Dustless Preparation</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                      Your interior air quality matters. We utilize professional vacuum-assisted drywall sanders that capture 99.7% of toxic dust particles before they settle.
                    </p>
                  </div>
                </motion.div>

                {/* Standard 3 */}
                <motion.div variants={fadeInUpVariants} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center text-brand-gold flex-shrink-0 shadow-sm p-1.5">
                    <Image 
                      src="https://i.imgur.com/39x856J.png" 
                      alt="DS Icon" 
                      width={30} 
                      height={30}
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal uppercase tracking-wider mb-1">Zero-Defect Finishing</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                      Our paint applications undergo high-intensity angled LED light checks, ensuring absolutely zero roller marks, run-off drops, or texture discrepancies.
                    </p>
                  </div>
                </motion.div>

              </div>

              <motion.div variants={fadeInUpVariants} className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal font-black rounded-xl text-xs uppercase tracking-widest transition-all btn-shine shadow-sm"
                >
                  <span>Request On-Site Estimate</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Comparison: The Luxury Difference */}
      <section id="difference" className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUpVariants}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="https://i.imgur.com/39x856J.png" 
                alt="DS Emblem" 
                width={40} 
                height={40}
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2">The DS Style Standard</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight mb-4">
              Why Discerning Homeowners <br />
              <span className="font-serif italic font-medium text-brand-gold tracking-normal normal-case">Choose Us Over Typical Contractors</span>
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed font-medium max-w-2xl mx-auto">
              We do not believe in average. From paint density to immaculate clean-ups, discover how our white-glove approach transforms your renovation experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* White-Glove Comparison List (Left) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInLeftVariants}
              className="lg:col-span-6 space-y-6"
            >
              <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-brand-charcoal uppercase border-b border-brand-border pb-3">The White-Glove Comparison</h4>
              
              <div className="space-y-4">
                
                {/* Differential 1 */}
                <div className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-brand-gold font-extrabold block mb-2">01 / DUST PREVENTION</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-brand-border pr-2">
                      <span className="text-[9px] font-black text-brand-muted uppercase tracking-wider block mb-1">Ordinary Painters</span>
                      <p className="text-[11px] text-brand-muted font-medium">Fine dust settles on your furniture, carpets, and air vents for weeks.</p>
                    </div>
                    <div className="pl-2">
                      <span className="text-[9px] font-black text-[#10B981] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Check className="w-3.5 h-3.5" /> DS STYLE STANDARD
                      </span>
                      <p className="text-[11px] text-brand-charcoal font-semibold">Active HEPA-filtered vacuum sanders capture 99.7% of dust at the source.</p>
                    </div>
                  </div>
                </div>

                {/* Differential 2 */}
                <div className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-brand-gold font-extrabold block mb-2">02 / PREP &amp; SURFACE INTEGRITY</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-brand-border pr-2">
                      <span className="text-[9px] font-black text-brand-muted uppercase tracking-wider block mb-1">Ordinary Painters</span>
                      <p className="text-[11px] text-brand-muted font-medium">Paint applied directly over hairline cracks and unsealed patches.</p>
                    </div>
                    <div className="pl-2">
                      <span className="text-[9px] font-black text-[#10B981] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Check className="w-3.5 h-3.5" /> DS STYLE STANDARD
                      </span>
                      <p className="text-[11px] text-brand-charcoal font-semibold">Meticulous Level-5 skimming and moisture-blocking priming on every seam.</p>
                    </div>
                  </div>
                </div>

                {/* Differential 3 */}
                <div className="bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-brand-gold font-extrabold block mb-2">03 / PRODUCT LIFESPAN</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-brand-border pr-2">
                      <span className="text-[9px] font-black text-brand-muted uppercase tracking-wider block mb-1">Ordinary Painters</span>
                      <p className="text-[11px] text-brand-muted font-medium">Water-thinned, cheap retail paints that fade and scratch easily.</p>
                    </div>
                    <div className="pl-2">
                      <span className="text-[9px] font-black text-[#10B981] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Check className="w-3.5 h-3.5" /> DS STYLE STANDARD
                      </span>
                      <p className="text-[11px] text-brand-charcoal font-semibold">Urethane-modified luxury coatings with high-durability color formulas.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Gallery micro details (Right) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInRightVariants}
              className="lg:col-span-6 space-y-6"
            >
              <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-brand-charcoal uppercase border-b border-brand-border pb-3">Micro-Details of Perfection</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Detail card 1 */}
                <div className="bg-brand-card border border-brand-border rounded-xl p-3 shadow-sm hover:border-brand-gold transition-all">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 relative">
                    <Image 
                      src="https://blog.kitchenmagic.com/hs-fs/hubfs/blog-files/glaze-blog-warm.jpg?width=600&name=glaze-blog-warm.jpg" 
                      alt="Satin Cabinet Coating Detail" 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-xs font-bold text-brand-charcoal mb-1">Cabinet Glaze</h5>
                  <p className="text-[10px] text-brand-muted font-medium leading-normal">Smooth, satin kitchen door factory-like finish without run lines.</p>
                </div>

                {/* Detail card 2 */}
                <div className="bg-brand-card border border-brand-border rounded-xl p-3 shadow-sm hover:border-brand-gold transition-all">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 relative font-serif">
                    <Image 
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300" 
                      alt="Perfect Straight Paint Line Trim Detail" 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-xs font-bold text-brand-charcoal mb-1">Straight Trim Cuts</h5>
                  <p className="text-[10px] text-brand-muted font-medium leading-normal">Laser-sharp paint line meetings between wall, baseboard, and ceiling.</p>
                </div>

                {/* Detail card 3 */}
                <div className="bg-brand-card border border-brand-border rounded-xl p-3 shadow-sm hover:border-brand-gold transition-all">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 relative font-serif">
                    <Image 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=300" 
                      alt="Flawless Smooth Walls" 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-xs font-bold text-brand-charcoal mb-1">Smooth Skimming</h5>
                  <p className="text-[10px] text-brand-muted font-medium leading-normal">Level-5 drywall plaster matching under direct Florida natural sunlight.</p>
                </div>

              </div>

              {/* Meticulous Guarantee Shield Card */}
              <div className="bg-brand-white-accent p-4 rounded-xl border border-brand-border flex items-center gap-3">
                <Image 
                  src="https://i.imgur.com/39x856J.png" 
                  alt="DS Guarantee" 
                  width={40} 
                  height={40}
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-[10px] font-black uppercase text-brand-charcoal tracking-wide">Our Meticulous Handover Guarantee</span>
                  <p className="text-[11px] text-brand-muted font-semibold mt-0.5">If you find even a micro-discrepancy upon final inspections, our crew remains on site until it is absolute perfection.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dynamic Filterable Portfolio Grid */}
      <section id="portfolio" className="py-24 bg-brand-bg relative border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with Tabs */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUpVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2">Our Work</h2>
              <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">
                Witness the Flawless Execution
              </h3>
            </div>
            
            {/* Elegant Filter Controllers */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-bold text-[9px] uppercase tracking-widest">
              <button 
                onClick={() => setActiveTab('all')} 
                className={`px-5 py-3 rounded-lg font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === 'all' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-brand-card text-brand-charcoal hover:bg-brand-white-accent border border-brand-border'
                }`}
              >
                All Work
              </button>
              <button 
                onClick={() => setActiveTab('painting')} 
                className={`px-5 py-3 rounded-lg font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === 'painting' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-brand-card text-brand-charcoal hover:bg-brand-white-accent border border-brand-border'
                }`}
              >
                Painting
              </button>
              <button 
                onClick={() => setActiveTab('drywall')} 
                className={`px-5 py-3 rounded-lg font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === 'drywall' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-brand-card text-brand-charcoal hover:bg-brand-white-accent border border-brand-border'
                }`}
              >
                Drywall
              </button>
              <button 
                onClick={() => setActiveTab('renovation')} 
                className={`px-5 py-3 rounded-lg font-extrabold transition-all duration-300 cursor-pointer ${
                  activeTab === 'renovation' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-brand-card text-brand-charcoal hover:bg-brand-white-accent border border-brand-border'
                }`}
              >
                Renovations
              </button>
            </div>
          </motion.div>

          {/* Grid Layout of Pictures */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border group shadow-sm hover:shadow-md transition-all duration-500"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-[9px] text-brand-gold uppercase tracking-widest font-black mb-1">
                        {item.category === 'painting' ? 'Exterior/Interior Coating' : item.category === 'drywall' ? 'Drywall Match' : 'Remodeling'}
                      </span>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-white/80 font-medium">{item.description}</p>
                      <span className="text-[9px] text-brand-gold-light tracking-wide uppercase font-bold mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 4-Step Seamless Blueprint Methodology */}
      <section className="py-24 bg-brand-white-accent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUpVariants}
            className="text-center max-w-2xl mx-auto mb-20 animate-pulse-slow"
          >
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2">Our Method</h2>
            <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight mb-4">
              The 4-Step Seamless Blueprint
            </h3>
            <p className="text-brand-muted text-sm font-medium">
              We eliminate contractor headaches with standard schedules, absolute site cleaning, and extreme precision.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            
            {/* Step 1 */}
            <motion.div variants={fadeInScaleVariants} className="bg-brand-card border border-brand-border rounded-2xl p-6 relative shadow-sm">
              <span className="absolute top-4 right-4 text-3xl font-black text-brand-white-accent select-none font-serif">01</span>
              <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-brand-gold" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-2 uppercase tracking-wider">In-Home Consultation</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                We inspect texture patterns, structural concerns, lighting, and compile a flat-rate written bid on site.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeInScaleVariants} className="bg-brand-card border border-brand-border rounded-2xl p-6 relative shadow-sm">
              <span className="absolute top-4 right-4 text-3xl font-black text-brand-white-accent select-none font-serif">02</span>
              <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6 text-brand-gold" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-2 uppercase tracking-wider">Dust-Free Masking</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                Heavy-duty floor canvas drops, plastic wall guards, and vacuum sanders keep your home completely spotless.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeInScaleVariants} className="bg-brand-card border border-brand-border rounded-2xl p-6 relative shadow-sm">
              <span className="absolute top-4 right-4 text-3xl font-black text-brand-white-accent select-none font-serif">03</span>
              <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-brand-gold" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-2 uppercase tracking-wider">Elite Application</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                Elite drywall texture blends and premium multi-coat paint sprays. Inspected thoroughly under bright LEDs.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div variants={fadeInScaleVariants} className="bg-brand-card border border-brand-border rounded-2xl p-6 relative shadow-sm">
              <span className="absolute top-4 right-4 text-3xl font-black text-brand-white-accent select-none font-serif">04</span>
              <div className="w-12 h-12 rounded-xl bg-brand-white-accent border border-brand-border flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-brand-gold" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-2 uppercase tracking-wider">Clean Handover</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                Full site cleaning. We perform a physical walk-through with you to guarantee your absolute satisfaction.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Reviews Marquee Looping Slider Carousel & Verified Badge Section */}
      <section id="reviews" className="py-24 bg-brand-bg relative overflow-hidden border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2 flex items-center gap-1.5 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> 
                <span>Client Happiness</span>
              </h2>
              <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">
                What Our Clients Say
              </h3>
            </div>
            
            {/* Google Glassmorphic badge */}
            <div className="flex items-center gap-3.5 px-5 py-3 rounded-full bg-white/75 backdrop-blur-md border border-brand-border shadow-sm mx-auto md:mx-0">
              <div className="flex h-6 w-6 items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="text-left leading-none font-sans">
                <div className="flex gap-0.5 text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-black text-brand-charcoal mt-1 block">4.9 ★ <span className="text-brand-muted font-medium text-[10px] lowercase">on google reviews</span></span>
              </div>
            </div>
            
          </div>
        </div>

        {/* CSS Marquee Track Container */}
        <div className="marquee-container select-none">
          
          {/* Track 1 */}
          <div className="marquee-track space-x-6 pr-6">
            {testimonials.map((test) => (
              <div 
                key={test.id}
                className="w-[300px] sm:w-[420px] bg-brand-card border border-brand-border p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6"
              >
                <p className="text-xs sm:text-sm text-brand-charcoal italic leading-relaxed font-medium">
                  &quot;{test.text}&quot;
                </p>
                <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-brand-white-accent flex items-center justify-center text-brand-gold font-extrabold border border-brand-border text-xs select-none">
                    {test.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black text-brand-charcoal leading-none">{test.name}</h4>
                    <span className="text-[9px] text-brand-muted font-bold uppercase tracking-wider block mt-1">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicated Track 2 to complete Infinite Animation */}
          <div className="marquee-track space-x-6 pr-6">
            {testimonials.map((test) => (
              <div 
                key={`dup-${test.id}`}
                className="w-[300px] sm:w-[420px] bg-brand-card border border-brand-border p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6"
              >
                <p className="text-xs sm:text-sm text-brand-charcoal italic leading-relaxed font-medium">
                  &quot;{test.text}&quot;
                </p>
                <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-brand-white-accent flex items-center justify-center text-brand-gold font-extrabold border border-brand-border text-xs select-none">
                    {test.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black text-brand-charcoal leading-none">{test.name}</h4>
                    <span className="text-[9px] text-brand-muted font-bold uppercase tracking-wider block mt-1">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Extra Bottom Trust Indicators */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16 text-center">
          <p className="text-[10px] uppercase text-brand-muted tracking-widest font-extrabold mb-6">Fully Certified, Licensed, and Insured Central Florida Business Entity</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
            <div className="flex items-center gap-2 font-bold text-[10px] uppercase text-brand-charcoal hover:text-brand-gold transition-colors">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-gold" />
              <span>Florida State Registered</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[10px] uppercase text-brand-charcoal hover:text-brand-gold transition-colors">
              <CheckCircle className="w-4.5 h-4.5 text-brand-gold" />
              <span>$2M Liability Insurance Protection</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[10px] uppercase text-brand-charcoal hover:text-brand-gold transition-colors">
              <Award className="w-4.5 h-4.5 text-brand-gold" />
              <span>Guarantee Protected Work</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[10px] uppercase text-brand-charcoal hover:text-brand-gold transition-colors">
              <MessageSquare className="w-4.5 h-4.5 text-brand-gold" />
              <span>Local Family Owned</span>
            </div>
          </div>
        </div>

      </section>

      {/* Social Media Content Showcase */}
      <section className="py-24 bg-brand-white-accent relative overflow-hidden border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2 flex items-center justify-center gap-2">
              <Instagram className="w-4 h-4" /> 
              <span>Real-time Proof</span>
            </h2>
            <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight mb-4">
              Follow Our Daily Progress
            </h3>
            <p className="text-brand-muted text-sm font-medium">
              We post updates on current texture blends, custom repaints, and walk-throughs. Explore{' '}
              <a href="https://instagram.com/ds.style.llc" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-bold">
                @ds.style.llc
              </a>.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Ig item 1 */}
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-card border border-brand-border block shadow-sm"
            >
              <Image 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400" 
                alt="Instagram Post 1" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="text-[9px] text-brand-gold font-bold tracking-widest uppercase">Drywall Mudding</span>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-semibold">@ds.style.llc</span>
                </div>
              </div>
            </a>

            {/* Ig item 2 */}
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-card border border-brand-border block shadow-sm"
            >
              <Image 
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400" 
                alt="Instagram Post 2" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="text-[9px] text-brand-gold font-bold tracking-widest uppercase">Exterior Coatings</span>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-semibold">@ds.style.llc</span>
                </div>
              </div>
            </a>

            {/* Ig item 3 */}
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-card border border-brand-border block shadow-sm"
            >
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400" 
                alt="Instagram Post 3" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="text-[9px] text-brand-gold font-bold tracking-widest uppercase">Premium Prep</span>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-semibold">@ds.style.llc</span>
                </div>
              </div>
            </a>

            {/* Ig item 4 */}
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-card border border-brand-border block shadow-sm"
            >
              <Image 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400" 
                alt="Instagram Post 4" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="text-[9px] text-brand-gold font-bold tracking-widest uppercase">Bath Renovation</span>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-semibold">@ds.style.llc</span>
                </div>
              </div>
            </a>

          </div>

          {/* Ig follow cta */}
          <div className="text-center mt-10">
            <a 
              href="https://instagram.com/ds.style.llc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A18] hover:bg-brand-gold text-white hover:text-brand-charcoal rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md transition-all btn-shine"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow @ds.style.llc</span>
            </a>
          </div>

        </div>
      </section>

      {/* Appointment Intake Lead form with success overlay */}
      <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Copy Info content (Left) */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-gold mb-2">Get In Touch</h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight mb-4">
                  Start Your Transformation
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed font-medium">
                  Ready to experience professional excellence? Send your details. Our master specialist will coordinate a site visit to examine your walls, match textures, and compile a flat-rate estimate.
                </p>
              </div>

              {/* Updated Contact Data Card */}
              <div className="space-y-4 text-sm font-semibold text-brand-charcoal">
                
                {/* 1. Phone */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-white-accent flex items-center justify-center border border-brand-border shadow-sm">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-brand-muted font-bold uppercase tracking-wider leading-none">Direct Hotline</p>
                    <a href="tel:+13213937331" className="text-brand-charcoal hover:text-brand-gold text-base font-black transition-colors block mt-1">(321) 393-7331</a>
                  </div>
                </div>

                {/* 2. Mail */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-white-accent flex items-center justify-center border border-brand-border shadow-sm">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-brand-muted font-bold uppercase tracking-wider leading-none">Official Email Address</p>
                    <a href="mailto:dsstylellc@gmail.com" className="text-brand-charcoal hover:text-brand-gold transition-colors text-base font-bold block mt-1">dsstylellc@gmail.com</a>
                  </div>
                </div>

                {/* 3. Coverage location */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-white-accent flex items-center justify-center border border-brand-border shadow-sm">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-brand-muted font-bold uppercase tracking-wider leading-none">Service Coverage</p>
                    <span className="text-brand-charcoal font-bold block mt-1">Kissimmee, Celebration, Windermere &amp; Orlando Metro</span>
                  </div>
                </div>

              </div>

              {/* Ratings proof */}
              <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-brand-muted">Excellent Rating on Google</span>
                <div className="flex items-center gap-1.5 bg-brand-white-accent border border-brand-border rounded-xl px-4 py-2">
                  <Star className="w-4 h-4 text-brand-gold fill-current" />
                  <span className="text-xs font-black text-brand-charcoal uppercase tracking-wider">Google</span>
                  <span className="text-xs font-black text-brand-gold">4.9★</span>
                </div>
              </div>

            </div>

            {/* Interactive Form Panel with transitions (Right) */}
            <div className="lg:col-span-7 relative">
              <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-md relative">
                
                {/* Form header branding anchor */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <Image 
                    src="https://i.imgur.com/39x856J.png" 
                    alt="DS Style Seal" 
                    width={48} 
                    height={48}
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-brand-charcoal uppercase tracking-widest block">First &amp; Last Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        placeholder="John Doe" 
                        className="w-full bg-brand-white-accent border border-brand-border rounded-xl px-4 py-3 text-brand-charcoal text-sm focus:outline-none focus:border-brand-gold transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-brand-charcoal uppercase tracking-widest block">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        placeholder="(321) 393-7331" 
                        className="w-full bg-brand-white-accent border border-brand-border rounded-xl px-4 py-3 text-brand-charcoal text-sm focus:outline-none focus:border-brand-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-brand-charcoal uppercase tracking-widest block">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="dsstylellc@gmail.com" 
                        className="w-full bg-brand-white-accent border border-brand-border rounded-xl px-4 py-3 text-brand-charcoal text-sm focus:outline-none focus:border-brand-gold transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-brand-charcoal uppercase tracking-widest block">Service Type *</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-brand-white-accent border border-brand-border rounded-xl px-4 py-3 text-brand-muted text-sm focus:outline-none focus:border-brand-gold transition-all cursor-pointer"
                      >
                        <option value="painting">Interior &amp; Exterior Painting</option>
                        <option value="drywall">Drywall Repair &amp; Texture matching</option>
                        <option value="renovation">Home Renovations</option>
                        <option value="other">Other Maintenance / Repair</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-brand-charcoal uppercase tracking-widest block">Project Details *</label>
                    <textarea 
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      required 
                      rows={4} 
                      placeholder="Describe the size, color ideas, and any damaged drywall texture that needs matching..." 
                      className="w-full bg-brand-white-accent border border-brand-border rounded-xl px-4 py-3 text-brand-charcoal text-sm focus:outline-none focus:border-brand-gold transition-all"
                    ></textarea>
                  </div>

                  {/* Submission triggers */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal font-black rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-widest text-[11px] btn-shine flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent inline-block"></span>
                        <span>Routing to Dispatch...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Free Quote</span>
                      </>
                    )}
                  </button>

                </form>

                {/* Absolute Success validation overlay */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-brand-card/98 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 z-40 transition-all duration-500"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-white-accent border border-brand-border flex items-center justify-center text-brand-gold shadow-sm">
                        <Check className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-brand-charcoal">Message Securely Sent</h3>
                      <p className="text-brand-muted text-sm max-w-md leading-relaxed font-semibold">
                        Thank you <span className="text-brand-charcoal font-extrabold">{formData.name}</span>! Your request was sent directly to our dispatch. A DS STYLE specialist will contact you via text or phone within <strong className="text-brand-charcoal">15 minutes</strong> to arrange your complimentary on-site visit.
                      </p>
                      <button 
                        onClick={resetFormState}
                        className="px-6 py-2.5 bg-brand-white-accent hover:bg-brand-border border border-brand-border rounded-xl text-xs font-semibold text-brand-charcoal uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Footer with deep localization */}
      <footer className="bg-brand-card border-t border-brand-border text-brand-muted py-16 text-sm relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Col 1 Brand Anchor */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-transparent">
                  <Image 
                    src="https://i.imgur.com/39x856J.png" 
                    alt="DS Style Logo" 
                    width={40} 
                    height={40}
                    className="h-10 w-10 object-contain rounded-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-sm font-extrabold tracking-widest text-brand-charcoal">DS STYLE LLC</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                Setting the premier gold standard in professional residential painting, premium drywall repairs, and customized space updates in Kissimmee and central Florida.
              </p>
              
              {/* Footer social anchors */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://instagram.com/ds.style.llc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-brand-white-accent border border-brand-border hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-brand-charcoal transition-all duration-300" 
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 text-brand-gold" />
                </a>
                <a 
                  href="tel:+13213937331" 
                  className="w-8 h-8 rounded-full bg-brand-white-accent border border-brand-border hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-brand-charcoal transition-all duration-300" 
                  title="Phone"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                </a>
                <a 
                  href="mailto:dsstylellc@gmail.com" 
                  className="w-8 h-8 rounded-full bg-brand-white-accent border border-brand-border hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-brand-charcoal transition-all duration-300" 
                  title="Email"
                >
                  <Mail className="w-4 h-4 text-brand-gold" />
                </a>
              </div>
            </div>

            {/* Col 2 Services */}
            <div>
              <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2 font-sans">Services</h4>
              <ul className="space-y-2 text-xs font-bold uppercase tracking-wide">
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Residential Painting</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Commercial Painting</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Drywall Repair &amp; Texture</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Bespoke Wall Textures</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors block">Kitchen Cabinet Repaints</a></li>
              </ul>
            </div>

            {/* Col 3 Local Service Area Coverage */}
            <div>
              <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2 font-sans">Coverage areas</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><span className="text-brand-charcoal block">Kissimmee, FL</span></li>
                <li><span className="text-brand-charcoal block">Celebration, FL</span></li>
                <li><span className="text-brand-charcoal block">Windermere, FL</span></li>
                <li><span className="text-brand-charcoal block">Orlando Metro Area, FL</span></li>
                <li><span className="text-brand-charcoal block">Davenport, FL</span></li>
              </ul>
            </div>

            {/* Col 4 Guarantee seal */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2 font-sans">The DS Style Seal</h4>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                Every single service is protected by our elite <strong className="text-brand-charcoal">Cleanliness &amp; Durability Guarantee</strong>. We make your space pristine.
              </p>
              <div className="flex items-center gap-2.5">
                <Image 
                  src="https://i.imgur.com/39x856J.png" 
                  alt="DS STYLE Seal" 
                  width={40} 
                  height={40}
                  className="object-contain p-0.5 border border-brand-border rounded-xl bg-brand-white-accent"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-[10px] font-extrabold uppercase text-brand-charcoal tracking-wider">Insured Protection</span>
                  <span className="text-[9px] text-brand-muted font-bold uppercase block tracking-wider">Premium Central Florida Partner</span>
                </div>
              </div>
            </div>

          </div>

          {/* Legal references */}
          <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
            <span>&copy; 2026 DS STYLE LLC. All Rights Reserved. Fully Certified, Licensed, and Insured in Florida.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
