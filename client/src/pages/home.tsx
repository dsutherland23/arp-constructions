import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroBg from "@/assets/images/arp-hero-bg.png";
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

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Projects Completed", value: "250+" },
  { label: "Client Satisfaction", value: "98%" },
];

const badges = ["Licensed", "Insured", "Quality Guaranteed"];

const services = [
  {
    title: "Residential Construction",
    description: "Custom homes built with precision, quality, and care.",
    href: "/services#residential",
    icon: HomeIcon,
  },
  {
    title: "Renovations & Remodeling",
    description: "Transforming existing spaces into modern, functional designs.",
    href: "/services#renovations",
    icon: Hammer,
  },
  {
    title: "Commercial Construction",
    description: "Reliable construction solutions for business spaces.",
    href: "/services#commercial",
    icon: Building2,
  },
  {
    title: "Project Management",
    description: "End-to-end oversight for timelines, quality, and budgets.",
    href: "/services#project-management",
    icon: ClipboardList,
  },
];

const steps = [
  {
    title: "Consultation",
    description: "We learn your goals, budget, and vision, then map out next steps.",
  },
  {
    title: "Planning & Design",
    description: "Site assessment, drawings, and transparent cost estimation.",
  },
  {
    title: "Construction",
    description: "Execution with strict quality control and timeline management.",
  },
  {
    title: "Final Handover",
    description: "A detailed inspection and finish you can feel proud of.",
  },
];

const featuredProjects = [
  {
    id: "p1",
    title: "Modern Family Home",
    location: "Westwood",
    category: "Residential",
    description: "A warm, modern build with premium finishes and timeless curb appeal.",
  },
  {
    id: "p2",
    title: "Retail Fit-Out",
    location: "Downtown",
    category: "Commercial",
    description: "Fast-turn retail build with durable materials and clean detailing.",
  },
  {
    id: "p3",
    title: "Kitchen & Bath Remodel",
    location: "Riverside",
    category: "Renovation",
    description: "High-function remodel with better flow, storage, and lighting.",
  },
  {
    id: "p4",
    title: "Office Refresh",
    location: "Midtown",
    category: "Commercial",
    description: "New partitions, acoustic solutions, and a refreshed client area.",
  },
  {
    id: "p5",
    title: "Home Extension",
    location: "Brookfield",
    category: "Renovation",
    description: "Seamless extension to add space without compromising character.",
  },
  {
    id: "p6",
    title: "Contemporary Duplex",
    location: "Oak Hills",
    category: "Residential",
    description: "A smart multi-unit build balancing privacy, light, and efficiency.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Amelia R.",
    type: "Renovation",
    rating: 5,
    review:
      "Communication was clear from day one. The finish quality is excellent and the timeline was respected.",
  },
  {
    id: "t2",
    name: "Jason M.",
    type: "Residential",
    rating: 5,
    review:
      "ARP handled everything professionally. The build feels solid, thoughtful, and truly well crafted.",
  },
  {
    id: "t3",
    name: "Priya K.",
    type: "Commercial",
    rating: 5,
    review:
      "Reliable team with strong project management. Our fit-out was delivered with minimal downtime.",
  },
];

const faqs = [
  {
    q: "How much does a project cost?",
    a: "Pricing depends on scope, materials, and timeline. We provide itemized estimates so you know exactly what to expect.",
  },
  {
    q: "How long will my project take?",
    a: "Timelines vary based on complexity. After consultation, we share a clear schedule with milestone check-ins.",
  },
  {
    q: "Do you handle permits?",
    a: "Yes. We assist with permits and approvals and guide you through the requirements for your area.",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2" data-testid="brand-arp">
      <div
        className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"
        data-testid="img-logo"
        aria-hidden
      >
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="leading-tight">
        <div className="arp-title text-[15px] font-semibold" data-testid="text-company-name">
          ARP Constructions
        </div>
        <div
          className="text-xs text-muted-foreground"
          data-testid="text-company-tagline"
        >
          Building with Integrity. Crafting with Precision.
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="sticky top-0 z-50">
      <div className="arp-grain arp-grid-bg">
        <div className="arp-container">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" data-testid="link-home" className="arp-focus-ring rounded-xl">
              <Logo />
            </Link>

            <div className="hidden items-center gap-1 lg:flex" data-testid="nav-desktop">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="arp-focus-ring rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  data-testid={`link-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2" data-testid="nav-cta">
              <Button asChild className="arp-focus-ring rounded-xl" data-testid="button-get-quote">
                <Link href="/quote" data-testid="link-quote">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-border/60" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card/70 px-4 py-3 shadow-sm" data-testid={`card-stat-${label}`}>
      <div className="arp-title text-2xl font-semibold" data-testid={`text-stat-value-${label}`}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${label}`}>
        {label}
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" data-testid="rating-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            "h-4 w-4 " +
            (i < rating ? "fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" : "text-muted")
          }
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

function QuoteInline() {
  const { toast } = useToast();
  const [projectType, setProjectType] = useState<string>("");

  const budgetOptions = useMemo(
    () => [
      "$10k\u2013$25k",
      "$25k\u2013$50k",
      "$50k\u2013$100k",
      "$100k+",
      "Not sure yet",
    ],
    [],
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({
      title: "Request received",
      description: "Thank you! We will contact you shortly.",
    });
    (e.currentTarget as HTMLFormElement).reset();
    setProjectType("");
  }

  return (
    <Card className="arp-glass rounded-3xl" data-testid="card-quote">
      <CardHeader>
        <CardTitle className="arp-title text-xl" data-testid="text-quote-title">
          Get a fast, detailed quote
        </CardTitle>
        <CardDescription data-testid="text-quote-subtitle">
          Tell us a bit about your project. Well follow up with next steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4" data-testid="form-quote">
          <div className="grid gap-2" data-testid="group-name">
            <Label htmlFor="fullName" data-testid="label-full-name">Full name</Label>
            <Input
              id="fullName"
              name="full_name"
              required
              placeholder="Your name"
              className="arp-focus-ring rounded-xl"
              data-testid="input-full-name"
            />
          </div>

          <div className="grid gap-2" data-testid="group-email">
            <Label htmlFor="email" data-testid="label-email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="arp-focus-ring rounded-xl"
              data-testid="input-email"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="grid-two">
            <div className="grid gap-2" data-testid="group-phone">
              <Label htmlFor="phone" data-testid="label-phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="(555) 123-4567"
                className="arp-focus-ring rounded-xl"
                data-testid="input-phone"
              />
            </div>

            <div className="grid gap-2" data-testid="group-location">
              <Label htmlFor="location" data-testid="label-location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="City / Suburb"
                className="arp-focus-ring rounded-xl"
                data-testid="input-location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="grid-selects">
            <div className="grid gap-2" data-testid="group-project-type">
              <Label data-testid="label-project-type">Project type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="arp-focus-ring rounded-xl" data-testid="select-project-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent data-testid="select-project-type-menu">
                  <SelectItem value="Residential" data-testid="select-project-type-residential">Residential</SelectItem>
                  <SelectItem value="Renovation" data-testid="select-project-type-renovation">Renovation</SelectItem>
                  <SelectItem value="Commercial" data-testid="select-project-type-commercial">Commercial</SelectItem>
                  <SelectItem value="Project Management" data-testid="select-project-type-pm">Project Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2" data-testid="group-budget">
              <Label data-testid="label-budget">Budget range</Label>
              <Select>
                <SelectTrigger className="arp-focus-ring rounded-xl" data-testid="select-budget">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent data-testid="select-budget-menu">
                  {budgetOptions.map((b) => (
                    <SelectItem
                      key={b}
                      value={b}
                      data-testid={`select-budget-${b.replaceAll("$", "").replaceAll("\u2013", "-").replaceAll(" ", "-")}`}
                    >
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2" data-testid="group-message">
            <Label htmlFor="message" data-testid="label-message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="What are you building? Any deadlines or details?"
              className="arp-focus-ring min-h-24 rounded-xl"
              data-testid="textarea-message"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row" data-testid="group-submit">
            <Button type="submit" className="arp-focus-ring rounded-xl" data-testid="button-submit-quote">
              Request a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="arp-focus-ring rounded-xl"
              data-testid="button-view-projects"
              asChild
            >
              <Link href="/projects" data-testid="link-view-projects">
                View Projects
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2" data-testid="list-badges">
            {badges.map((b) => (
              <Badge
                key={b}
                variant="secondary"
                className="rounded-full"
                data-testid={`badge-${b.toLowerCase().replaceAll(" ", "-")}`}
              >
                <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                {b}
              </Badge>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <TopNav />

      <main className="arp-grid-bg" data-testid="main-home">
        <section className="arp-grain relative overflow-hidden" data-testid="section-hero">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.26,
            }}
            aria-hidden
            data-testid="img-hero-bg"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background)) 72%)",
            }}
            aria-hidden
          />

          <div className="arp-container relative py-14 sm:py-18 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl"
                data-testid="hero-copy"
              >
                <div
                  className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
                  data-testid="badge-hero"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="arp-kicker" data-testid="text-hero-kicker">
                    Professional  b7 Trustworthy  b7 Premium
                  </span>
                </div>

                <h1
                  className="arp-title mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
                  data-testid="text-hero-headline"
                >
                  Crafting Quality Structures{" "}
                  <span className="arp-underline" data-testid="text-hero-emphasis">
                    That Stand the Test of Time
                  </span>
                </h1>

                <p className="mt-4 text-base text-muted-foreground sm:text-lg" data-testid="text-hero-subheadline">
                  Residential, Commercial & Renovation Experts You Can Trust.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-testid="hero-actions">
                  <Button
                    className="arp-focus-ring rounded-xl"
                    size="lg"
                    asChild
                    data-testid="button-hero-quote"
                  >
                    <Link href="/quote" data-testid="link-hero-quote">
                      Get a Quote
                    </Link>
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="arp-focus-ring rounded-xl"
                    asChild
                    data-testid="button-hero-projects"
                  >
                    <Link href="/projects" data-testid="link-hero-projects">
                      <span className="flex items-center gap-2">
                        View Projects <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" data-testid="grid-stats">
                  {stats.map((s) => (
                    <Stat key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
                data-testid="hero-form"
              >
                <QuoteInline />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="arp-container py-12 sm:py-14" data-testid="section-services">
          <div className="flex items-end justify-between gap-6" data-testid="services-header">
            <div className="max-w-xl">
              <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-services-kicker">
                Services
              </div>
              <h2 className="arp-title mt-2 text-3xl font-semibold" data-testid="text-services-title">
                Built to last. Managed to feel effortless.
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-services-subtitle">
                Clear planning, clean workmanship, and a finish that reads premium  every time.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="grid-services">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.title}
                  className="group rounded-3xl border bg-card/70 transition hover:-translate-y-0.5 hover:shadow-md"
                  data-testid={`card-service-${s.title}`}
                >
                  <CardHeader>
                    <div
                      className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-background shadow-sm"
                      data-testid={`icon-${s.title}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <CardTitle className="arp-title text-lg" data-testid={`text-service-title-${s.title}`}>
                      {s.title}
                    </CardTitle>
                    <CardDescription data-testid={`text-service-desc-${s.title}`}>
                      {s.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={s.href}
                      data-testid={`link-service-${s.title}`}
                      className="arp-focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-medium"
                    >
                      Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="arp-container py-12 sm:py-14" data-testid="section-how">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div data-testid="how-copy">
              <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-how-kicker">
                How it works
              </div>
              <h2 className="arp-title mt-2 text-3xl font-semibold" data-testid="text-how-title">
                A calm, predictable process.
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-how-subtitle">
                We keep things transparent and proactive so your project moves forward with confidence.
              </p>

              <div className="mt-5 flex flex-wrap gap-2" data-testid="how-badges">
                <Badge variant="secondary" className="rounded-full" data-testid="badge-process-communication">
                  Transparent communication
                </Badge>
                <Badge variant="secondary" className="rounded-full" data-testid="badge-process-timelines">
                  Clear timelines
                </Badge>
                <Badge variant="secondary" className="rounded-full" data-testid="badge-process-quality">
                  Quality checks
                </Badge>
              </div>
            </div>

            <div className="grid gap-3" data-testid="how-steps">
              {steps.map((st, idx) => (
                <Card
                  key={st.title}
                  className="rounded-3xl border bg-card/70 shadow-sm"
                  data-testid={`card-step-${idx + 1}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-4" data-testid={`row-step-${idx + 1}`}>
                      <CardTitle className="arp-title text-lg" data-testid={`text-step-title-${idx + 1}`}>
                        {idx + 1}. {st.title}
                      </CardTitle>
                      <Badge className="rounded-full" variant="secondary" data-testid={`badge-step-${idx + 1}`}>
                        {st.title}
                      </Badge>
                    </div>
                    <CardDescription data-testid={`text-step-desc-${idx + 1}`}>
                      {st.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="arp-container py-12 sm:py-14" data-testid="section-projects">
          <div className="flex items-end justify-between gap-6" data-testid="projects-header">
            <div className="max-w-xl">
              <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-projects-kicker">
                Featured projects
              </div>
              <h2 className="arp-title mt-2 text-3xl font-semibold" data-testid="text-projects-title">
                Proof in the details.
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-projects-subtitle">
                A quick look at the kind of work we deliver across residential, renovation, and commercial.
              </p>
            </div>
            <Button variant="secondary" className="hidden rounded-xl lg:inline-flex" asChild data-testid="button-projects-all">
              <Link href="/projects" data-testid="link-projects-all">
                View all
              </Link>
            </Button>
          </div>

          <div className="relative mt-7" data-testid="carousel-projects">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {featuredProjects.map((p) => (
                  <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3" data-testid={`slide-project-${p.id}`}>
                    <Card className="rounded-3xl border bg-card/70 shadow-sm" data-testid={`card-project-${p.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4" data-testid={`row-project-${p.id}`}>
                          <div>
                            <CardTitle className="arp-title text-lg" data-testid={`text-project-title-${p.id}`}>
                              {p.title}
                            </CardTitle>
                            <CardDescription className="mt-1 flex flex-wrap items-center gap-2" data-testid={`text-project-meta-${p.id}`}>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" /> {p.location}
                              </span>
                              <span className="text-muted-foreground/60">7</span>
                              <span className="inline-flex items-center gap-1">
                                <Hammer className="h-3.5 w-3.5" /> {p.category}
                              </span>
                            </CardDescription>
                          </div>
                          <Badge className="rounded-full" data-testid={`badge-project-${p.id}`}>
                            {p.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground" data-testid={`text-project-desc-${p.id}`}>
                          {p.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious data-testid="button-projects-prev" />
              <CarouselNext data-testid="button-projects-next" />
            </Carousel>
          </div>
        </section>

        <section className="arp-container py-12 sm:py-14" data-testid="section-testimonials">
          <div className="flex items-end justify-between gap-6" data-testid="testimonials-header">
            <div className="max-w-xl">
              <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-testimonials-kicker">
                Testimonials
              </div>
              <h2 className="arp-title mt-2 text-3xl font-semibold" data-testid="text-testimonials-title">
                Trusted by clients who care about craft.
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-testimonials-subtitle">
                The consistent theme: integrity, communication, and precision.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3" data-testid="grid-testimonials">
            {testimonials.map((t) => (
              <Card key={t.id} className="rounded-3xl border bg-card/70 shadow-sm" data-testid={`card-testimonial-${t.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3" data-testid={`row-testimonial-${t.id}`}>
                    <div>
                      <CardTitle className="arp-title text-lg" data-testid={`text-testimonial-name-${t.id}`}>
                        {t.name}
                      </CardTitle>
                      <CardDescription data-testid={`text-testimonial-type-${t.id}`}>
                        {t.type}
                      </CardDescription>
                    </div>
                    <Stars rating={t.rating} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-review-${t.id}`}>
                    c{t.review}d
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="arp-container py-12 sm:py-14" data-testid="section-faq">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div data-testid="faq-copy">
              <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-faq-kicker">
                FAQs
              </div>
              <h2 className="arp-title mt-2 text-3xl font-semibold" data-testid="text-faq-title">
                Quick answers.
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-faq-subtitle">
                If you have a unique scenario, reach out and well guide you.
              </p>
            </div>

            <Card className="rounded-3xl border bg-card/70 shadow-sm" data-testid="card-faq">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible data-testid="accordion-faq">
                  {faqs.map((f, idx) => (
                    <AccordionItem key={f.q} value={`item-${idx}`} data-testid={`faq-item-${idx}`}>
                      <AccordionTrigger className="text-left" data-testid={`faq-trigger-${idx}`}>
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent data-testid={`faq-content-${idx}`}>
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="arp-container pb-16" data-testid="section-final-cta">
          <div className="arp-grain rounded-3xl border bg-card/70 p-8 shadow-sm sm:p-10" data-testid="card-final-cta">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center" data-testid="row-final-cta">
              <div>
                <div className="arp-kicker text-xs text-muted-foreground" data-testid="text-final-kicker">
                  Ready to start?
                </div>
                <h3 className="arp-title mt-2 text-2xl font-semibold" data-testid="text-final-title">
                  Ready to Start Your Project?
                </h3>
                <p className="mt-2 text-muted-foreground" data-testid="text-final-subtitle">
                  Request a free consultation and get a clear plan, timeline, and budget range.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row" data-testid="final-actions">
                <Button className="rounded-xl" asChild data-testid="button-final-quote">
                  <Link href="/quote" data-testid="link-final-quote">
                    Request a Free Consultation
                  </Link>
                </Button>
                <Button variant="secondary" className="rounded-xl" asChild data-testid="button-final-contact">
                  <Link href="/contact" data-testid="link-final-contact">
                    Contact
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-3" data-testid="grid-contact-mini">
              <div className="flex items-center gap-3" data-testid="contact-mini-phone">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm" aria-hidden>
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-sm font-medium" data-testid="text-phone-label">Phone</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-phone-value">+1-XXX-XXX-XXXX</div>
                </div>
              </div>
              <div className="flex items-center gap-3" data-testid="contact-mini-email">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm" aria-hidden>
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-sm font-medium" data-testid="text-email-label">Email</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-email-value">info@arpconstructions.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3" data-testid="contact-mini-address">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm" aria-hidden>
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-sm font-medium" data-testid="text-hours-label">Office hours</div>
                  <div className="text-sm text-muted-foreground" data-testid="text-hours-value">MonFri, 9am5pm</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t bg-background" data-testid="footer">
          <div className="arp-container py-10">
            <div className="grid gap-8 lg:grid-cols-3" data-testid="footer-grid">
              <div data-testid="footer-brand">
                <Logo />
                <p className="mt-3 max-w-sm text-sm text-muted-foreground" data-testid="text-footer-desc">
                  ARP Constructions delivers premium residential, renovation, and commercial work with a focus on integrity,
                  precision, and long-term value.
                </p>
              </div>

              <div className="grid gap-2" data-testid="footer-links">
                <div className="text-sm font-medium" data-testid="text-footer-links-title">Explore</div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {nav.slice(1, 7).map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      data-testid={`link-footer-${n.label.toLowerCase().replaceAll(" ", "-")}`}
                      className="arp-focus-ring rounded-lg hover:text-foreground"
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid gap-3" data-testid="footer-contact">
                <div className="text-sm font-medium" data-testid="text-footer-contact-title">Contact</div>
                <div className="grid gap-2 text-sm text-muted-foreground" data-testid="footer-contact-list">
                  <div className="inline-flex items-center gap-2" data-testid="footer-phone">
                    <Phone className="h-4 w-4" /> <span>+1-XXX-XXX-XXXX</span>
                  </div>
                  <div className="inline-flex items-center gap-2" data-testid="footer-email">
                    <Mail className="h-4 w-4" /> <span>info@arpconstructions.com</span>
                  </div>
                  <div className="inline-flex items-center gap-2" data-testid="footer-location">
                    <MapPin className="h-4 w-4" /> <span>MonFri, 9am5pm</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-10 flex flex-col justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row"
              data-testid="footer-bottom"
            >
              <div data-testid="text-copyright">© {new Date().getFullYear()} ARP Constructions. All rights reserved.</div>
              <div className="inline-flex items-center gap-2" data-testid="footer-note">
                <Badge variant="secondary" className="rounded-full" data-testid="badge-footer-licensed">
                  Licensed
                </Badge>
                <Badge variant="secondary" className="rounded-full" data-testid="badge-footer-insured">
                  Insured
                </Badge>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
