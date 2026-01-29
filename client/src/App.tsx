import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import QuotePage from "@/pages/quote";
import SimplePage from "@/pages/simple";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/quote" component={QuotePage} />

      <Route
        path="/about"
        component={() => (
          <SimplePage
            title="About ARP Constructions"
            subtitle="ARP Constructions was founded with a commitment to quality workmanship, transparent communication, and long-term value."
            testId="page-about"
          />
        )}
      />
      <Route
        path="/services"
        component={() => (
          <SimplePage
            title="Services"
            subtitle="Residential construction, renovations, commercial work, and full project management\u2014delivered with precision."
            testId="page-services"
          />
        )}
      />
      <Route
        path="/projects"
        component={() => (
          <SimplePage
            title="Projects"
            subtitle="Explore a curated gallery of completed and ongoing work across residential, renovation, and commercial categories."
            testId="page-projects"
          />
        )}
      />
      <Route
        path="/how-it-works"
        component={() => (
          <SimplePage
            title="How It Works"
            subtitle="Consultation, planning & design, construction, and final handover\u2014a calm process with clear milestones."
            testId="page-how-it-works"
          />
        )}
      />
      <Route
        path="/testimonials"
        component={() => (
          <SimplePage
            title="Testimonials"
            subtitle="Client stories and reviews that reflect our commitment to craft, communication, and integrity."
            testId="page-testimonials"
          />
        )}
      />
      <Route
        path="/faqs"
        component={() => (
          <SimplePage
            title="FAQs"
            subtitle="Quick answers about budgets, timelines, permits, and what to expect from working with ARP Constructions."
            testId="page-faqs"
          />
        )}
      />
      <Route
        path="/contact"
        component={() => (
          <SimplePage
            title="Contact"
            subtitle="Reach out for a consultation. We respond quickly and keep communication clear throughout your project."
            testId="page-contact"
          />
        )}
      />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
