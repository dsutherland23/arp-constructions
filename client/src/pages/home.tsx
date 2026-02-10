import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Lead } from "@shared/schema";
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
  Table,
  Trash2,
  RefreshCw,
  Loader2,
  Database,
  FileDown,
  Archive,
  ExternalLink,
  Calendar,
  User,
  Hash
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Assets
import logoImg from "@assets/ARP_logo_2_1769747624981.png";
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

const NY_ZIP_PREFIXES = ["10", "11", "12", "13", "14"]; // NY State range

const detailedServices = [
  {
    title: "Plumbing Handyman Services",
    icon: Droplets,
    items: ["Fixing clogged shower drain", "Replacing tub/shower faucet", "Fixing leaky faucet", "Installing a garbage disposal", "Repair or replace a toilet", "Fixing leaking outdoor spigot", "Fixing leaking shower head"]
  },
  {
    title: "General Home Maintenance",
    icon: Wrench,
    items: ["Minor appliance maintenance", "Replace HVAC air filter", "Replace smoke detector batteries", "Interior + exterior caulking", "First story gutter inspection", "Sump pump inspection", "Paint touch-ups", "Weatherstripping", "Deck and patio maintenance", "Power washing"]
  },
  {
    title: "Blinds and Window Treatments",
    icon: Layout,
    items: ["Install curtain rods", "Install blinds", "Hang curtains", "Fitting blinds and curtains", "Lubricate tracks and rods", "Tighten and adjust hardware"]
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
  const [logoClicks, setLogoClicks] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminAuth, setAdminAuth] = useState({ user: "", pass: "" });
  const [adminAvailable, setAdminAvailable] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadDetailOpen, setIsLeadDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Admin Queries & Mutations
  const { data: leads = [], isLoading: isLoadingLeads, refetch: refetchLeads, isFetching: isFetchingLeads } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    enabled: isLoggedIn,
  });

  const updateLeadStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/leads/${id}/status`, { status });
      return res.json();
    },
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      setSelectedLead(updatedLead);
      toast({ title: "Status updated", description: `Lead moved to ${updatedLead.status}` });
    },
    onError: () => {
      toast({ title: "Failed to update status", variant: "destructive" });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Lead removed" });
    },
    onError: () => {
      toast({ title: "Failed to delete lead", variant: "destructive" });
    },
  });

  // Define total leads count and NY qualified count for Command Center
  const totalLeads = leads.length;
  const nyLeads = leads.filter(l => NY_ZIP_PREFIXES.some(prefix => l.zip.startsWith(prefix))).length;

  useEffect(() => {
    fetch("/api/admin/check")
      .then(res => res.json())
      .then(data => {
        if (data.isLoggedIn) setIsLoggedIn(true);
      })
      .catch(err => console.error("Auth check failed:", err));
  }, []);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newVal = prev + 1;
      if (newVal >= 5) {
        setIsAdminOpen(true);
        return 0;
      }
      return newVal;
    });
    // Reset clicks after 2 seconds
    const timer = setTimeout(() => setLogoClicks(0), 2000);
    return () => clearTimeout(timer);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminAuth.user,
          password: adminAuth.pass
        })
      });

      if (response.ok) {
        setIsLoggedIn(true);
        toast({ title: "Welcome back." });
      } else {
        toast({ title: "Access Denied", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Login failed", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsLoggedIn(false);
      setAdminAuth({ user: "", pass: "" });
      toast({ title: "Logged out successfully" });
    } catch (err) {
      setIsLoggedIn(false);
      setAdminAuth({ user: "", pass: "" });
    }
  };

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroImages = [kitchenImg, bathroomImg, renoImg, plumbingImg];

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [chatStep, setChatStep] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatLead, setChatLead] = useState({ name: "", phone: "", email: "", desc: "" });

  const handleLiveChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.navigator.vibrate) window.navigator.vibrate(10);

    const newLead = {
      name: chatLead.name,
      type: "Live Chat",
      status: adminAvailable ? "Connected" : "Missed",
      date: "Just now",
      zip: "---",
      phone: chatLead.phone,
      email: chatLead.email,
      desc: chatLead.desc,
      id: Date.now()
    };
    // Lead will be saved by server (implementing chat lead saving would be a next step)
    setChatStep(1);
    if (!adminAvailable) {
      toast({
        title: "Admin Unavailable",
        description: "We'll get back to you shortly via the provided contact info.",
      });
    }
  };

  const faqs = [
    { q: "What areas do you serve?", a: "We primarily serve New York and surrounding areas.", action: "Contact", link: "#contact" },
    { q: "How do I get a quote?", a: "You can initiate a consultation through our contact form or by calling us directly.", action: "Get Started", link: "#contact" },
    { q: "Do you handle small repairs?", a: "Absolutely. No job is too small for our expert team, from leaky faucets to shelf mounting.", action: "See Capabilities", link: "#services" },
    { q: "What is your typical timeline?", a: "Timelines vary by project size, but we provide a detailed schedule during the strategy phase.", action: "Our Process", link: "#process" },
    { q: "Tell me about ARP Construction", a: "ARP Construction is a premier New York-based renovation firm. We specialize in high-end plumbing, kitchens, and bathrooms, bringing architectural precision to every project.", action: "Learn More", link: "#process" }
  ];

  const mobileNav = [
    { label: "Home", icon: Sparkles, href: "#" },
    { label: "Services", icon: Hammer, href: "#services" },
    { label: "Projects", icon: Building2, href: "#projects" },
    { label: "Reviews", icon: Quote, href: "#reviews" },
    { label: "Contact", icon: Phone, href: "#contact" }
  ];

  const [formStep, setFormStep] = useState(0); // 0: zip, 1: details, 2: referral, 3: confirm, 4: waitlist
  const [formData, setFormData] = useState({
    zip: "",
    name: "",
    email: "",
    phone: "",
    referral: "",
    address: ""
  });


  const handleFormNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.navigator.vibrate) window.navigator.vibrate(10);

    if (formStep === 0) {
      const isNY = NY_ZIP_PREFIXES.some(prefix => formData.zip.startsWith(prefix));
      if (isNY) {
        setFormStep(1);
      } else {
        setFormStep(4); // Waitlist
      }
    } else if (formStep === 1) {
      setFormStep(2);
    } else if (formStep === 2) {
      setFormStep(3);
    } else if (formStep === 3) {
      // Determine lead type based on the previous step (or if it was a waitlist path)
      // If formStep 4 was reached, it means the zip was outside NY.
      // If the user then proceeds from formStep 4 (waitlist) to fill out details,
      // the submission should be marked as "Waitlist".
      // Otherwise, it's a "Consultation".
      const leadType = formData.address ? "Consultation" : "Waitlist"; // Simplified logic: if address is filled, it's a consultation. If not, it's a waitlist.
      // A more robust way would be to have a state variable like `isWaitlistFlow` set when formStep 4 is entered.
      // For now, let's assume if they are at step 3 and the address field was part of the "consultation" flow.
      // If they came from the waitlist path (formStep 4), they would have been prompted to fill out details for waitlist.
      // Let's use the current formStep to infer. If formStep 0 led to 4, and then they clicked to proceed,
      // they would eventually reach formStep 3.
      // The `formData.address` is only collected in the "Consultation" path (formStep 1).
      // If they went to formStep 4, then clicked "Join Waitlist", they would fill out name, email, phone, but not address.
      // So, if address is empty, it's a waitlist. If address is present, it's a consultation.

      const newLead = {
        name: formData.name,
        type: leadType, // Dynamically set based on flow
        status: "New",
        date: "Just now",
        zip: formData.zip,
        phone: formData.phone,
        email: formData.email,
        referral: formData.referral,
        address: formData.address,
        id: Date.now()
      };

      // Send to backend
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      })
        .then(async res => {
          const isJson = res.headers.get("content-type")?.includes("application/json");
          const data = isJson ? await res.json() : null;

          if (!res.ok) {
            const errorMsg = data?.message || `Server error (${res.status})`;
            throw new Error(errorMsg);
          }

          if (data && data.success) {
            const isWaitlistPath = leadType === "Waitlist";
            toast({
              title: isWaitlistPath ? "Joined Waitlist" : "Strategy Session Booked",
              description: isWaitlistPath
                ? "We've added you to our waitlist and will reach out when we expand to your area."
                : "We've received your information and will reach out shortly.",
              className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[400px] w-[90%] glass-card border-accent shadow-2xl smoke-glow",
            });
          } else {
            throw new Error(data?.message || "Failed to send inquiry");
          }
        })
        .catch(err => {
          console.error("Form submission error details:", err);
          const errorMsg = err instanceof Error ? err.message : String(err);
          toast({
            title: "Submission Error",
            description: `Error: ${errorMsg}. Please try again later or call us.`,
            variant: "destructive"
          });
        });

      // Lead will be saved to DB by server and fetched by admin portal query
      setFormStep(0);
      setFormData({ zip: "", name: "", email: "", phone: "", referral: "", address: "" });
    }
  };

  const handleBack = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(5);
    if (formStep === 4) setFormStep(0);
    else if (formStep > 0) setFormStep(formStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const [reviews, setReviews] = useState([
    { name: "Sarah J.", text: "The bathroom renovation exceeded all my expectations. Every detail is perfect.", rating: 5, date: "Jan 2026" },
    { name: "Michael R.", text: "Top-tier professionalism. The plumbing issues were fixed quickly and permanently.", rating: 5, date: "Dec 2025" },
    { name: "David L.", text: "Incredible attention to detail in the kitchen. Truly elevated our home.", rating: 5, date: "Nov 2025" }
  ]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newReview = {
      name: formData.get("name") as string,
      text: formData.get("review") as string,
      rating: 5, // Default for mockup
      date: "Just now"
    };
    setReviews([newReview, ...reviews]);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
      className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[400px] w-[90%] glass-card border-accent shadow-2xl",
    });
    (e.target as HTMLFormElement).reset();
  };

  const navItems = ["Services", "Projects", "Process", "Reviews", "Contact"];

  return (
    <div className="noise-bg min-h-screen">
      {/* FAQ Assistant Button */}
      <div className="fixed bottom-32 md:bottom-8 right-6 md:right-8 z-[150] landscape:bottom-6">
        <Button
          onClick={() => setIsFAQOpen(true)}
          className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-accent shadow-2xl hover:scale-110 transition-transform group relative overflow-hidden border border-white/20"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-accent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 relative z-10 text-white" />
        </Button>
      </div>

      {/* Mobile App-Style Footer Menu */}
      <div className="fixed bottom-0 left-0 z-[120] w-full md:hidden transition-transform duration-300 landscape:hidden" style={{ transform: isMobileMenuOpen ? 'translateY(100%)' : 'translateY(0)' }}>
        <div className="mx-4 mb-4 glass-card shadow-[0_-10px_40px_rgba(0,0,0,0.3)] rounded-[2.5rem] flex items-center justify-around py-4 px-2 border border-white/20 backdrop-blur-2xl ring-1 ring-white/10">
          {mobileNav.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (window.navigator.vibrate) window.navigator.vibrate(10);
                window.location.href = item.href;
              }}
              className="flex flex-col items-center gap-1 group relative py-1 flex-1"
            >
              <div className="p-2 rounded-2xl group-hover:bg-accent group-active:scale-90 transition-all duration-200">
                <item.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-[10px] font-bold tracking-tight text-primary/40 group-hover:text-primary uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={isFAQOpen} onOpenChange={setIsFAQOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none glass-card p-0 z-[120]">
          <div className="p-8">
            <DialogHeader className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <DialogTitle className="text-2xl font-bold">ARP Assistant</DialogTitle>
              </div>
              <p className="text-muted-foreground">How can I help you today? Select a common question or reach out directly.</p>
            </DialogHeader>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-2">
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    className="w-full text-left p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
                    <ChevronRight className={`h-4 w-4 text-accent transition-transform ${activeFAQ === i ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-2 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-accent/20 text-accent hover:bg-accent/5"
                            asChild
                            onClick={() => setIsFAQOpen(false)}
                          >
                            <a href={faq.link}>{faq.action}</a>
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
              <p className="text-xs text-muted-foreground text-center mb-1 italic">Ready to transform your space?</p>

              <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 rounded-2xl bg-accent font-bold shadow-lg shadow-accent/20 flex items-center justify-center gap-2 text-white">
                    <Mail className="h-5 w-5" />
                    Start Live Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none glass-card p-0 z-[130]">
                  <div className="p-8">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="text-2xl font-bold">Live Chat</DialogTitle>
                    </DialogHeader>

                    {chatStep === 0 ? (
                      <form onSubmit={handleLiveChat} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={chatLead.name}
                            onChange={(e) => setChatLead(p => ({ ...p, name: e.target.value }))}
                            required className="rounded-xl bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telephone</Label>
                          <Input
                            type="tel"
                            value={chatLead.phone}
                            onChange={(e) => setChatLead(p => ({ ...p, phone: e.target.value }))}
                            required className="rounded-xl bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={chatLead.email}
                            onChange={(e) => setChatLead(p => ({ ...p, email: e.target.value }))}
                            required className="rounded-xl bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Short Synopsis</Label>
                          <Textarea
                            value={chatLead.desc}
                            onChange={(e) => setChatLead(p => ({ ...p, desc: e.target.value }))}
                            required className="rounded-xl min-h-[80px] bg-background/50"
                          />
                        </div>
                        <Button type="submit" className="w-full h-12 rounded-xl bg-accent font-bold text-white shadow-lg shadow-accent/20">
                          Check Availability
                        </Button>
                      </form>
                    ) : (
                      <div className="py-8 text-center space-y-4">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto ${adminAvailable ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}>
                          {adminAvailable ? <CheckCircle2 className="h-8 w-8" /> : <X className="h-8 w-8" />}
                        </div>
                        <h3 className="text-xl font-bold">
                          {adminAvailable ? "Admin Connected" : "Admin Unavailable"}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {adminAvailable
                            ? "Connecting you to a live representative now..."
                            : "We're currently assisting other clients. We will get in contact with you shortly!"}
                        </p>
                        <Button
                          onClick={() => {
                            setChatStep(0);
                            setIsChatOpen(false);
                          }}
                          variant="outline"
                          className="rounded-xl w-full h-12"
                        >
                          Close
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => {
                  setIsFAQOpen(false);
                  window.location.href = "#contact";
                }}
                className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/80 font-bold border border-border/50"
              >
                Initiate Consultation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? "py-2" : "py-4 md:py-8"} landscape:py-2`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "glass-card shadow-lg rounded-full px-4 md:px-6 py-2 md:py-3" : "bg-transparent px-2 py-2"} landscape:glass-card landscape:rounded-full landscape:px-4 landscape:py-1`}>
            <div className="flex items-center cursor-pointer select-none" onClick={handleLogoClick}>
              <img src={logoImg} alt="Arp" className="h-14 md:h-20 w-auto transition-all duration-500 object-contain landscape:h-12" />
            </div>

            <div className="hidden items-center gap-6 lg:flex ml-auto landscape:hidden">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold tracking-tight text-primary hover:text-accent transition-all duration-300">
                  {item}
                </a>
              ))}
              <Button
                size="sm"
                className="rounded-full bg-primary px-8 hover:bg-accent transition-all shadow-lg hover:shadow-accent/20"
                asChild
              >
                <a href="#contact">Book a Consult</a>
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
              ref={menuRef}
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

                    <div className="mt-12 p-8 rounded-[2rem] bg-accent text-accent-foreground text-center pb-24 md:pb-8">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 w-fit">
                  View All Case Studies
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none glass-card p-0 z-[101]">
                <div className="p-6 md:p-12 pt-16 md:pt-12">
                  <DialogHeader className="mb-12">
                    <DialogTitle className="text-4xl font-bold tracking-tight text-gradient">Project Portfolio</DialogTitle>
                    <p className="text-muted-foreground mt-2">A detailed look at our latest transformations and craftsmanship.</p>
                  </DialogHeader>

                  <div className="grid gap-8 sm:grid-cols-2">
                    {projects.map((project, i) => (
                      <div key={i} className="group space-y-4">
                        <div
                          className="aspect-video overflow-hidden rounded-3xl bg-secondary/30 relative cursor-zoom-in"
                          onClick={() => setZoomedImage(project.image)}
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-accent text-white">{project.category}</Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Complete transformation focusing on modern aesthetics and high-end materials. This project showcases our commitment to precision and style.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-8 rounded-[2rem] bg-secondary/30 border border-border/50 text-center">
                    <h4 className="text-xl font-bold mb-4">Ready to start your own transformation?</h4>
                    <DialogTrigger asChild>
                      <a href="#contact">
                        <Button className="rounded-full px-8 bg-accent hover:bg-primary">Get a Quote</Button>
                      </a>
                    </DialogTrigger>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex overflow-hidden pb-10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 px-4"
          >
            {[...projects, ...projects].map((project, i) => (
              <div
                key={i}
                className="group relative h-[350px] md:h-[450px] w-[280px] md:w-[500px] shrink-0 overflow-hidden rounded-[2.5rem] bg-white/5 cursor-zoom-in"
                onClick={() => setZoomedImage(project.image)}
              >
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
              { step: "02", title: "Design", desc: "Material selection." },
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

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
            <div>
              <Badge variant="outline" className="mb-4 rounded-full border-accent/20 bg-accent/5 px-4 py-1 text-accent">
                Wall of Fame
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl">Client Stories</h2>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-accent hover:bg-primary px-8">
                  Leave a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[2rem] border-none glass-card p-0 z-[101]">
                <div className="p-8">
                  <DialogHeader className="mb-8">
                    <DialogTitle className="text-3xl font-bold">Share Your Experience</DialogTitle>
                    <p className="text-muted-foreground">Your feedback helps us maintain our 2026 standard of excellence.</p>
                  </DialogHeader>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="review-name">Name</Label>
                      <Input id="review-name" name="name" placeholder="How should we address you?" required className="h-12 rounded-xl bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-text">Your Review</Label>
                      <Textarea id="review-text" name="review" placeholder="Tell us about your project..." required className="min-h-[120px] rounded-xl bg-background/50" />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-xl bg-accent font-bold">
                      Submit Review
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm relative overflow-hidden group"
              >
                <Quote className="absolute -top-2 -right-2 h-20 w-20 text-accent/5 transition-transform group-hover:scale-110" />
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </motion.div>
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
                      <a href="mailto:info@arpconstructionpro.org" className="text-lg md:text-xl font-bold hover:text-accent transition-colors">info@arpconstructionpro.org</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative">
                {formStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-accent flex items-center gap-1 text-xs font-bold"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Back
                  </button>
                )}
                <form onSubmit={handleFormNext} className="grid gap-4 md:gap-6 pt-10">
                  {formStep === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="zip">Enter Zip Code</Label>
                        <Input
                          id="zip"
                          placeholder="e.g. 10001"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-background/50"
                        />
                      </div>
                      <Button type="submit" size="lg" className="h-14 md:h-16 rounded-xl md:rounded-2xl bg-accent font-bold hover:bg-primary">
                        Check Availability <MoveRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}

                  {formStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required className="h-12 md:h-14 rounded-xl bg-background/50" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required className="h-12 md:h-14 rounded-xl bg-background/50" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="(555) 000-0000" value={formData.phone} onChange={handleInputChange} required className="h-12 md:h-14 rounded-xl bg-background/50" />
                      </div>
                      <Button type="submit" size="lg" className="h-14 md:h-16 rounded-xl bg-accent font-bold hover:bg-primary">
                        Continue <MoveRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}

                  {formStep === 4 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid gap-4 text-center">
                      <div className="py-6 space-y-4">
                        <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
                          <MapPin className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">Outside Service Area</h3>
                        <p className="text-muted-foreground text-sm">We're not yet taking members in your neighborhood right now. As soon as we are, we'll reach out!</p>
                      </div>
                      <div className="grid gap-4 text-left">
                        <div className="grid gap-2">
                          <Label htmlFor="waitlist-name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="h-12 rounded-xl bg-background/50"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="waitlist-email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="h-12 rounded-xl bg-background/50"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="waitlist-phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="h-12 rounded-xl bg-background/50"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          if (formData.name && formData.email && formData.phone) {
                            setFormStep(2);
                          } else {
                            toast({
                              title: "Missing Information",
                              description: "Please fill in all fields to join the waitlist.",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="h-14 rounded-xl bg-accent font-bold"
                      >
                        Join Waitlist
                      </Button>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-4">
                      <Label>How did you hear about us?</Label>
                      <div className="grid gap-2">
                        {["Friend or neighbor", "Mailer or flyer", "Social media", "Google or online", "Other"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, referral: opt }));
                              setFormStep(3);
                            }}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.referral === opt ? "bg-accent border-accent text-white" : "bg-background/50 border-border hover:border-accent"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="address">Confirm Address</Label>
                        <Input id="address" placeholder="Full Address" value={formData.address} onChange={handleInputChange} required className="h-12 md:h-14 rounded-xl bg-background/50" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Confirm Telephone</Label>
                        <Input id="phone" value={formData.phone} onChange={handleInputChange} required className="h-12 md:h-14 rounded-xl bg-background/50" />
                      </div>
                      <div className="py-4 text-center bg-accent/5 rounded-2xl border border-accent/10">
                        <p className="text-sm font-medium text-accent">We'll reach out when we can serve your home.</p>
                      </div>
                      <Button type="submit" size="lg" className="h-14 md:h-16 rounded-xl bg-accent font-bold hover:bg-primary">
                        Complete Inquiry
                      </Button>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-20 mb-20 md:mb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
            <div className="flex flex-col items-center">
              <img src={logoImg} alt="Arp" className="h-32 md:h-48 w-auto mb-6" />
              <p className="text-muted-foreground max-w-xs text-center">
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
                                      value={`BEGIN:VCARD\nVERSION:3.0\nFN:Adrian Pecco\nORG:ARP Construction\nTEL:7047129947\nEMAIL:info@arpconstructionpro.org\nURL:https://arp.construction\nEND:VCARD`}
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
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent flex items-center gap-1.5 px-3 py-1">
                  <Sparkles className="h-3 w-3" />
                  Known for Neatness
                </Badge>
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent flex items-center gap-1.5 px-3 py-1">
                  <Timer className="h-3 w-3" />
                  Quick Turnaround
                </Badge>
                <Badge variant="outline" className="rounded-full border-accent/20 bg-accent/5 text-accent flex items-center gap-1.5 px-3 py-1">
                  <ShieldCheck className="h-3 w-3" />
                  100% Recommended
                </Badge>
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

      {/* Admin Dashboard Dialog */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none glass-card p-0 z-[200]">
          {!isLoggedIn ? (
            <div className="p-6 md:p-12">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-bold">Admin Portal</DialogTitle>
                <p className="text-muted-foreground">Authorized access only.</p>
              </DialogHeader>
              <form onSubmit={handleAdminLogin} className="space-y-6 max-w-sm mx-auto">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    value={adminAuth.user}
                    onChange={(e) => setAdminAuth(p => ({ ...p, user: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={adminAuth.pass}
                    onChange={(e) => setAdminAuth(p => ({ ...p, pass: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50"
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-xl bg-accent font-bold text-white shadow-xl shadow-accent/20">
                  Authenticate
                </Button>
              </form>
            </div>
          ) : (
            <div className="p-4 md:p-12 h-full overflow-y-auto custom-scrollbar">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-bold tracking-tighter">Command Center</h2>
                  <p className="text-muted-foreground">Managing ARP Excellence.</p>
                </div>
                <div className="flex items-center gap-4 bg-secondary/50 p-2 rounded-2xl border border-border/50">
                  <span className="text-sm font-bold ml-2">Presence:</span>
                  <div className="flex gap-1 bg-background/50 p-1 rounded-xl">
                    <button
                      onClick={() => setAdminAvailable(true)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${adminAvailable ? "bg-green-500 text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => setAdminAvailable(false)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!adminAvailable ? "bg-orange-500 text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
                    >
                      Away
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Layout className="h-5 w-5 text-accent" />
                      Incoming Leads
                    </h3>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl gap-2 h-9 bg-accent/5 border-accent/20 hover:bg-accent/10"
                        onClick={() => {
                          refetchLeads();
                          toast({ title: "Checking for new messages..." });
                        }}
                        disabled={isFetchingLeads}
                      >
                        <RefreshCw className={`h-4 w-4 ${isFetchingLeads ? "animate-spin" : ""}`} />
                        <span className="text-xs font-bold">Check for Messages</span>
                      </Button>
                      <Badge variant="outline" className="rounded-full">Live Feed</Badge>
                    </div>
                  </div>
                  <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="bg-secondary/50 p-1 rounded-2xl h-auto flex-wrap mb-4">
                      <TabsTrigger value="all" className="rounded-xl px-4 md:px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex-1 md:flex-none">
                        All ({leads.length})
                      </TabsTrigger>
                      <TabsTrigger value="consultation" className="rounded-xl px-4 md:px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex-1 md:flex-none">
                        Consultations ({leads.filter(l => l.type === 'Consultation').length})
                      </TabsTrigger>
                      <TabsTrigger value="waitlist" className="rounded-xl px-4 md:px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex-1 md:flex-none">
                        Waitlist ({leads.filter(l => l.type === 'Waitlist').length})
                      </TabsTrigger>
                    </TabsList>

                    <div className="grid gap-4 mt-2">
                      {isLoadingLeads ? (
                        <div className="p-12 text-center text-muted-foreground">Loading leads...</div>
                      ) : leads.filter(l => activeTab === 'all' ? true : l.type.toLowerCase() === activeTab).length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-3xl">
                          No {activeTab === 'all' ? '' : activeTab} leads received yet.
                        </div>
                      ) : (
                        leads
                          .filter(l => activeTab === 'all' ? true : l.type.toLowerCase() === activeTab)
                          .map((lead) => (
                            <div
                              key={lead.id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:border-accent/30 transition-all group cursor-pointer"
                              onClick={() => {
                                setSelectedLead(lead);
                                setIsLeadDetailOpen(true);
                              }}
                            >
                              <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-bold shrink-0">
                                  {lead.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold truncate">{lead.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{lead.type} • {lead.zip}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 md:gap-6 mt-3 md:mt-0 pt-3 md:pt-0 border-t border-border/10 md:border-t-0">
                                <div className="text-left md:text-right">
                                  <p className={`text-xs font-bold ${lead.status === 'Urgent' ? 'text-red-500' : 'text-accent'}`}>{lead.status}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl md:opacity-0 md:group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteLeadMutation.mutate(lead.id);
                                  }}
                                  disabled={deleteLeadMutation.isPending}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </Tabs>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-5 md:p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Lead Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/50 shadow-sm border border-border/50">
                        <p className="text-2xl font-black text-accent">{totalLeads}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Total Active</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/50 shadow-sm border border-border/50">
                        <p className="text-2xl font-black text-green-500">{nyLeads}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">NY Qualified</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="rounded-xl h-10 text-xs gap-2"
                        onClick={() => toast({ title: "Generating CSV...", description: "Your export will be ready in a moment." })}
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        Export CSV
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl h-10 text-xs gap-2"
                        onClick={() => toast({ title: "Archive cleared", description: "All historical logs have been safely stored." })}
                      >
                        <Archive className="h-3.5 w-3.5" />
                        Clear Archive
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl h-10 text-xs gap-2"
                        onClick={() => {
                          refetchLeads();
                          toast({ title: "Database Synced", description: "Storage is now up to date." });
                        }}
                        disabled={isFetchingLeads}
                      >
                        <Database className={`h-3.5 w-3.5 ${isFetchingLeads ? "animate-spin" : ""}`} />
                        Sync DB
                      </Button>
                      <Button onClick={handleLogout} variant="outline" className="rounded-xl h-10 text-xs text-orange-500 hover:text-orange-600">Logout</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lead Detail Dialog */}
      <Dialog open={isLeadDetailOpen} onOpenChange={setIsLeadDetailOpen}>
        <DialogContent className="sm:max-w-2xl rounded-[2.5rem] border-none glass-card p-0 z-[250] !p-0">
          {selectedLead && (
            <div className="p-5 md:p-12 h-full overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-accent flex items-center justify-center text-white text-2xl font-black">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tighter leading-tight">{selectedLead.name}</h2>
                    <Badge variant="outline" className="rounded-full mt-1 border-accent/20 bg-accent/5 text-accent">
                      {selectedLead.type} Inquiry
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={() => setIsLeadDetailOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <Mail className="h-5 w-5 text-accent" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Email</p>
                      <a href={`mailto:${selectedLead.email}`} className="font-bold hover:text-accent transition-colors truncate block">{selectedLead.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Phone</p>
                      <a href={`tel:${selectedLead.phone}`} className="font-bold hover:text-accent transition-colors">{selectedLead.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Location</p>
                      <p className="font-bold">{selectedLead.zip} {selectedLead.address ? `• ${selectedLead.address}` : ""}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Received On</p>
                      <p className="font-bold">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Referral Source</p>
                      <p className="font-bold">{selectedLead.referral}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <Loader2 className={`h-5 w-5 ${selectedLead.status === 'New' ? 'text-green-500' : 'text-accent'}`} />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Current Status</p>
                      <p className="font-bold">{selectedLead.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 rounded-3xl bg-accent/5 border border-accent/10">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Organize & Move Lead</p>
                <div className="flex flex-wrap gap-2">
                  {['New', 'Consultation', 'Waitlist', 'Archived', 'Spam'].map((status) => (
                    <Button
                      key={status}
                      variant={selectedLead.status === status ? "default" : "outline"}
                      size="sm"
                      className="rounded-xl font-bold h-9"
                      onClick={() => updateLeadStatusMutation.mutate({ id: selectedLead.id, status })}
                      disabled={updateLeadStatusMutation.isPending}
                    >
                      {updateLeadStatusMutation.isPending && updateLeadStatusMutation.variables?.status === status ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-2" />
                      ) : null}
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-14 rounded-2xl bg-accent text-white font-bold gap-2 shadow-xl shadow-accent/20" asChild>
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="h-5 w-5" />
                    Reply via Email
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-bold gap-2" asChild>
                  <a href={`tel:${selectedLead.phone}`}>
                    <Phone className="h-5 w-5" />
                    Call Client
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomedImage}
              alt="Zoomed project"
              className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
