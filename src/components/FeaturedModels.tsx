import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const models = [
  {
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    logo: "A",
    logoColor: "bg-orange-500",
    tokens: "411.5B",
    trend: "+4.56%",
    trendUp: true,
    isNew: false,
  },
  {
    name: "Trinity Large Preview",
    provider: "Arcee AI",
    logo: "A",
    logoColor: "bg-violet-600",
    tokens: null,
    trend: null,
    trendUp: null,
    isNew: true,
  },
  {
    name: "Gemini 3 Pro Preview",
    provider: "Google",
    logo: "G",
    logoColor: "bg-blue-500",
    tokens: "167.3B",
    trend: "-3.67%",
    trendUp: false,
    isNew: false,
  },
];

export function FeaturedModels() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Featured Models</h2>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              300+ active models on 60+ providers
            </p>
          </div>
          <Link
            href="/models"
            className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => (
            <Link
              key={model.name}
              href={`/models/${model.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 ${model.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {model.logo}
                </div>
                {model.isNew && (
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Model Info */}
              <h3 className="font-semibold text-lg mb-1">{model.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{model.provider}</p>

              {/* Stats */}
              {model.tokens && (
                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tokens</p>
                    <p className="font-semibold">{model.tokens}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Weekly Trend</p>
                    <p className={`font-semibold flex items-center gap-1 justify-end ${model.trendUp ? "text-emerald-500" : "text-red-500"}`}>
                      {model.trendUp ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {model.trend}
                    </p>
                  </div>
                </div>
              )}

              {/* Decorative dots */}
              <div className="flex gap-1.5 mt-5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-secondary group-hover:bg-primary/30 transition-colors"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/models"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
