import Link from "next/link";
import { ArrowRight, Shield, Zap, Database, Lock, CheckCircle } from "lucide-react";

export function Features() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            OpenRouter Features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* One API for Any Model */}
          <div className="group rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="h-52 mb-6 bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-3">
                  <div className="w-24 h-10 bg-background rounded-lg flex items-center justify-center text-sm text-muted-foreground border border-border">GPT-4</div>
                  <div className="w-24 h-10 bg-background rounded-lg flex items-center justify-center text-sm text-muted-foreground border border-border">Claude</div>
                  <div className="w-24 h-10 bg-background rounded-lg flex items-center justify-center text-sm text-muted-foreground border border-border">Gemini</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-primary"></div>
                  <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-0.5 h-8 bg-gradient-to-t from-transparent to-primary"></div>
                </div>
                <div className="w-28 h-12 bg-primary rounded-lg flex items-center justify-center text-sm text-primary-foreground font-medium shadow-lg shadow-primary/30">
                  Your App
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">One API for Any Model</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Access all major models through a single, unified interface
            </p>
            <Link
              href="/models"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5 group-hover:gap-2 transition-all"
            >
              Browse all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Higher Availability */}
          <div className="group rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="h-52 mb-6 bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
              <div className="space-y-4 w-full max-w-xs px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">G</div>
                  <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-emerald-500 w-12 text-right">99.9%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm font-bold">A</div>
                  <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-emerald-500 w-12 text-right">99.8%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">B</div>
                  <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-emerald-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-emerald-500 w-12 text-right">99.7%</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Higher Availability</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Reliable AI models via our distributed infrastructure
            </p>
            <Link
              href="/docs/uptime"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5 group-hover:gap-2 transition-all"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Price and Performance */}
          <div className="group rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="h-52 mb-6 bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
              <div className="w-full px-8">
                <div className="flex items-end gap-3 h-36 justify-center">
                  {[40, 55, 45, 70, 60, 85, 75, 100].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-300"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                  <span>Jan</span>
                  <span>Aug</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Price and Performance</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Keep costs in check without sacrificing speed
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5 group-hover:gap-2 transition-all"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Custom Data Policies */}
          <div className="group rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="h-52 mb-6 bg-secondary rounded-xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-foreground">No training</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-foreground">No logging</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-foreground">GDPR compliant</span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Data Policies</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Protect your organization with fine grained data policies
            </p>
            <Link
              href="/docs/data-privacy"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5 group-hover:gap-2 transition-all"
            >
              View docs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
