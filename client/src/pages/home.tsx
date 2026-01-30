import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { 
  ArrowUpRight, 
  ChevronRight, 
  Droplets, 
  Hammer, 
  Building2, 
  ShieldCheck, 
  Timer, 
  Quote,
  MoveRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Download,
  QrCode,
  CheckCircle2,
  Wrench,
  Layers,
  Layout,
  Tv,
  Table
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Assets
import logoImg from "@assets/ARP_logo_1769723239419.png";
import renoImg from "@/assets/images/project-reno-1.png";
import plumbingImg from "@/assets/images/project-plumbing-1.png";
import bathroomImg from "@/assets/images/project-bathroom.png";
import kitchenImg from "@/assets/images/project-kitchen.png";
import cardFront from "/assets/business-card-front.jpg";
import cardBack from "/assets/business-card-back.jpg";

const projects = [
  {
    title: "Luxury Kitchen Suite",
    category: "Kitchen Renovation",
    image: kitchenImg,
    size: "large"
  },
  {
    title: "Modern Spa Retreat",
    category: "Bathroom Renovation",
    image: bathroomImg,
    size: "small"
  },
  {
    title: "High-Flow Infrastructure",
    category: "Plumbing",
    image: plumbingImg,
    size: "small"
  },
  {
    title: "Open-Concept Living",
    category: "Interior Renovation",
    image: renoImg,
    size: "medium"
  }
];

const services = [
  {
    title: "Kitchen Renovations",
    icon: Hammer,
    description: "Bespoke kitchen transformations combining ergonomic design with premium materials and high-end appliances.",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Bathroom Renovations",
    icon: Droplets,
    description: "Creating spa-like sanctuaries with luxury fixtures, custom tiling, and advanced waterproofing systems.",
    color: "bg-cyan-500/10 text-cyan-600"
  },
  {
    title: "Interior Home Renovations",
    icon: Building2,
    description: "Complete interior overhauls that redefine your living space, from structural changes to fine finishing.",
    color: "bg-indigo-500/10 text-indigo-600"
  }
];

const detailedServices = [
  {
    title: "Plumbing Handyman Services",
    icon: Droplets,
    items: ["Fixing clogged shower drain", "Replacing tub/shower faucet", "Fixing leaky faucet", "Installing a garbage disposal", "Repair or replace a toilet", "Fixing leaking outdoor spigot", "Fixing leaking shower head", "Plus lots more!"]
  },
  {
    title: "General Home Maintenance",
    icon: Wrench,
    items: ["Minor appliance maintenance", "Replace HVAC air filter", "Replace smoke detector batteries", "Interior + exterior caulking", "First story gutter inspection", "Sump pump inspection", "Paint touch-ups", "Weatherstripping", "Deck and patio maintenance", "Power washing", "Child and pet safety checks"]
  },
  {
    title: "Blinds and Window Treatments",
    icon: Layout,
    items: ["Install curtain rods", "Install blinds", "Hang curtains", "Fitting blinds and curtains", "Lubricate tracks and rods", "Replace slats or panels", "Tighten and adjust hardware", "Dusting and wipe down"]
  },
  {
    title: "Doors and Windows",
    icon: Building2,
    items: ["Door and window frame repair", "Installation of new door hardware", "Door knob repair and replacement", "Weatherstripping replacement", "Caulking and sealing", "Hinge lubrication", "Lock replacement or repair", "Screen repair or replacement", "Pre-hung door installation"]
  },
  {
    title: "Drywall",
    icon: Layers,
    items: ["Minor drywall repair", "Patching holes", "Fix sheetrock", "Seal and touch up cracks", "Apply textured finishes", "Fix ceiling drywall", "Fix and retape corner cracks"]
  },
  {
    title: "TVs, Artwork, and Shelving",
    icon: Tv,
    items: ["Mounting flatscreen TV", "Mounting picture frames", "Hanging artwork or paintings", "Hanging mirrors", "Installing shelves", "Mounting floating shelves", "Installing towel racks", "Mounting bike racks", "Installing garage organization systems"]
  },
  {
    title: "Furniture Assembly and Repairs",
    icon: Table,
    items: ["Assembling flat-pack furniture", "Bedroom furniture assembly", "Office furniture assembly", "Outdoor furniture assembly", "Repairing loose or broken furniture", "Fixing wobbly chairs or tables", "Replacing broken drawer slides", "Anchoring furniture"]
  }
];

export default function HomePage() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroImages = [kitchenImg, bathroomImg, renoImg, plumbingImg];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Strategy Session Booked",
      description: "We'll reach out to your team shortly.",
    });
  };

  const navItems = ["Services", "Projects", "Process", "Contact"];

  return (
    <div className="noise-bg min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? "py-2" : "py-4 md:py-8"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "glass-card shadow-lg rounded-full px-4 md:px-6 py-2 md:py-3" : "bg-transparent px-2 py-2"}`}>
            <div className="flex items-center">
              <img src={logoImg} alt="Arp" className="h-16 md:h-28 w-auto transition-all duration-500" />
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium tracking-tight text-primary/80 transition-colors hover:text-accent">
                  {item}
                </a>
              ))}
              <Button size="sm" className="rounded-full bg-primary px-6 hover:bg-accent transition-all">
                Book a Consult
              </Button>
            </div>
            
            {/* Mobile Nav Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full glass-card mt-2 p-6 md:hidden shadow-2xl rounded-3xl"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-lg font-medium p-2 border-b border-border/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="rounded-full bg-primary w-full mt-2">
                    Book a Consult
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <img 
              src={heroImages[activeSlide]} 
              className="h-full w-full object-cover grayscale-[0.2]" 
              alt="Hero"
            />
          </motion.div>
        </AnimatePresence>

        <div className="container relative z-20 mx-auto flex h-full flex-col justify-center px-4 md:px-6 pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 md:mb-6 rounded-full border-accent/20 bg-accent/5 px-4 py-1 text-accent">
              <Sparkles className="mr-2 h-3 w-3" />
              Crafting Excellence in 2026
            </Badge>
            <h1 className="mb-4 md:mb-6 text-4xl font-bold leading-[1.1] tracking-tighter text-primary sm:text-8xl">
              Building with <span className="text-gradient">Precision.</span>
              <br />Living with Style.
            </h1>
            <p className="mb-8 md:mb-10 max-w-xl text-base md:text-xl text-muted-foreground">
              Arp Construction merges architectural integrity with modern design aesthetics to deliver spaces that inspire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="group rounded-full bg-primary px-8 hover:bg-accent w-full">
                  Start Project
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </a>
              <a href="#projects" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="rounded-full px-8 w-full">
                  Explore Portfolio
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-20">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl">Our Capabilities</h2>
            <div className="mt-4 h-1 w-24 bg-accent" />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-[2rem] bg-card p-8 md:p-10 transition-all hover:bg-secondary/50 cursor-pointer"
                  >
                    <div className={`mb-6 md:mb-8 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl ${service.color}`}>
                      <service.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <h3 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold">{service.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-2 text-accent font-medium text-sm">
                      View Details <ChevronRight className="h-4 w-4" />
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none glass-card p-0 z-[101]">
                  <div className="p-6 md:p-12 pt-16 md:pt-12">
                    <DialogHeader className="mb-12">
                      <DialogTitle className="text-4xl font-bold tracking-tight text-gradient">Full Service Catalog</DialogTitle>
                      <p className="text-muted-foreground mt-2">Professional solutions for every corner of your home.</p>
                    </DialogHeader>
                    
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {detailedServices.map((detailed, idx) => (
                        <div key={idx} className="space-y-4 p-6 rounded-3xl bg-secondary/30 border border-border/50">
                          <div className="flex items-center gap-3 text-accent">
                            <detailed.icon className="h-6 w-6" />
                            <h4 className="font-bold text-lg leading-tight">{detailed.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {detailed.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent/60 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-12 p-8 rounded-[2rem] bg-accent text-accent-foreground text-center">
                      <h4 className="text-xl font-bold mb-2">Need something else?</h4>
                      <p className="opacity-90 mb-6">No job is too small for our expert team.</p>
                      <DialogTrigger asChild>
                        <a href="#contact">
                          <Button variant="secondary" className="rounded-full px-8">Contact Us Now</Button>
                        </a>
                      </DialogTrigger>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee/Scrolling Projects */}
      <section id="projects" className="bg-primary py-20 md:py-32 text-primary-foreground">
        <div className="container mx-auto mb-12 md:mb-20 px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl">Visual Proof</h2>
            <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 w-fit">
              View All Case Studies
            </Button>
          </div>
        </div>

        <div className="flex overflow-hidden pb-10">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 px-4"
          >
            {[...projects, ...projects].map((project, i) => (
              <div key={i} className="group relative h-[350px] md:h-[450px] w-[280px] md:w-[500px] shrink-0 overflow-hidden rounded-[2.5rem] bg-white/5">
                <img 
                  src={project.image} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <Badge className="mb-3 md:mb-4 bg-accent text-white">{project.category}</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-20 text-center">
            <Badge variant="outline" className="mb-4 rounded-full border-accent/20 bg-accent/5 px-4 py-1 text-accent">
              Our Method
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl">How We Work</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Strategy", desc: "Initial consult to define your vision and budget." },
              { step: "02", title: "Design", desc: "Detailed 3D mockups and material selection." },
              { step: "03", title: "Build", desc: "Precision construction with daily progress updates." },
              { step: "04", title: "Handoff", desc: "Final walkthrough and 2026 quality certification." }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-card shadow-sm hover-lift">
                <span className="text-4xl md:text-5xl font-black text-accent/10 absolute top-4 right-8">{item.step}</span>
                <h3 className="text-lg md:text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Strategy */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[2rem] md:rounded-[3rem] bg-card p-6 md:p-20 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
            
            <div className="grid gap-12 lg:grid-cols-2 relative z-10">
              <div>
                <h2 className="mb-6 md:mb-8 text-4xl font-bold tracking-tighter sm:text-7xl">
                  Start Your <br /><span className="text-accent">Legacy</span> Today.
                </h2>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-secondary shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Quick Contact</p>
                      <p className="text-lg md:text-xl font-bold">704 712 9947</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-secondary shrink-0">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Digital Inquiry</p>
                      <p className="text-lg md:text-xl font-bold">adrian.pecco@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12">
                <form onSubmit={handleFormSubmit} className="grid gap-4 md:gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Contact Us</Label>
                    <Input id="name" placeholder="Full Name" required className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-background/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="email@address.com" required className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-background/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Project Vision</Label>
                    <Textarea id="message" placeholder="Briefly describe your goals..." className="min-h-[120px] md:min-h-[150px] rounded-xl md:rounded-2xl bg-background/50" />
                  </div>
                  <Button type="submit" size="lg" className="h-14 md:h-16 rounded-xl md:rounded-2xl bg-accent text-base md:text-lg font-bold hover:bg-primary transition-all">
                    Initiate Consult <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
            <div className="flex flex-col items-center lg:items-start">
              <img src={logoImg} alt="Arp" className="h-24 md:h-32 w-auto mb-6" />
              <p className="text-muted-foreground max-w-xs text-center lg:text-left">
                Setting the standard for architectural precision and modern living in 2026.
              </p>
            </div>
            
            <div className="flex gap-16 md:gap-24">
              <div className="space-y-4">
                <p className="font-bold text-xs uppercase tracking-widest text-accent">Studio</p>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Projects</a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer w-fit">
                        Digital Card
                        <Badge variant="outline" className="text-[10px] py-0 px-1 border-accent/20 bg-accent/5 text-accent">QR</Badge>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg rounded-3xl overflow-hidden border-none glass-card p-0 gap-0">
                      <div className="p-6 md:p-8">
                        <DialogHeader className="mb-6">
                          <DialogTitle className="text-2xl font-bold tracking-tight">Connect with ARP</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="relative aspect-[1.75/1] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                            <img src={cardFront} alt="Business Card Front" className="w-full h-full object-cover" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Button asChild className="rounded-2xl h-14 bg-accent hover:bg-primary transition-all">
                              <a href={cardFront} download="ARP_Construction_Card.jpg" className="flex items-center justify-center gap-2">
                                <Download className="h-5 w-5" />
                                Download
                              </a>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="bg-white p-2 rounded-2xl shadow-inner flex items-center justify-center aspect-square h-14 w-full cursor-pointer hover:bg-secondary transition-colors">
                                  <QrCode className="h-8 w-8 text-primary" />
                                  <span className="text-[10px] font-bold ml-1 uppercase">Scan QR</span>
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden border-none glass-card p-8">
                                <DialogHeader className="mb-6">
                                  <DialogTitle className="text-xl font-bold text-center">Scan to Save Contact</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center gap-6">
                                  <div className="p-4 bg-white rounded-3xl shadow-xl">
                                    <QRCodeSVG 
                                      value={`BEGIN:VCARD\nVERSION:3.0\nFN:Adrian Pecco\nORG:ARP Construction\nTEL:7047129947\nEMAIL:adrian.pecco@gmail.com\nURL:https://arp.construction\nEND:VCARD`}
                                      size={200}
                                      level="H"
                                      includeMargin={true}
                                    />
                                  </div>
                                  <p className="text-sm text-center text-muted-foreground">
                                    Open your phone camera to scan this code and instantly save ARP Construction to your contacts.
                                  </p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
                            <p className="text-sm text-center text-muted-foreground">
                              Scan the QR code on the card to save our contact info directly to your phone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <a href="#" className="hover:text-primary transition-colors">Process</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-xs uppercase tracking-widest text-accent">Social</p>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-primary transition-colors">Dribbble</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex gap-3">
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent">Licensed 2026</Badge>
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent">Insured Platinum</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Arp Construction. Designed for Excellence.
              </p>
              <p className="text-xs text-muted-foreground">
                created by <a href="https://www.instagram.com/socialkon10_cre8tive/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Socialkon10 Marketing</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
