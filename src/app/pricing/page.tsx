"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n-context";
import { Check, Zap, Building2, Users, Shield, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const { t } = useI18n();

  const plans = [
    {
      name: t("pricing.free.name"),
      price: "$0",
      period: "forever",
      description: t("pricing.free.description"),
      features: [
        t("pricing.free.features.freeModels"),
        t("pricing.free.features.requests"),
        t("pricing.free.features.support"),
        t("pricing.free.features.analytics"),
      ],
      cta: t("common.getStarted"),
      ctaLink: "/keys",
      popular: false,
    },
    {
      name: t("pricing.payAsYouGo.name"),
      price: "Usage-based",
      period: "",
      description: t("pricing.payAsYouGo.description"),
      features: [
        t("pricing.payAsYouGo.features.allModels"),
        t("pricing.payAsYouGo.features.noMinimum"),
        t("pricing.payAsYouGo.features.priorityRouting"),
        t("pricing.payAsYouGo.features.emailSupport"),
        t("pricing.payAsYouGo.features.advancedAnalytics"),
      ],
      cta: t("credits.addCredits"),
      ctaLink: "/keys",
      popular: true,
    },
    {
      name: t("pricing.enterprise.name"),
      price: "Custom",
      period: "",
      description: t("pricing.enterprise.description"),
      features: [
        t("pricing.enterprise.features.everything"),
        t("pricing.enterprise.features.volumeDiscounts"),
        t("pricing.enterprise.features.dedicatedSupport"),
        t("pricing.enterprise.features.sla"),
        t("pricing.enterprise.features.sso"),
      ],
      cta: t("common.contactSales"),
      ctaLink: "/enterprise",
      popular: false,
    },
  ];

  const faqItems = [
    {
      question: t("pricing.faqItems.q1"),
      answer: t("pricing.faqItems.a1"),
    },
    {
      question: t("pricing.faqItems.q2"),
      answer: t("pricing.faqItems.a2"),
    },
    {
      question: t("pricing.faqItems.q3"),
      answer: t("pricing.faqItems.a3"),
    },
    {
      question: t("pricing.faqItems.q4"),
      answer: t("pricing.faqItems.a4"),
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("pricing.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.subtitle")}
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
              {t("pricing.whyChoose")}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("pricing.oneApi")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.oneApiDesc")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("pricing.providers")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.providersDesc")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("pricing.usersCount")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.usersDesc")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("pricing.dataPrivacy")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.dataPrivacyDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("pricing.faq")}
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
            <h2 className="text-3xl font-bold mb-4">{t("pricing.readyToStart")}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("pricing.readyDesc")}
            </p>
            <Link
              href="/keys"
              className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              {t("home.getApiKey")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
