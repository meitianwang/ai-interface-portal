"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n-context";
import { Loader2, CreditCard, Plus, ArrowRight, History, Zap } from "lucide-react";

interface Credits {
  balance: number;
  lifetime_usage: number;
}

export default function SettingsCreditsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const supabase = createClient();
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCredits();
    }
  }, [user]);

  const loadCredits = async () => {
    try {
      const { data, error } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading credits:", error);
      }

      if (data) {
        setCredits({
          balance: data.balance,
          lifetime_usage: data.lifetime_usage,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const creditAmounts = [5, 10, 25, 50, 100, 250];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{t("credits.title")}</h1>
        <p className="text-muted-foreground">
          {t("credits.subtitle")}
        </p>
      </div>

      {/* Balance Card */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("credits.currentBalance")}</p>
            <p className="text-4xl font-bold">${credits?.balance.toFixed(2) || "0.00"}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <History className="w-4 h-4" />
            <span>{t("credits.lifetimeUsage")}: ${credits?.lifetime_usage.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </div>

      {/* Add Credits */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{t("credits.addCredits")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("credits.purchaseCredits")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {creditAmounts.map((amount) => (
            <button
              key={amount}
              className="h-16 rounded-xl border border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center"
            >
              <span className="text-lg font-semibold">${amount}</span>
              <span className="text-xs text-muted-foreground">{t("credits.credits")}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">{t("credits.orEnterCustom")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              placeholder="0.00"
              min="1"
              step="0.01"
              className="w-full h-12 pl-8 pr-4 bg-secondary rounded-xl text-lg font-medium placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="h-12 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            {t("credits.purchase")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">{t("credits.paymentMethods")}</h2>
          <button className="text-sm text-primary hover:underline">
            {t("credits.addPaymentMethod")}
          </button>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>{t("credits.noPaymentMethods")}</p>
          <p className="text-sm mt-1">{t("credits.addCardHint")}</p>
        </div>
      </div>

      {/* Auto-reload */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">{t("credits.autoReload")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("credits.autoReloadDesc")}
            </p>
          </div>
          <button className="w-12 h-6 rounded-full bg-secondary relative">
            <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("credits.autoReloadHint")}
        </p>
      </div>
    </div>
  );
}
