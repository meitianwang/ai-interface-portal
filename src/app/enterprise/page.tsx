import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Shield,
  Zap,
  Users,
  Lock,
  HeadphonesIcon,
  BarChart3,
  Server,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant with advanced security controls and audit logs",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description:
      "Custom data retention policies. Your data is never used for training",
  },
  {
    icon: Users,
    title: "SSO & SAML",
    description:
      "Single sign-on integration with your existing identity provider",
  },
  {
    icon: Server,
    title: "Dedicated Infrastructure",
    description: "Private endpoints and dedicated capacity for your workloads",
  },
  {
    icon: HeadphonesIcon,
    title: "Priority Support",
    description: "24/7 dedicated support with guaranteed response times",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed usage analytics, cost reporting, and optimization",
  },
];

const benefits = [
  "Volume discounts on all models",
  "Custom contracts and invoicing",
  "Dedicated account manager",
  "Custom SLAs with uptime guarantees",
  "On-premise deployment options",
  "Model fine-tuning support",
];

const logos = [
  "Microsoft",
  "Google",
  "Amazon",
  "Meta",
  "Salesforce",
  "Adobe",
  "IBM",
  "Oracle",
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Enterprise Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                AI infrastructure for the enterprise
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                Deploy AI at scale with enterprise-grade security, compliance,
                and support
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center h-12 px-6 bg-secondary rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by leading companies worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="text-2xl font-bold text-muted-foreground/50"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Enterprise-grade features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to deploy AI safely and securely at scale
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why enterprises choose OpenRouter
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get the flexibility of 300+ AI models with the reliability and
                  security your organization needs
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-2xl font-bold mb-2">Get in touch</h3>
                <p className="text-muted-foreground mb-6">
                  Talk to our sales team about your enterprise needs
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Work email
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your needs..."
                      className="w-full px-4 py-3 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Sales
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
