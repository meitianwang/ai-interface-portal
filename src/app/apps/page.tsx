import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, ExternalLink, Users, ArrowRight } from "lucide-react";

const featuredApps = [
  {
    name: "Replit",
    description: "The easiest way to go from idea to app",
    logo: "R",
    logoColor: "bg-orange-500",
    users: "2.1M",
    category: "Development",
  },
  {
    name: "Cursor",
    description: "The AI-first code editor",
    logo: "C",
    logoColor: "bg-blue-600",
    users: "1.8M",
    category: "Development",
  },
  {
    name: "BLACKBOXAI",
    description: "AI agent for builders",
    logo: "B",
    logoColor: "bg-violet-600",
    users: "1.2M",
    category: "Development",
  },
  {
    name: "Kilo Code",
    description: "Everything you need for agentic development",
    logo: "K",
    logoColor: "bg-blue-500",
    users: "890K",
    category: "Development",
  },
  {
    name: "Continue",
    description: "Open-source autopilot for VS Code",
    logo: "C",
    logoColor: "bg-emerald-500",
    users: "650K",
    category: "Development",
  },
  {
    name: "Aider",
    description: "AI pair programming in your terminal",
    logo: "A",
    logoColor: "bg-rose-500",
    users: "420K",
    category: "Development",
  },
  {
    name: "Open WebUI",
    description: "Self-hosted ChatGPT alternative",
    logo: "O",
    logoColor: "bg-cyan-500",
    users: "380K",
    category: "Chat",
  },
  {
    name: "Cody",
    description: "AI coding assistant by Sourcegraph",
    logo: "C",
    logoColor: "bg-pink-500",
    users: "350K",
    category: "Development",
  },
  {
    name: "Jan",
    description: "Run AI locally on your computer",
    logo: "J",
    logoColor: "bg-amber-500",
    users: "280K",
    category: "Local AI",
  },
];

const categories = [
  { name: "All", count: 250 },
  { name: "Development", count: 85 },
  { name: "Chat", count: 62 },
  { name: "Writing", count: 45 },
  { name: "Research", count: 38 },
  { name: "Local AI", count: 20 },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3">Apps</h1>
            <p className="text-lg text-muted-foreground">
              Discover 250k+ apps built with OpenRouter
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search apps..."
                className="w-full h-12 pl-12 pr-4 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, index) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-3xl font-bold">250K+</p>
              <p className="text-sm text-muted-foreground">Total Apps</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-3xl font-bold">4.2M+</p>
              <p className="text-sm text-muted-foreground">Users</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-3xl font-bold">30T+</p>
              <p className="text-sm text-muted-foreground">Tokens/Month</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-3xl font-bold">300+</p>
              <p className="text-sm text-muted-foreground">Models Used</p>
            </div>
          </div>

          {/* Featured Apps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Featured Apps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <Link
                  key={app.name}
                  href={`/apps/${app.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {/* Preview */}
                  <div className="h-40 bg-secondary flex items-center justify-center">
                    <div
                      className={`w-20 h-20 ${app.logoColor} rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {app.logo}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {app.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 bg-secondary rounded-md text-muted-foreground">
                        {app.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{app.users}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Build with OpenRouter</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join thousands of developers building amazing AI-powered
              applications with OpenRouter
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
