"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
            {t("home.heroTitle1")}
            <br />
            <span className="text-muted-foreground">{t("home.heroTitle2")}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("home.heroSubtitle")}{" "}
            <Link href="/pricing" className="text-foreground underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors">
              {t("home.prices")}
            </Link>
            , {t("home.betterUptime")}{" "}
            <Link href="/docs/uptime" className="text-foreground underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors">
              {t("home.uptime")}
            </Link>
            , {t("home.noSubs")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/keys"
              className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 gap-2 group"
            >
              {t("home.getApiKey")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/models"
              className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
            >
              {t("home.exploreModels")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
