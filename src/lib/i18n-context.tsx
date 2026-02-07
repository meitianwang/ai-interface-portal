"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

type Locale = "en" | "zh";
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, zh };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}

export function useTranslation() {
  const { t, locale } = useI18n();
  return { t, locale };
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const supabase = createClient();
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const loadLocale = async () => {
      // First check localStorage
      const stored = localStorage.getItem("locale") as Locale | null;
      if (stored && (stored === "en" || stored === "zh")) {
        setLocaleState(stored);
      }

      // If logged in, load from database
      if (user) {
        const { data } = await supabase
          .from("user_preferences")
          .select("language")
          .eq("user_id", user.id)
          .single();

        if (data?.language && (data.language === "en" || data.language === "zh")) {
          setLocaleState(data.language);
          localStorage.setItem("locale", data.language);
        }
      }
    };

    loadLocale();
  }, [user, supabase]);

  const setLocale = useCallback(async (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);

    // Save to database if logged in
    if (user) {
      await supabase
        .from("user_preferences")
        .update({ language: newLocale })
        .eq("user_id", user.id);
    }
  }, [user, supabase]);

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
