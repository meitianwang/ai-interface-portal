import { Github, Wallet, CreditCard, Key, Check } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1: Signup */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold">Signup</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Create an account to get started
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-secondary hover:border-primary/30 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-secondary hover:border-primary/30 transition-all">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">Continue with GitHub</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-secondary hover:border-primary/30 transition-all">
                <Wallet className="w-5 h-5" />
                <span className="text-sm font-medium">Continue with MetaMask</span>
              </button>
            </div>
          </div>

          {/* Step 2: Buy Credits */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold">Buy credits</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Credits can be used with any model or provider
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Add $10.00</span>
                </div>
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Add $50.00</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Add $100.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Get API Key */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">Get your API key</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Create an API key and start making requests
            </p>
            <div className="space-y-4">
              <div className="px-4 py-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">API Key</span>
                </div>
                <code className="text-sm text-muted-foreground font-mono block bg-background px-3 py-2 rounded-lg border border-border">
                  sk-or-v1-xxxx...xxxx
                </code>
              </div>
              <div className="px-4 py-3 rounded-xl border border-dashed border-border bg-secondary/50">
                <p className="text-xs text-muted-foreground text-center font-medium">
                  Fully OpenAI compatible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
