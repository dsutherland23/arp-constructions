import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SimplePage({
  title,
  subtitle,
  testId,
}: {
  title: string;
  subtitle: string;
  testId: string;
}) {
  return (
    <div className="min-h-screen arp-grid-bg" data-testid={testId}>
      <div className="arp-container py-16">
        <div className="rounded-3xl border bg-card/70 p-8 shadow-sm">
          <div className="arp-kicker text-xs text-muted-foreground" data-testid={`${testId}-kicker`}>
            ARP Constructions
          </div>
          <h1 className="arp-title mt-2 text-3xl font-semibold" data-testid={`${testId}-title`}>
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground" data-testid={`${testId}-subtitle`}>
            {subtitle}
          </p>

          <div className="mt-6" data-testid={`${testId}-actions`}>
            <Button asChild className="rounded-xl" data-testid={`${testId}-button-home`}>
              <Link href="/" data-testid={`${testId}-link-home`}>
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
