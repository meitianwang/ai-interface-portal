"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function FeaturedAgents() {
  const { t } = useI18n();

  const agents = [
    {
      name: "Replit",
      description: t("featuredAgents.agents.replit"),
      logo: "R",
      logoColor: "bg-orange-500",
    },
    {
      name: "BLACKBOXAI",
      description: t("featuredAgents.agents.blackboxai"),
      logo: "B",
      logoColor: "bg-violet-600",
    },
    {
      name: "Kilo Code",
      description: t("featuredAgents.agents.kiloCode"),
      logo: "K",
      logoColor: "bg-blue-500",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t("featuredAgents.title")}</h2>
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {t("featuredAgents.subtitle")}
            </p>
          </div>
          <Link
            href="/apps"
            className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
          >
            {t("common.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.name}
              href={`/apps/${agent.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Preview Image */}
              <div className="h-48 bg-secondary overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-secondary to-background flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className={`w-24 h-24 ${agent.logoColor} rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl`}>
                    {agent.logo}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 ${agent.logoColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {agent.logo}
                  </div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/apps"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1.5"
          >
            {t("common.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
