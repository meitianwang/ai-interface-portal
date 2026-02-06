import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const announcements = [
  {
    slug: "claude-opus-4-5",
    title: "Claude Opus 4.5 Now Available",
    excerpt:
      "Anthropic's most capable model is now available on OpenRouter with improved reasoning and coding capabilities.",
    date: "2025-02-05",
    category: "New Model",
    featured: true,
  },
  {
    slug: "distillable-models",
    title: "Distillable Models and Synthetic Data Pipelines",
    excerpt:
      "Introducing new capabilities for model distillation and synthetic data generation to help you build better AI applications.",
    date: "2025-01-24",
    category: "Feature",
    featured: true,
  },
  {
    slug: "response-healing",
    title: "Response Healing: Reduce JSON Defects by 80%+",
    excerpt:
      "Our new response healing feature automatically fixes malformed JSON responses, improving reliability for structured outputs.",
    date: "2025-01-18",
    category: "Feature",
    featured: true,
  },
  {
    slug: "state-of-ai-2025",
    title: "The 2025 State of AI Report",
    excerpt:
      "A comprehensive look at the AI landscape in 2025, including trends, usage patterns, and predictions.",
    date: "2025-01-04",
    category: "Report",
    featured: false,
  },
  {
    slug: "gemini-2-flash",
    title: "Gemini 2.0 Flash Available",
    excerpt:
      "Google's latest Gemini model brings improved performance and faster response times.",
    date: "2024-12-20",
    category: "New Model",
    featured: false,
  },
  {
    slug: "deepseek-v3",
    title: "DeepSeek V3 Launch",
    excerpt:
      "DeepSeek's latest model offers excellent coding capabilities at competitive pricing.",
    date: "2024-12-15",
    category: "New Model",
    featured: false,
  },
  {
    slug: "enterprise-sso",
    title: "Enterprise SSO Now Available",
    excerpt:
      "Single sign-on support for enterprise customers with SAML 2.0 integration.",
    date: "2024-12-10",
    category: "Enterprise",
    featured: false,
  },
  {
    slug: "llama-3-3",
    title: "Llama 3.3 70B Now Available",
    excerpt:
      "Meta's latest open-source model brings improved instruction following and reasoning.",
    date: "2024-12-05",
    category: "New Model",
    featured: false,
  },
];

const categories = ["All", "New Model", "Feature", "Report", "Enterprise"];

export default function AnnouncementsPage() {
  const featuredAnnouncements = announcements.filter((a) => a.featured);
  const otherAnnouncements = announcements.filter((a) => !a.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3">Announcements</h1>
            <p className="text-lg text-muted-foreground">
              Stay up to date with the latest news and updates from OpenRouter
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Featured</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredAnnouncements.map((announcement) => (
                <Link
                  key={announcement.slug}
                  href={`/announcements/${announcement.slug}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="h-40 bg-secondary flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {announcement.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {announcement.date}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {announcement.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Announcements */}
          <div>
            <h2 className="text-xl font-semibold mb-6">All Updates</h2>
            <div className="space-y-4">
              {otherAnnouncements.map((announcement) => (
                <Link
                  key={announcement.slug}
                  href={`/announcements/${announcement.slug}`}
                  className="group flex items-start gap-6 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Tag className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-0.5 bg-secondary text-xs font-medium rounded-full text-muted-foreground">
                        {announcement.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {announcement.date}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {announcement.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Stay in the loop</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter to get the latest updates delivered
              to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="h-11 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
