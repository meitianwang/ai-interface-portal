"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { useI18n } from "@/lib/i18n-context";
import { Loader2, Check, Moon, Sun, Monitor, Bell, Mail, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Preferences {
  theme: "light" | "dark" | "system";
  language: string;
  email_notifications: boolean;
  marketing_emails: boolean;
  usage_alerts: boolean;
  low_balance_alert_threshold: number;
  data_collection_consent: boolean;
}

const languages = [
  { id: "en", name: "English" },
  { id: "zh", name: "中文" },
];

const defaultPreferences: Preferences = {
  theme: "dark",
  language: "en",
  email_notifications: true,
  marketing_emails: false,
  usage_alerts: true,
  low_balance_alert_threshold: 5,
  data_collection_consent: true,
};

export default function SettingsPreferencesPage() {
  const { user } = useAuth();
  const { theme: currentTheme, setTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();
  const supabase = createClient();
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading preferences:", error);
      }

      if (data) {
        setPreferences({
          theme: data.theme || defaultPreferences.theme,
          language: data.language || defaultPreferences.language,
          email_notifications: data.email_notifications ?? defaultPreferences.email_notifications,
          marketing_emails: data.marketing_emails ?? defaultPreferences.marketing_emails,
          usage_alerts: data.usage_alerts ?? defaultPreferences.usage_alerts,
          low_balance_alert_threshold: data.low_balance_alert_threshold ?? defaultPreferences.low_balance_alert_threshold,
          data_collection_consent: data.data_collection_consent ?? defaultPreferences.data_collection_consent,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (updates: Partial<Preferences>) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const newPrefs = { ...preferences, ...updates };
      setPreferences(newPrefs);

      const { error } = await supabase
        .from("user_preferences")
        .update(updates)
        .eq("user_id", user.id);

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    if (newLang === "en" || newLang === "zh") {
      setLocale(newLang);
      setPreferences(prev => ({ ...prev, language: newLang }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
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
          <h1 className="text-2xl font-bold mb-1">{t("preferences.title")}</h1>
          <p className="text-muted-foreground">
            {t("preferences.subtitle")}
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <Check className="w-4 h-4" />
            {t("common.saved")}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Theme */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-1">{t("preferences.theme.title")}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t("preferences.theme.subtitle")}
          </p>
          <div className="flex gap-3">
            {[
              { id: "light", nameKey: "preferences.theme.light", icon: Sun },
              { id: "dark", nameKey: "preferences.theme.dark", icon: Moon },
              { id: "system", nameKey: "preferences.theme.system", icon: Monitor },
            ].map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id as "light" | "dark" | "system");
                    setPreferences(prev => ({ ...prev, theme: themeOption.id as Preferences["theme"] }));
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
                    currentTheme === themeOption.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(themeOption.nameKey)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-1">{t("preferences.language.title")}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t("preferences.language.subtitle")}
          </p>
          <select
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full max-w-md h-10 px-4 bg-secondary rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div>
              <h2 className="font-semibold">{t("preferences.notifications.title")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("preferences.notifications.subtitle")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("preferences.notifications.email.title")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("preferences.notifications.email.subtitle")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => savePreferences({ email_notifications: !preferences.email_notifications })}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  preferences.email_notifications ? "bg-primary" : "bg-secondary"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                    preferences.email_notifications ? "translate-x-6" : "translate-x-0.5"
                  )}
                />
              </button>
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
              <div>
                <p className="font-medium">{t("preferences.notifications.marketing.title")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("preferences.notifications.marketing.subtitle")}
                </p>
              </div>
              <button
                onClick={() => savePreferences({ marketing_emails: !preferences.marketing_emails })}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  preferences.marketing_emails ? "bg-primary" : "bg-secondary"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                    preferences.marketing_emails ? "translate-x-6" : "translate-x-0.5"
                  )}
                />
              </button>
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("preferences.notifications.usage.title")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("preferences.notifications.usage.subtitle")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => savePreferences({ usage_alerts: !preferences.usage_alerts })}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  preferences.usage_alerts ? "bg-primary" : "bg-secondary"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                    preferences.usage_alerts ? "translate-x-6" : "translate-x-0.5"
                  )}
                />
              </button>
            </label>

            {preferences.usage_alerts && (
              <div className="pl-4 border-l-2 border-border ml-2">
                <label className="block text-sm font-medium mb-2">
                  {t("preferences.notifications.threshold.title")}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={preferences.low_balance_alert_threshold}
                    onChange={(e) =>
                      savePreferences({
                        low_balance_alert_threshold: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-24 h-10 px-3 bg-secondary rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    min="0"
                    step="1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("preferences.notifications.threshold.subtitle")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
