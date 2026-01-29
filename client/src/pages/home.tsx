import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Assets
import logoImg from "@assets/ARP_logo_1769723239419.png";
import renoImg from "@/assets/images/project-reno-1.png";
import plumbingImg from "@/assets/images/project-plumbing-1.png";
import bathroomImg from "@/assets/images/project-bathroom.png";
import kitchenImg from "@/assets/images/project-kitchen.png";

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

export default function HomePage() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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

  return (
    <div className="noise-bg min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? "py-4" : "py-8"}`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all ${isScrolled ? "glass-card shadow-lg" : "bg-transparent"}`}>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Arp" className="h-24 md:h-28 w-auto" />
            </div>
            
            <div className="hidden items-center gap-8 md:flex">
              {["Services", "Projects", "Process", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium tracking-tight text-primary/80 transition-colors hover:text-accent">
                  {item}
                </a>
              ))}
              <Button size="sm" className="rounded-full bg-primary px-6 hover:bg-accent transition-all">
                Book a Consult
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
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

        <div className="container relative z-20 mx-auto flex h-full flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-6 rounded-full border-accent/20 bg-accent/5 px-4 py-1 text-accent">
              <Sparkles className="mr-2 h-3 w-3" />
              Crafting Excellence in 2026
            </Badge>
            <h1 className="mb-6 text-6xl font-bold leading-[1.1] tracking-tighter text-primary sm:text-8xl">
              Building with <span className="text-gradient">Precision.</span>
              <br />Living with Style.
            </h1>
            <p className="mb-10 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Arp Construction merges architectural integrity with modern design aesthetics to deliver spaces that inspire.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group rounded-full bg-primary px-8 hover:bg-accent">
                Start Project
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Explore Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section id="services" className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">Our Capabilities</h2>
            <div className="mt-4 h-1 w-24 bg-accent" />
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2rem] bg-card p-10 transition-all hover:bg-secondary/50"
              >
                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${service.color}`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="absolute bottom-8 right-8 opacity-0 transition-opacity group-hover:opacity-100">
                  <ChevronRight className="h-6 w-6 text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee/Scrolling Projects */}
      <section id="projects" className="bg-primary py-32 text-primary-foreground">
        <div className="container mx-auto mb-20 px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">Visual Proof</h2>
            <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10">
              View All Case Studies
            </Button>
          </div>
        </div>

        <div className="flex overflow-hidden pb-10">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...projects, ...projects].map((project, i) => (
              <div key={i} className="group relative h-[450px] w-[350px] shrink-0 overflow-hidden rounded-[2.5rem] bg-white/5 md:w-[500px]">
                <img 
                  src={project.image} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-10 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <Badge className="mb-4 bg-accent text-white">{project.category}</Badge>
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <Badge variant="outline" className="mb-4 rounded-full border-accent/20 bg-accent/5 px-4 py-1 text-accent">
              Our Method
            </Badge>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">How We Work</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Strategy", desc: "Initial consult to define your vision and budget." },
              { step: "02", title: "Design", desc: "Detailed 3D mockups and material selection." },
              { step: "03", title: "Build", desc: "Precision construction with daily progress updates." },
              { step: "04", title: "Handoff", desc: "Final walkthrough and 2026 quality certification." }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-card shadow-sm hover-lift">
                <span className="text-5xl font-black text-accent/10 absolute top-4 right-8">{item.step}</span>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Strategy */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <div className="rounded-[3rem] bg-card p-10 md:p-20 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
            
            <div className="grid gap-16 lg:grid-cols-2 relative z-10">
              <div>
                <h2 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl">
                  Start Your <br /><span className="text-accent">Legacy</span> Today.
                </h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quick Contact</p>
                      <p className="text-xl font-bold">704 712 9947</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Digital Inquiry</p>
                      <p className="text-xl font-bold">adrian.pecco@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-8 md:p-12">
                <form onSubmit={handleFormSubmit} className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Lead Contact</Label>
                    <Input id="name" placeholder="Full Name" required className="h-14 rounded-2xl bg-background/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="email@address.com" required className="h-14 rounded-2xl bg-background/50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Project Vision</Label>
                    <Textarea id="message" placeholder="Briefly describe your goals..." className="min-h-[150px] rounded-2xl bg-background/50" />
                  </div>
                  <Button type="submit" size="lg" className="h-16 rounded-2xl bg-accent text-lg font-bold hover:bg-primary transition-all">
                    Initiate Consult <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="flex flex-col items-center md:items-start">
              <img src={logoImg} alt="Arp" className="h-20 w-auto mb-4" />
              <p className="text-muted-foreground max-w-xs text-center md:text-left">
                Setting the standard for architectural precision and modern living in 2026.
              </p>
            </div>
            
            <div className="flex gap-12">
              <div className="space-y-4">
                <p className="font-bold text-sm uppercase tracking-widest text-accent">Studio</p>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Projects</a>
                  <a href="#" className="hover:text-primary transition-colors">Philosophy</a>
                  <a href="#" className="hover:text-primary transition-colors">Process</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-sm uppercase tracking-widest text-accent">Social</p>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-primary transition-colors">Dribbble</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-3">
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent">Licensed 2026</Badge>
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent">Insured Platinum</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Arp Construction. Designed for Excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
