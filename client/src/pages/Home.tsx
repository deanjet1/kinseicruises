import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  Anchor, 
  Calendar, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  MessageSquare, 
  Gift, 
  Tag, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  CheckCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PROMOTIONS, DESTINATIONS, PARTNERS, Promotion, Destination } from "../const";

export default function Home() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Filter state for Promotions
  const [showAllPromotions, setShowAllPromotions] = useState(false);
  const [promotionFilter, setPromotionFilter] = useState<"all" | "featured">("featured");

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Chat interface state
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatPhone, setChatPhone] = useState("");
  const [isChatRegistered, setIsChatRegistered] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "kai" | "user"; text: string }>>([
    {
      sender: "kai",
      text: "Welcome to Kinsei Cruises. I'm Kai, your personal cruise concierge. May I have your name to begin our journey?"
    }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [chatStep, setChatStep] = useState<"name" | "email" | "phone" | "ready">("name");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll active section listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "destinations", "specials", "why-us", "concierge", "about"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribed(true);
    toast.success("Thank you for subscribing! You are now on the list.");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const userText = currentInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setCurrentInput("");

    // Simulate AI response based on step
    setTimeout(() => {
      if (chatStep === "name") {
        setChatName(userText);
        setChatMessages(prev => [
          ...prev,
          {
            sender: "kai",
            text: `Wonderful to meet you, ${userText}! To ensure I can send you customized cruise itineraries and private advisor offers, could you share your email address?`
          }
        ]);
        setChatStep("email");
      } else if (chatStep === "email") {
        if (!userText.includes("@")) {
          setChatMessages(prev => [
            ...prev,
            {
              sender: "kai",
              text: "That doesn't look like a valid email. Please share your email address so we can keep in touch!"
            }
          ]);
          return;
        }
        setChatEmail(userText);
        setChatMessages(prev => [
          ...prev,
          {
            sender: "kai",
            text: "Perfect. And lastly, what is the best phone number to reach you? (Our private advisors follow up via text or call based on your preference)."
          }
        ]);
        setChatStep("phone");
      } else if (chatStep === "phone") {
        setChatPhone(userText);
        setIsChatRegistered(true);
        setChatMessages(prev => [
          ...prev,
          {
            sender: "kai",
            text: `Thank you, ${chatName}! I have connected you with our private advisory queue. Let's start designing your dream voyage now.\n\nWhere in the world are you looking to sail, and when are you thinking of departing?`
          }
        ]);
        setChatStep("ready");
      } else {
        // AI conversational replies
        let response = "";
        const textLower = userText.toLowerCase();
        if (textLower.includes("mediterranean") || textLower.includes("europe") || textLower.includes("italy") || textLower.includes("greece")) {
          response = `The Mediterranean is breathtaking! Our top recommendations right now are Princess Cruises' 7-night Riviera voyages or a luxury Viking River cruise. Would you prefer a large premium ship with multiple amenities or a boutique luxury experience?`;
        } else if (textLower.includes("caribbean") || textLower.includes("tropical") || textLower.includes("bahamas")) {
          response = `Ah, the Caribbean! We have exclusive 60% off deals for the 2nd guest with Royal Caribbean right now, including staterooms that come with onboard credits. Are you looking for family adventure or a serene adults-only retreat?`;
        } else if (textLower.includes("alaska") || textLower.includes("glacier")) {
          response = `Alaska is spectacular. Holland America has up to 30% off with free stateroom upgrades and shore excursion credits that we can secure for you. Would you be sailing with family, or is this a private getaway?`;
        } else {
          response = `That sounds like an incredible journey! I am checking our live inventory of 40+ cruise lines for the best stateroom values and exclusive Kinsei amenities. A private travel advisor will also reach out to you at ${chatEmail} or via text within the next 24 hours to help you secure the absolute best rate. What is your approximate budget per traveler?`;
        }

        setChatMessages(prev => [
          ...prev,
          {
            sender: "kai",
            text: response
          }
        ]);
      }
    }, 800);
  };

  const displayedPromotions = PROMOTIONS.filter(promo => {
    if (promotionFilter === "featured") return promo.featured || showAllPromotions;
    return true;
  });

  const handleBookingClick = () => {
    toast.success("Opening live search inventory portal...", {
      description: "Redirecting you to our secure Cruise.com booking engine."
    });
    setTimeout(() => {
      window.open("https://cs.cruisebase.com/CS/forms/CruiseResultsPage.aspx?skin=1092", "_blank");
    }, 1000);
  };

  const handleStartChat = () => {
    const element = document.getElementById("concierge");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 transition-all duration-200">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-12">
              <Compass className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide uppercase">Kinsei</span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">Cruises · Boutique Advisory</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#destinations" 
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${activeSection === "destinations" ? "text-primary border-b border-primary pb-1" : "text-muted-foreground"}`}
            >
              Destinations
            </a>
            <a 
              href="#specials" 
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${activeSection === "specials" ? "text-primary border-b border-primary pb-1" : "text-muted-foreground"}`}
            >
              Portfolio Specials
            </a>
            <a 
              href="#why-us" 
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${activeSection === "why-us" ? "text-primary border-b border-primary pb-1" : "text-muted-foreground"}`}
            >
              The Difference
            </a>
            <a 
              href="#concierge" 
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${activeSection === "concierge" ? "text-primary border-b border-primary pb-1" : "text-muted-foreground"}`}
            >
              Meet Kai
            </a>
            <a 
              href="#about" 
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${activeSection === "about" ? "text-primary border-b border-primary pb-1" : "text-muted-foreground"}`}
            >
              About Us
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="font-medium tracking-wide uppercase text-xs border-primary text-primary hover:bg-primary/5 transition-all active:scale-95"
              onClick={handleBookingClick}
            >
              Search Live Inventory
            </Button>
            <Button 
              variant="default" 
              className="font-medium tracking-wide uppercase text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
              onClick={handleStartChat}
            >
              Chat with Kai
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border/80 px-6 py-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col gap-5">
              <a 
                href="#destinations" 
                className="text-base font-medium tracking-wide uppercase text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </a>
              <a 
                href="#specials" 
                className="text-base font-medium tracking-wide uppercase text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio Specials
              </a>
              <a 
                href="#why-us" 
                className="text-base font-medium tracking-wide uppercase text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                The Difference
              </a>
              <a 
                href="#concierge" 
                className="text-base font-medium tracking-wide uppercase text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meet Kai
              </a>
              <a 
                href="#about" 
                className="text-base font-medium tracking-wide uppercase text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full font-medium tracking-wide uppercase text-sm border-primary text-primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleBookingClick();
                }}
              >
                Search Live Inventory
              </Button>
              <Button 
                variant="default" 
                className="w-full font-medium tracking-wide uppercase text-sm bg-primary text-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleStartChat();
                }}
              >
                Chat with Kai
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-primary text-primary-foreground">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/luxury_cruise_hero-bk8F2gACGUvm4MLKMtuFw7.webp" 
            alt="Luxury Cruise Ship" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-subtle"
            style={{ animationDuration: '8s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent md:to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 max-w-2xl">
            <Badge className="bg-accent text-accent-foreground border-none font-mono tracking-widest uppercase text-xs px-3.5 py-1.5 rounded-none">
              Boutique Cruise Advisory
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
              Your Perfect Voyage <br />
              <span className="italic font-normal text-accent">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-light">
              Zero booking fees. Personal 1:1 advisory. Access to 40+ premier cruise lines. We find your dream sailing in one elegant conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button 
                variant="default" 
                size="lg"
                className="font-medium tracking-wide uppercase text-sm bg-accent text-accent-foreground hover:bg-accent/90 border-none transition-all active:scale-95 px-8 h-14"
                onClick={handleStartChat}
              >
                Chat with Kai — Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="font-medium tracking-wide uppercase text-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all active:scale-95 px-8 h-14"
                onClick={handleBookingClick}
              >
                Browse Live Inventory
              </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-12 pt-8 border-t border-primary-foreground/10">
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-accent">40+</span>
                <span className="text-xs font-mono tracking-wider text-primary-foreground/60 uppercase mt-1">Cruise Lines</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-accent">$0</span>
                <span className="text-xs font-mono tracking-wider text-primary-foreground/60 uppercase mt-1">Booking Fees</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-accent">1:1</span>
                <span className="text-xs font-mono tracking-wider text-primary-foreground/60 uppercase mt-1">Personal Advisor</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-accent">24/7</span>
                <span className="text-xs font-mono tracking-wider text-primary-foreground/60 uppercase mt-1">AI Concierge</span>
              </div>
            </div>
          </div>

          {/* Quick Search Widget */}
          <div className="lg:col-span-5 bg-background text-foreground p-8 border border-border/80 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            <h3 className="font-serif text-2xl font-semibold mb-2">Find Your Sailing</h3>
            <p className="text-sm text-muted-foreground mb-6">Search our real-time availability engine across all major cruise lines.</p>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Destination</label>
                <div className="relative">
                  <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-3 bg-secondary/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm appearance-none cursor-pointer">
                    <option value="">All Destinations</option>
                    <option value="med">Mediterranean</option>
                    <option value="carib">Caribbean</option>
                    <option value="alaska">Alaska</option>
                    <option value="europe">Scandinavia & Fjords</option>
                    <option value="river">River Cruises</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Cruise Line</label>
                <div className="relative">
                  <Anchor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-3 bg-secondary/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm appearance-none cursor-pointer">
                    <option value="">All Cruise Lines</option>
                    {PARTNERS.map(line => (
                      <option key={line} value={line.toLowerCase()}>{line}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-3 py-3 bg-secondary/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm appearance-none cursor-pointer">
                      <option value="">Any Month</option>
                      <option value="2026-06">June 2026</option>
                      <option value="2026-07">July 2026</option>
                      <option value="2026-08">August 2026</option>
                      <option value="2026-09">September 2026</option>
                      <option value="2026-10">October 2026</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Duration</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-3 py-3 bg-secondary/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm appearance-none cursor-pointer">
                      <option value="">Any Duration</option>
                      <option value="1-5">1 - 5 Nights</option>
                      <option value="6-9">6 - 9 Nights</option>
                      <option value="10-14">10 - 14 Nights</option>
                      <option value="15+">15+ Nights</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button 
                variant="default" 
                className="w-full py-6 font-medium tracking-wide uppercase text-xs bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex items-center justify-center gap-2"
                onClick={handleBookingClick}
              >
                <Search className="h-4 w-4" /> Search Live Availability
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section id="destinations" className="py-24 bg-background border-b border-border/40">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="flex flex-col items-start gap-3">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Curated Collections</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                Where Will You <br />
                <span className="italic font-normal text-primary">Sail Next?</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed font-light">
              Explore handpicked, ultra-luxury destinations carefully organized to maximize stateroom value and deliver once-in-a-lifetime itineraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DESTINATIONS.filter(d => d.featured).map((dest) => (
              <div 
                key={dest.id} 
                className="group relative h-[450px] overflow-hidden border border-border/40 cursor-pointer"
                onClick={handleBookingClick}
              >
                {/* Background Image */}
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
                  <Badge className="bg-white/15 backdrop-blur-md text-white border-none font-mono tracking-wider uppercase text-[10px] px-2.5 py-1 rounded-none mb-3">
                    {dest.region}
                  </Badge>
                  <h3 className="font-serif text-2xl font-light mb-1 tracking-wide group-hover:text-accent transition-colors duration-300">{dest.name}</h3>
                  <div className="flex items-center justify-between w-full pt-4 mt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-white/50">Starting From</span>
                      <span className="font-serif text-lg font-semibold text-accent">{dest.startingPrice} <span className="text-xs font-sans font-light text-white/70">· {dest.duration}</span></span>
                    </div>
                    <div className="p-2.5 bg-white/10 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Destinations Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {DESTINATIONS.filter(d => !d.featured).map((dest) => (
              <div 
                key={dest.id} 
                className="group relative h-[300px] overflow-hidden border border-border/40 cursor-pointer"
                onClick={handleBookingClick}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white">
                  <Badge className="bg-white/15 backdrop-blur-md text-white border-none font-mono tracking-wider uppercase text-[10px] px-2.5 py-1 rounded-none mb-2">
                    {dest.region}
                  </Badge>
                  <h3 className="font-serif text-xl font-light tracking-wide group-hover:text-accent transition-colors duration-300">{dest.name}</h3>
                  <div className="flex items-center justify-between w-full pt-3 mt-3 border-t border-white/10">
                    <span className="font-serif text-base text-accent">{dest.startingPrice} <span className="text-xs font-sans font-light text-white/70">· {dest.duration}</span></span>
                    <span className="text-xs font-mono tracking-wider uppercase flex items-center gap-1 group-hover:text-accent transition-colors">
                      View Sailings <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SPECIALS */}
      <section id="specials" className="py-24 bg-secondary/30 border-b border-border/40">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="flex flex-col items-start gap-3">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Today's Best Sailings</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                Boutique <br />
                <span className="italic font-normal text-primary">Portfolio Specials</span>
              </h2>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4 max-w-md">
              <p className="text-muted-foreground text-sm lg:text-right leading-relaxed font-light">
                Handpicked luxury offers across our top cruise lines. Subject to change without notice—book now to secure the best available rate.
              </p>
              {/* Filter Controls */}
              <div className="flex items-center gap-2 border border-border bg-background p-1">
                <button 
                  className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${promotionFilter === "featured" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => { setPromotionFilter("featured"); setShowAllPromotions(false); }}
                >
                  Featured
                </button>
                <button 
                  className={`px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${promotionFilter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => { setPromotionFilter("all"); setShowAllPromotions(true); }}
                >
                  All Offers ({PROMOTIONS.length})
                </button>
              </div>
            </div>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPromotions.map((promo) => (
              <Card key={promo.id} className="bg-background border border-border/80 shadow-md relative overflow-hidden group flex flex-col h-full rounded-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/60 group-hover:bg-accent transition-colors" />
                
                <CardContent className="p-8 flex flex-col justify-between flex-grow h-full">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase font-semibold">{promo.cruiseLine}</span>
                      <Badge className="bg-accent text-accent-foreground border-none font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-none">
                        {promo.badge}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-light mb-2 tracking-wide text-primary">{promo.title}</h3>
                    <p className="text-sm font-semibold text-accent mb-6 leading-relaxed">{promo.savings}</p>

                    {/* Highlights */}
                    <ul className="space-y-3.5 mb-8">
                      {promo.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed font-light">
                          <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 border-t border-border/60 mt-auto">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-4">
                      <span>{promo.terms}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full font-medium tracking-wide uppercase text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 py-5 rounded-none"
                      onClick={handleBookingClick}
                    >
                      {promo.actionText} →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Kai Booking Helper Card */}
            {promotionFilter === "featured" && !showAllPromotions && (
              <Card className="bg-primary text-primary-foreground border border-primary shadow-lg relative overflow-hidden flex flex-col h-full rounded-none">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
                  <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />
                </div>
                
                <CardContent className="p-8 relative z-10 flex flex-col justify-between flex-grow h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                      <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Kinsei Exclusive</span>
                    </div>
                    
                    <h3 className="font-serif text-3xl font-light mb-4 leading-snug">Not Sure Which Voyage is Yours?</h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 font-light">
                      Let Kai search across our full 40+ line portfolio to match stateroom availability to your precise schedule, style, and budget.
                    </p>

                    <ul className="space-y-3.5 mb-8">
                      <li className="flex items-center gap-2.5 text-sm text-primary-foreground/90 font-light">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>Absolutely zero booking fees</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-primary-foreground/90 font-light">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>Triggers hidden value-adds & credits</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-sm text-primary-foreground/90 font-light">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>1:1 private advisor assigned in 24 hours</span>
                      </li>
                    </ul>
                  </div>

                  <Button 
                    variant="default" 
                    className="w-full font-medium tracking-wide uppercase text-xs bg-accent text-accent-foreground hover:bg-accent/90 border-none transition-all py-5 rounded-none"
                    onClick={handleStartChat}
                  >
                    Consult Cruise Concierge →
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Show All Toggle for Featured Mode */}
          {promotionFilter === "featured" && (
            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                className="font-medium tracking-wide uppercase text-xs border-border text-muted-foreground hover:text-foreground"
                onClick={() => setShowAllPromotions(!showAllPromotions)}
              >
                {showAllPromotions ? "Show Featured Only" : `View All ${PROMOTIONS.length} Port Specials`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* THE KINSEI DIFFERENCE */}
      <section id="why-us" className="py-24 bg-background border-b border-border/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="border border-border/80 p-3 bg-white shadow-xl relative z-10">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/caribbean_destination-2xho6HaPuALrAge9W5JKB8.webp" 
                  alt="Luxury cruise beach" 
                  className="w-full object-cover h-[500px]"
                />
              </div>
              {/* Overlapping decorative block */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/10 -z-0 hidden md:block" />
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                Better Cruises. <br />
                <span className="italic font-normal text-primary">Boutique Service.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                We believe travel booking should be as pleasant as the journey itself. As a premier boutique advisory, we provide the luxury of simplicity.
              </p>

              {/* Value Props Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                <div className="flex gap-4">
                  <div className="p-3 bg-secondary/60 text-primary h-fit">
                    <Gift className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium mb-1.5">Member-Only Pricing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Access exclusive Cruise.com partner rates, bundled onboard credits, and room upgrades.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-secondary/60 text-primary h-fit">
                    <ShieldCheck className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium mb-1.5">Absolutely Zero Fees</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Our expert guidance costs you nothing. Our compensation is paid directly by the cruise lines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-secondary/60 text-primary h-fit">
                    <User className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium mb-1.5">No Call Centers</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Direct access to your dedicated advisor who remembers your stateroom preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-secondary/60 text-primary h-fit">
                    <Sparkles className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium mb-1.5">AI-Matched Concierge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      Kai qualified your style in minutes and presents real bookable staterooms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET KAI (CONCIERGE / CHAT) */}
      <section id="concierge" className="py-24 bg-secondary/20 border-b border-border/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">AI Cruise Concierge</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                Meet <span className="italic font-normal text-primary">Kai</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                Tell Kai where you want to go. Kai asks the right questions and surfaces real stateroom availability from 40+ lines—no complex forms, no waiting, no pressure.
              </p>

              <div className="space-y-4 w-full pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-accent/20 text-accent rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground/80 font-light">Qualifies your cruise style in minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-accent/20 text-accent rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground/80 font-light">Surfaces live bookable rates instantly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-accent/20 text-accent rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground/80 font-light">Triggers private advisor stateroom upgrades</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-accent/20 text-accent rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground/80 font-light">Zero pressure—human advisors follow up on request</span>
                </div>
              </div>

              {/* Advisory Badge */}
              <div className="flex items-center gap-4 p-4 bg-background border border-border/80 w-full mt-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/advisor_kai-CiMYLDzz2kYnSs5J6xLbjc.webp" 
                  alt="Kai Portrait" 
                  className="w-16 h-16 object-cover border border-border"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base font-semibold">Kai</span>
                  <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">Kinsei Cruise Concierge</span>
                  <span className="text-[10px] text-accent font-semibold mt-1">Powered by Anthropic AI & Cruise.com</span>
                </div>
              </div>
            </div>

            {/* Right Chat Interface */}
            <div className="lg:col-span-7 bg-background border border-border/80 shadow-2xl flex flex-col h-[550px] relative">
              {/* Chat Header */}
              <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/advisor_kai-CiMYLDzz2kYnSs5J6xLbjc.webp" 
                      alt="Kai Avatar" 
                      className="w-10 h-10 object-cover border border-primary-foreground/20"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-primary rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-semibold tracking-wide">Kai · Concierge Lounge</span>
                    <span className="text-[10px] font-mono text-primary-foreground/60 uppercase">Online & Ready</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono tracking-widest bg-accent text-accent-foreground px-2 py-1 uppercase">
                  VIP Client Lounge
                </div>
              </div>

              {/* Chat Body (Messages) */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-secondary/10">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {msg.sender === "kai" && (
                        <img 
                          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663314711890/heJVAHE7qAVmpbSgEz97Jf/advisor_kai-CiMYLDzz2kYnSs5J6xLbjc.webp" 
                          alt="Kai Avatar" 
                          className="w-8 h-8 object-cover border border-border shrink-0"
                        />
                      )}
                      <div 
                        className={`p-4 text-sm leading-relaxed ${
                          msg.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-background text-foreground border border-border/80"
                        }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* VIP Client Inquiry Card overlay when chat is registered */}
              {isChatRegistered && (
                <div className="absolute top-16 left-0 w-full bg-accent/10 border-b border-accent/20 px-6 py-2 flex items-center justify-between text-xs font-mono text-foreground/80">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-accent" />
                    <span>Inquiry: {chatName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{chatEmail}</span>
                    <span>{chatPhone}</span>
                  </div>
                </div>
              )}

              {/* Chat Input & Lead Capture Form */}
              <form 
                name="chat-leads"
                method="POST"
                data-netlify="true"
                onSubmit={handleChatSubmit} 
                className="p-4 border-t border-border bg-background flex gap-2"
              >
                {/* Hidden inputs to pass lead details captured during conversation to Netlify */}
                <input type="hidden" name="form-name" value="chat-leads" />
                <input type="hidden" name="lead-name" value={chatName} />
                <input type="hidden" name="lead-email" value={chatEmail} />
                <input type="hidden" name="lead-phone" value={chatPhone} />
                <input 
                  type="text" 
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={
                    chatStep === "name" ? "Enter your name..." :
                    chatStep === "email" ? "Enter your email address..." :
                    chatStep === "phone" ? "Enter your phone number..." :
                    "Tell Kai your dream destination..."
                  }
                  className="flex-grow px-4 py-3 bg-secondary/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                />
                <Button 
                  type="submit" 
                  variant="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 p-3 h-auto"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOUTIQUE ADVISORY (ABOUT) */}
      <section id="about" className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Kinsei & Company</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                Boutique Service. <br />
                <span className="italic font-normal text-primary">Global Negotiating Power.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                Kinsei Cruises is built on one core belief: <strong>every traveler deserves a private travel advisor</strong>—not a call center queue, and not a cold search engine.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light">
                As a premier boutique affiliate of Cruise.com, we combine the vast negotiating power of one of the world's largest cruise networks with the highly personalized, high-touch advisory of a private agency. You secure <strong>better cabin rates, exclusive stateroom amenities, and a dedicated advisor</strong> who works tirelessly on your behalf.
              </p>
              
              {/* Partner Badges */}
              <div className="pt-6 w-full">
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase block mb-4">Cruise.com Premier Partner · CLIA Certified · CST #2151626-50</span>
                <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-55 hover:opacity-80 transition-opacity">
                  <span className="font-serif text-lg font-semibold tracking-wider">VIKING</span>
                  <span className="font-serif text-lg font-semibold tracking-wider">SEABOURN</span>
                  <span className="font-serif text-lg font-semibold tracking-wider">PRINCESS</span>
                  <span className="font-serif text-lg font-semibold tracking-wider">CELEBRITY</span>
                  <span className="font-serif text-lg font-semibold tracking-wider">CUNARD</span>
                </div>
              </div>
            </div>

            {/* Contact / Newsletter Block */}
            <div className="lg:col-span-5 bg-secondary/30 p-8 border border-border/60 relative">
              <h3 className="font-serif text-2xl font-semibold mb-2">Subscribe to Specials</h3>
              <p className="text-sm text-muted-foreground mb-6">New cruise deals emerge almost every day. Be the first to receive our curated list—zero spam, unsubscribe anytime.</p>
              
              {!isSubscribed ? (
                <form 
                  name="newsletter-subscriptions" 
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubscribe} 
                  className="space-y-4"
                >
                  {/* Hidden input for Netlify form identification */}
                  <input type="hidden" name="form-name" value="newsletter-subscriptions" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com" 
                      className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="default" 
                    className="w-full py-6 font-medium tracking-wide uppercase text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Subscribe to Port Specials
                  </Button>
                </form>
              ) : (
                <div className="p-6 bg-background border border-accent/20 flex flex-col items-center text-center gap-3">
                  <CheckCircle className="h-10 w-10 text-accent" />
                  <h4 className="font-serif text-lg font-medium">You're on the list!</h4>
                  <p className="text-xs text-muted-foreground">We will notify you the moment exclusive stateroom specials and advisor rates are published.</p>
                </div>
              )}

              {/* Direct Contacts */}
              <div className="mt-8 pt-6 border-t border-border/60 space-y-3 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <span>Advisory Desk: (307) 888-4256</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <span>Inquiries: info@kinseicruises.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span>Kinsei & Co. · Sheridan, WY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground/90 py-16 border-t border-primary-foreground/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-accent text-accent-foreground">
                  <Compass className="h-5 w-5 stroke-[1.5]" />
                </div>
                <span className="font-serif text-xl font-semibold tracking-wide uppercase">Kinsei Cruises</span>
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm font-light">
                Luxury boutique cruise advisory combining personalized private consulting with the pricing power of Cruise.com.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Quick Navigation</span>
              <nav className="flex flex-col gap-2.5 text-sm font-light text-primary-foreground/70">
                <a href="#destinations" className="hover:text-accent transition-colors">Destinations</a>
                <a href="#specials" className="hover:text-accent transition-colors">Portfolio Specials</a>
                <a href="#why-us" className="hover:text-accent transition-colors">The Difference</a>
                <a href="#concierge" className="hover:text-accent transition-colors">Meet Kai</a>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">Affiliations</span>
              <p className="text-xs text-primary-foreground/60 leading-relaxed font-light">
                Cruise.com Premier Partner · CLIA Certified Member · California Seller of Travel CST #2151626-50.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-primary-foreground/50">
            <span>© 2026 Kinsei Cruises by Viajo LC. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-accent transition-colors">Back to Top</a>
              <a href="https://kinseicruises.cruise.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Live Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
