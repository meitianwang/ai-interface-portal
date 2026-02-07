"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { models } from "@/lib/models-data";
import { useI18n } from "@/lib/i18n-context";
import { TrendingUp, TrendingDown, BarChart3, Users, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "models" | "providers" | "apps";

const mockApps = [
  { name: "Replit", users: "2.1M", tokens: "45.2B", trend: "+12.3%", trendUp: true },
  { name: "Cursor", users: "1.8M", tokens: "38.7B", trend: "+8.5%", trendUp: true },
  { name: "Cody", users: "890K", tokens: "21.3B", trend: "+5.2%", trendUp: true },
  { name: "Continue", users: "650K", tokens: "15.8B", trend: "-2.1%", trendUp: false },
  { name: "Aider", users: "420K", tokens: "12.4B", trend: "+15.7%", trendUp: true },
];

const mockProviders = [
  { name: "Anthropic", models: 5, tokens: "120.5B", trend: "+18.2%", trendUp: true },
  { name: "OpenAI", models: 8, tokens: "95.3B", trend: "+5.4%", trendUp: true },
  { name: "Google", models: 6, tokens: "78.2B", trend: "+22.1%", trendUp: true },
  { name: "Meta", models: 4, tokens: "45.6B", trend: "-3.2%", trendUp: false },
  { name: "Mistral AI", models: 4, tokens: "32.1B", trend: "+28.5%", trendUp: true },
];

export default function RankingsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabType>("models");

  const topModels = models.slice(0, 10).map((model, index) => ({
    ...model,
    rank: index + 1,
    weeklyTokens: `${(Math.random() * 100 + 50).toFixed(1)}B`,
    trend: `${Math.random() > 0.3 ? "+" : "-"}${(Math.random() * 20).toFixed(1)}%`,
    trendUp: Math.random() > 0.3,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3">{t("rankings.title")}</h1>
            <p className="text-lg text-muted-foreground">
              {t("rankings.subtitle")}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{t("rankings.totalTokens")}</span>
              </div>
              <p className="text-3xl font-bold">30T+</p>
              <p className="text-sm text-emerald-500 mt-1">+15.2% {t("common.thisWeek")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{t("rankings.activeModels")}</span>
              </div>
              <p className="text-3xl font-bold">300+</p>
              <p className="text-sm text-emerald-500 mt-1">+12 {t("common.thisWeek")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{t("rankings.globalUsers")}</span>
              </div>
              <p className="text-3xl font-bold">5M+</p>
              <p className="text-sm text-emerald-500 mt-1">+8.7% {t("common.thisWeek")}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit mb-8">
            {[
              { id: "models", label: t("rankings.models") },
              { id: "providers", label: t("rankings.providers") },
              { id: "apps", label: t("rankings.apps") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Rankings Table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {t("common.rank")}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {activeTab === "models" ? t("rankings.model") : activeTab === "providers" ? t("rankings.provider") : t("rankings.app")}
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                      {activeTab === "apps" ? t("common.users") : activeTab === "providers" ? t("rankings.models") : t("rankings.context")}
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                      {t("rankings.weeklyTokens")}
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                      {t("common.trend")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "models" &&
                    topModels.map((model) => (
                      <tr
                        key={model.id}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-muted-foreground">
                            #{model.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/models/${model.id}`}
                            className="flex items-center gap-3 group"
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold",
                                model.provider === "Anthropic" && "bg-orange-500",
                                model.provider === "OpenAI" && "bg-emerald-600",
                                model.provider === "Google" && "bg-blue-500",
                                model.provider === "Meta" && "bg-blue-600",
                                model.provider === "Mistral AI" && "bg-violet-600",
                                model.provider === "DeepSeek" && "bg-cyan-600"
                              )}
                            >
                              {model.providerLogo}
                            </div>
                            <div>
                              <p className="font-medium group-hover:text-primary transition-colors">
                                {model.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {model.provider}
                              </p>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-medium">
                            {(model.contextLength / 1000).toFixed(0)}K
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {model.weeklyTokens}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 font-medium",
                              model.trendUp ? "text-emerald-500" : "text-red-500"
                            )}
                          >
                            {model.trendUp ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {model.trend}
                          </span>
                        </td>
                      </tr>
                    ))}

                  {activeTab === "providers" &&
                    mockProviders.map((provider, index) => (
                      <tr
                        key={provider.name}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{provider.name}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {provider.models}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {provider.tokens}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 font-medium",
                              provider.trendUp ? "text-emerald-500" : "text-red-500"
                            )}
                          >
                            {provider.trendUp ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {provider.trend}
                          </span>
                        </td>
                      </tr>
                    ))}

                  {activeTab === "apps" &&
                    mockApps.map((app, index) => (
                      <tr
                        key={app.name}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{app.name}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {app.users}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {app.tokens}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 font-medium",
                              app.trendUp ? "text-emerald-500" : "text-red-500"
                            )}
                          >
                            {app.trendUp ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {app.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
