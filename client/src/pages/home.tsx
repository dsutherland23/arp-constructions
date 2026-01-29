import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardList,
  Hammer,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Droplets,
  ChevronDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Assets
import logoImg from "@assets/WhatsApp_Image_2026-01-21_at_21.03.08_1769722462027.jpeg";
import renoImg from "@/assets/images/project-reno-1.png";
import plumbingImg from "@/assets/images/project-plumbing-1.png";
import constructionImg from "@/assets/images/project-construction-1.png";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "How It Works", href: "#process" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

const heroSlides = [
  {
    image: renoImg,
    title: "Luxury Renovations",
    subtitle: "Transforming spaces into modern masterpieces.",
  },
  {
    image: plumbingImg,
    title: "Expert Plumbing",
    subtitle: "Precision engineering for your home infrastructure.",
  },
  {
    image: constructionImg,
    title: "Home Development",
    subtitle: "Building the foundations of your future.",
  },
];

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Projects Completed", value: "250+" },
  { label: "Client Satisfaction", value: "98%" },
];

const services = [
  {
    title: "Home Development",
    description: "Custom builds with precision and architectural excellence.",
    icon: Building2,
    category: "Development",
  },
  {
    title: "Plumbing Systems",
    description: "Expert infrastructure and high-end fixture installation.",
    icon: Droplets,
    category: "Plumbing",
  },
  {
    title: "Renovations",
    description: "Modernizing existing structures with premium finishes.",
    icon: Hammer,
    category: "Renovation",
  },
  {
    title: "Project Management",
    description: "Comprehensive oversight from planning to handover.",
    icon: ClipboardList,
    category: "Management",
  },
];

const projects = [
  {
    id: 1,
    title: "The Modern Estate",
    category: "Development",
    image: constructionImg,
    location: "Beverly Hills",
  },
  {
    id: 2,
    title: "Zen Kitchen Remodel",
    category: "Renovation",
    image: renoImg,
    location: "Santa Monica",
  },
  {
    id: 3,
    title: "Smart Water System",
    category: "Plumbing",
    image: plumbingImg,
    location: "Malibu",
  },
  {
    id: 4,
    title: "Industrial Loft",
    category: "Renovation",
    image: renoImg,
    location: "Downtown",
  },
  {
    id: 5,
    title: "Seaside Villa",
    category: "Development",
    image: constructionImg,
    location: "Venice",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <img
        src={logoImg}
        alt="Arp Construction Logo"
        className="h-12 w-auto object-contain"
        data-testid="img-logo"
      />
    </div>
  );
}

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-[90vh] overflow-hidden bg-black" data-testid="section-hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[current].image}
            alt={heroSlides[current].title}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="arp-container relative flex h-full flex-col items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Badge className="mb-6 rounded-full bg-accent/90 px-4 py-1 text-accent-foreground hover:bg-accent">
            Premium Construction Services
          </Badge>
          <h1 className="arp-title mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            {heroSlides[current].title}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            {heroSlides[current].subtitle}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90" asChild>
              <a href="#contact">Get a Quote</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all rounded-full ${
                i === current ? "w-8 bg-accent" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({
      title: "Request Sent",
      description: "Our team will contact you within 24 hours.",
    });
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground" data-testid="page-landing">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="arp-container flex h-20 items-center justify-between">
          <Link href="/">
            <a className="transition-transform hover:scale-105">
              <Logo />
            </a>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            <Button className="rounded-full bg-primary" asChild>
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <HeroSlider />

        {/* Stats Section */}
        <section className="bg-primary py-12 text-primary-foreground">
          <div className="arp-container">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="arp-title text-4xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm font-medium uppercase tracking-widest text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24">
          <div className="arp-container">
            <div className="mb-16 text-center">
              <h2 className="arp-title mb-4 text-4xl font-bold">Our Expertise</h2>
              <div className="mx-auto h-1 w-20 bg-accent" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title} className="group overflow-hidden rounded-2xl border-none bg-secondary/50 transition-all hover:bg-secondary">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="arp-title text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-secondary/30 py-24">
          <div className="arp-container">
            <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="arp-title text-4xl font-bold">Latest Work</h2>
                <p className="text-muted-foreground">Crafting excellence across every project.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["All", "Development", "Plumbing", "Renovation"].map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 p-8 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{project.category}</div>
                      <h3 className="arp-title text-2xl font-bold">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-white/80 mt-2">
                        <MapPin className="h-4 w-4" /> {project.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24">
          <div className="arp-container text-center">
            <h2 className="arp-title mb-16 text-4xl font-bold">Our Process</h2>
            <div className="relative grid gap-12 lg:grid-cols-4">
              {[
                { title: "Consult", desc: "Understanding your vision" },
                { title: "Plan", desc: "Detailed engineering" },
                { title: "Build", desc: "Precision construction" },
                { title: "Deliver", desc: "Excellence handed over" },
              ].map((step, i) => (
                <div key={i} className="relative z-10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground shadow-lg shadow-accent/20">
                    {i + 1}
                  </div>
                  <h3 className="arp-title text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
              <div className="absolute top-8 left-0 hidden h-0.5 w-full bg-secondary lg:block" aria-hidden />
            </div>
          </div>
        </section>

        {/* Contact/Quote Section */}
        <section id="contact" className="py-24 bg-primary text-primary-foreground">
          <div className="arp-container">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 className="arp-title mb-6 text-5xl font-bold">Ready to start your journey?</h2>
                <p className="mb-12 text-lg text-white/60">
                  Whether it's a major development or a plumbing emergency, our team is ready to bring precision and integrity to your door.
                </p>

                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Call Us Anytime</div>
                      <div className="text-xl font-bold">+1 (555) 000-0000</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Email Support</div>
                      <div className="text-xl font-bold">hello@arpconstruction.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="rounded-[2.5rem] border-none bg-white p-2 shadow-2xl">
                <CardHeader className="text-center pt-8">
                  <CardTitle className="arp-title text-3xl text-primary">Get a Free Quote</CardTitle>
                  <CardDescription>We typically respond in under 2 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-primary">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required className="rounded-xl border-secondary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-primary">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required className="rounded-xl border-secondary" />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-primary">Service</Label>
                        <Select required>
                          <SelectTrigger className="rounded-xl border-secondary">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dev">Home Development</SelectItem>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="reno">Renovation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message" className="text-primary">Project Details</Label>
                      <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[120px] rounded-xl border-secondary" />
                    </div>
                    <Button type="submit" size="lg" className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
                      Send Quote Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="arp-container flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Arp Construction. Built with Integrity.
          </p>
          <div className="flex gap-4">
            <Badge variant="outline" className="rounded-full">Licensed</Badge>
            <Badge variant="outline" className="rounded-full">Insured</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
