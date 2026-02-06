import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Book,
  Code,
  Key,
  Zap,
  Shield,
  Server,
  ArrowRight,
  ExternalLink,
  Search,
} from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    icon: Zap,
    links: [
      { name: "Quick Start", href: "/docs/quick-start" },
      { name: "Authentication", href: "/docs/authentication" },
      { name: "Making Requests", href: "/docs/requests" },
      { name: "Handling Responses", href: "/docs/responses" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    links: [
      { name: "Chat Completions", href: "/docs/api/chat" },
      { name: "Completions", href: "/docs/api/completions" },
      { name: "Models", href: "/docs/api/models" },
      { name: "Credits", href: "/docs/api/credits" },
    ],
  },
  {
    title: "Models",
    icon: Book,
    links: [
      { name: "Model Overview", href: "/docs/models" },
      { name: "Model Parameters", href: "/docs/parameters" },
      { name: "Pricing", href: "/docs/pricing" },
      { name: "Rate Limits", href: "/docs/rate-limits" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    links: [
      { name: "Data Privacy", href: "/docs/data-privacy" },
      { name: "API Keys", href: "/docs/api-keys" },
      { name: "Best Practices", href: "/docs/security" },
      { name: "Compliance", href: "/docs/compliance" },
    ],
  },
  {
    title: "Infrastructure",
    icon: Server,
    links: [
      { name: "Providers", href: "/docs/providers" },
      { name: "Uptime & SLAs", href: "/docs/uptime" },
      { name: "Fallback Routing", href: "/docs/fallback" },
      { name: "Caching", href: "/docs/caching" },
    ],
  },
  {
    title: "SDKs",
    icon: Key,
    links: [
      { name: "Python SDK", href: "/docs/sdk/python" },
      { name: "Node.js SDK", href: "/docs/sdk/node" },
      { name: "OpenAI Compatible", href: "/docs/sdk/openai" },
      { name: "REST API", href: "/docs/sdk/rest" },
    ],
  },
];

const popularGuides = [
  {
    title: "Quick Start Guide",
    description: "Get up and running with OpenRouter in 5 minutes",
    href: "/docs/quick-start",
  },
  {
    title: "Switching from OpenAI",
    description: "Migrate your existing OpenAI integration",
    href: "/docs/migration/openai",
  },
  {
    title: "Model Selection Guide",
    description: "Choose the right model for your use case",
    href: "/docs/guides/model-selection",
  },
  {
    title: "Cost Optimization",
    description: "Tips to reduce your API costs",
    href: "/docs/guides/cost-optimization",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to integrate OpenRouter into your
                applications
              </p>

              {/* Search */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full h-12 pl-12 pr-4 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Guides */}
        <section className="py-12 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="text-lg font-semibold mb-6">Popular Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularGuides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">{section.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1.5 group"
                        >
                          <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="py-12 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Start building in minutes
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  OpenRouter is fully compatible with the OpenAI SDK. Just
                  change the base URL and you&apos;re ready to go.
                </p>
                <Link
                  href="/docs/quick-start"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Read the quick start guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="rounded-xl bg-[#1a1a1a] p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
                  <code>
                    {`import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "anthropic/claude-3.5-sonnet",
  messages: [
    { role: "user", content: "Hello!" }
  ],
});

console.log(response.choices[0].message);`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="text-2xl font-bold mb-8">Additional Resources</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <a
                href="https://github.com/openrouter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div>
                  <h3 className="font-medium mb-1">GitHub</h3>
                  <p className="text-sm text-muted-foreground">
                    Example code and SDKs
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://discord.gg/openrouter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div>
                  <h3 className="font-medium mb-1">Discord</h3>
                  <p className="text-sm text-muted-foreground">
                    Community support
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://status.openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div>
                  <h3 className="font-medium mb-1">Status</h3>
                  <p className="text-sm text-muted-foreground">
                    System status page
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
