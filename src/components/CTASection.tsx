import Link from "next/link";
import { ArrowRight, Grid3X3, BarChart3, Calendar } from "lucide-react";

const announcements = [
  {
    title: "Distillable Models and Synthetic Data Pipelines...",
    excerpt: "Introducing new capabilities for model distillation and synthetic data generation.",
    date: "12/24/2025",
    slug: "distillable-models",
  },
  {
    title: "Response Healing: Reduce JSON Defects by 80%+",
    excerpt: "Our new response healing feature automatically fixes malformed JSON responses.",
    date: "12/18/2025",
    slug: "response-healing",
  },
  {
    title: "The 2025 State of AI Report",
    excerpt: "A comprehensive look at the AI landscape in 2025.",
    date: "12/4/2025",
    slug: "state-of-ai-2025",
  },
];

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-8 gap-6">
          {/* Left Column - CTA Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Explore Models */}
            <Link
              href="/models"
              className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Grid3X3 className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1.5">Explore Models</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Discover AI models across our collection
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                    View models
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Model & App Rankings */}
            <Link
              href="/rankings"
              className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1.5">Model & App Rankings</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Explore token usage across models, labs, and public applications
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                    View rankings
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column - Announcements */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-xl">Recent Announcements</h3>
                <Link
                  href="/announcements"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-2">
                {announcements.map((announcement) => (
                  <Link
                    key={announcement.slug}
                    href={`/announcements/${announcement.slug}`}
                    className="group block p-4 rounded-xl hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-secondary group-hover:bg-background flex-shrink-0 flex items-center justify-center transition-colors">
                        <Calendar className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-1.5 truncate group-hover:text-primary transition-colors">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                          {announcement.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground">{announcement.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
