"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n-context";
import { Loader2, BarChart3, TrendingUp, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageRecord {
  id: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  cost: number;
  created_at: string;
}

export default function SettingsUsagePage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const supabase = createClient();
  const [usage, setUsage] = useState<UsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    if (user) {
      loadUsage();
    }
  }, [user, period]);

  const loadUsage = async () => {
    try {
      const daysAgo = period === "7d" ? 7 : period === "30d" ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data, error } = await supabase
        .from("usage_history")
        .select("*")
        .eq("user_id", user?.id)
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading usage:", error);
      }

      setUsage(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCost = usage.reduce((sum, u) => sum + u.cost, 0);
  const totalInputTokens = usage.reduce((sum, u) => sum + u.input_tokens, 0);
  const totalOutputTokens = usage.reduce((sum, u) => sum + u.output_tokens, 0);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t("usage.title")}</h1>
          <p className="text-muted-foreground">
            {t("usage.subtitle")}
          </p>
        </div>
        <button className="flex items-center gap-2 h-10 px-4 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm">
          <Download className="w-4 h-4" />
          {t("usage.export")}
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        {(["7d", "30d", "90d"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              period === p
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {p === "7d" ? t("usage.last7days") : p === "30d" ? t("usage.last30days") : t("usage.last90days")}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{t("usage.totalSpent")}</span>
          </div>
          <p className="text-2xl font-bold">${totalCost.toFixed(4)}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t("usage.inputTokens")}</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(totalInputTokens)}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t("usage.outputTokens")}</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(totalOutputTokens)}</p>
        </div>
      </div>

      {/* Usage Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">{t("usage.recentActivity")}</h2>
        </div>

        {usage.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">{t("usage.noData")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("usage.startUsing")}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                    {t("usage.model")}
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                    {t("usage.input")}
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                    {t("usage.output")}
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                    {t("usage.cost")}
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                    {t("usage.date")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {usage.map((record) => (
                  <tr key={record.id} className="border-t border-border">
                    <td className="px-4 py-3 text-sm font-mono">{record.model}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      {formatNumber(record.input_tokens)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {formatNumber(record.output_tokens)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                      ${record.cost.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-muted-foreground">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
