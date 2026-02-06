import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Zap, Building2, Users, Shield, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with free models",
    features: [
      "Access to free models",
      "1,000 requests/day",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    ctaLink: "/keys",
    popular: false,
  },
  {
    name: "Pay as you go",
    price: "Usage-based",
    period: "",
    description: "Pay only for what you use",
    features: [
      "Access to all models",
      "Unlimited requests",
      "No monthly commitment",
      "Priority support",
      "Advanced analytics",
      "API key management",
    ],
    cta: "Add Credits",
    ctaLink: "/keys",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale deployments",
    features: [
      "Everything in Pay as you go",
      "Volume discounts",
      "Dedicated support",
      "Custom SLAs",
      "SSO & SAML",
      "Data privacy controls",
      "Custom contracts",
    ],
    cta: "Contact Sales",
    ctaLink: "/enterprise",
    popular: false,
  },
];

const faqItems = [
  {
    question: "How does pricing work?",
    answer:
      "OpenRouter uses a pay-as-you-go model. You only pay for the tokens you use, with different rates for different models. Prices are shown per million tokens.",
  },
  {
    question: "Are there any monthly fees?",
    answer:
      "No, there are no monthly fees or subscriptions. You simply add credits to your account and use them as needed.",
  },
  {
    question: "Can I switch models without changing my code?",
    answer:
      "Yes! OpenRouter provides a unified API, so you can switch between any of our 300+ models by simply changing the model parameter.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, cryptocurrency (via MetaMask), and wire transfers for enterprise customers.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pay only for what you use. No subscriptions, no hidden fees.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-card p-8 ${
                    plan.popular
                      ? "border-primary shadow-xl shadow-primary/10"
                      : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaLink}
                    className={`block w-full text-center py-3 rounded-xl font-medium transition-colors ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why choose OpenRouter?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">One API</h3>
                <p className="text-sm text-muted-foreground">
                  Access 300+ models through a single, unified API
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">60+ Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic fallback ensures maximum uptime
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">5M+ Users</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by developers worldwide
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Data Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is never used for training
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create an account and start using AI models in minutes
            </p>
            <Link
              href="/keys"
              className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Get API Key
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
