import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  project_type: z.string().min(1, "Please select a project type"),
  location: z.string().min(2, "Please enter a location"),
  budget_range: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

const trustBadges = ["Licensed", "Insured", "Quality Guaranteed"];

export default function QuotePage() {
  const { toast } = useToast();

  const budgetOptions = useMemo(
    () => ["$10k\u2013$25k", "$25k\u2013$50k", "$50k\u2013$100k", "$100k+", "Not sure yet"],
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      project_type: "",
      location: "",
      budget_range: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    toast({
      title: "Thank you!",
      description: "We will contact you shortly.",
    });
    form.reset();
    void values;
  }

  return (
    <div className="min-h-screen arp-grid-bg" data-testid="page-quote">
      <div className="arp-container py-10 sm:py-14">
        <div className="mb-6" data-testid="quote-top">
          <Button variant="secondary" className="rounded-xl" asChild data-testid="button-back">
            <Link href="/" data-testid="link-back">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </span>
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-start">
          <Card className="rounded-3xl border bg-card/70 shadow-sm" data-testid="card-quote-form">
            <CardHeader>
              <CardTitle className="arp-title text-3xl" data-testid="text-quote-heading">
                Get a Quote
              </CardTitle>
              <CardDescription data-testid="text-quote-description">
                Share a few details and well follow up with a clear plan and next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                  data-testid="form-quote-page"
                >
                  <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-name-email">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem data-testid="field-full-name">
                          <FormLabel data-testid="label-full-name">Full name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="arp-focus-ring rounded-xl"
                              placeholder="Your name"
                              data-testid="input-full-name"
                            />
                          </FormControl>
                          <FormMessage data-testid="error-full-name" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem data-testid="field-email">
                          <FormLabel data-testid="label-email">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="arp-focus-ring rounded-xl"
                              placeholder="you@company.com"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage data-testid="error-email" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-phone-location">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem data-testid="field-phone">
                          <FormLabel data-testid="label-phone">Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="arp-focus-ring rounded-xl"
                              placeholder="(555) 123-4567"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage data-testid="error-phone" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem data-testid="field-location">
                          <FormLabel data-testid="label-location">Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="arp-focus-ring rounded-xl"
                              placeholder="City / Suburb"
                              data-testid="input-location"
                            />
                          </FormControl>
                          <FormMessage data-testid="error-location" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-type-budget">
                    <FormField
                      control={form.control}
                      name="project_type"
                      render={({ field }) => (
                        <FormItem data-testid="field-project-type">
                          <FormLabel data-testid="label-project-type">Project type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="arp-focus-ring rounded-xl" data-testid="select-project-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent data-testid="select-project-type-menu">
                              <SelectItem value="Residential" data-testid="option-project-type-residential">
                                Residential
                              </SelectItem>
                              <SelectItem value="Renovation" data-testid="option-project-type-renovation">
                                Renovation
                              </SelectItem>
                              <SelectItem value="Commercial" data-testid="option-project-type-commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="Project Management" data-testid="option-project-type-pm">
                                Project Management
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage data-testid="error-project-type" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget_range"
                      render={({ field }) => (
                        <FormItem data-testid="field-budget-range">
                          <FormLabel data-testid="label-budget">Budget range</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="arp-focus-ring rounded-xl" data-testid="select-budget">
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent data-testid="select-budget-menu">
                              {budgetOptions.map((b) => (
                                <SelectItem
                                  key={b}
                                  value={b}
                                  data-testid={`option-budget-${b.replaceAll("$", "").replaceAll("\u2013", "-").replaceAll(" ", "-")}`}
                                >
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage data-testid="error-budget" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem data-testid="field-message">
                        <FormLabel data-testid="label-message">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="arp-focus-ring min-h-28 rounded-xl"
                            placeholder="What are you building? Any deadlines or details?"
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage data-testid="error-message" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row" data-testid="quote-actions">
                    <Button type="submit" className="rounded-xl" data-testid="button-submit">
                      Submit request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="secondary" className="rounded-xl" asChild data-testid="button-view-projects">
                      <Link href="/projects" data-testid="link-view-projects">
                        View Projects
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2" data-testid="quote-trust-badges">
                    {trustBadges.map((b) => (
                      <Badge
                        key={b}
                        variant="secondary"
                        className="rounded-full"
                        data-testid={`badge-${b.toLowerCase().replaceAll(" ", "-")}`}
                      >
                        <BadgeCheck className="mr-1 h-3.5 w-3.5" /> {b}
                      </Badge>
                    ))}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border bg-card/70 shadow-sm" data-testid="card-quote-aside">
            <CardHeader>
              <CardTitle className="arp-title" data-testid="text-aside-title">
                What happens next
              </CardTitle>
              <CardDescription data-testid="text-aside-subtitle">
                A simple, respectful process with clear communication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-3 text-sm text-muted-foreground" data-testid="list-next-steps">
                <li className="flex gap-3" data-testid="next-step-1">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.18)] text-[hsl(var(--foreground))]">
                    1
                  </span>
                  <span>We review your request and clarify any details.</span>
                </li>
                <li className="flex gap-3" data-testid="next-step-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.18)] text-[hsl(var(--foreground))]">
                    2
                  </span>
                  <span>We schedule a consultation and site assessment if needed.</span>
                </li>
                <li className="flex gap-3" data-testid="next-step-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.18)] text-[hsl(var(--foreground))]">
                    3
                  </span>
                  <span>You receive an itemized estimate and timeline.</span>
                </li>
              </ol>

              <div className="mt-6 rounded-2xl border bg-background/60 p-4" data-testid="aside-note">
                <div className="text-sm font-medium" data-testid="text-aside-note-title">Response time</div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid="text-aside-note">
                  Typically within 1 business day.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
