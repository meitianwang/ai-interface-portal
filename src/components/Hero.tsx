import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
            The Unified Interface
            <br />
            <span className="text-muted-foreground">For LLMs</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Better{" "}
            <Link href="/pricing" className="text-foreground underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors">
              prices
            </Link>
            , better{" "}
            <Link href="/docs/uptime" className="text-foreground underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors">
              uptime
            </Link>
            , no subscriptions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/keys"
              className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 gap-2 group"
            >
              Get API Key
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/models"
              className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
            >
              Explore Models
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
