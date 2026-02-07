"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    product: [
      { name: t("nav.chat"), href: "/chat" },
      { name: t("nav.rankings"), href: "/rankings" },
      { name: t("nav.models"), href: "/models" },
      { name: t("nav.pricing"), href: "/pricing" },
      { name: t("nav.enterprise"), href: "/enterprise" },
    ],
    company: [
      { name: t("footer.about"), href: "/about" },
      { name: t("footer.announcements"), href: "/announcements" },
      { name: t("footer.careers"), href: "/careers", badge: "Hiring" },
      { name: t("footer.partners"), href: "/partners" },
      { name: t("footer.termsOfService"), href: "/terms" },
      { name: t("footer.support"), href: "/support" },
    ],
    developer: [
      { name: t("footer.documentation"), href: "/docs" },
      { name: t("footer.apiReference"), href: "/docs/api" },
      { name: t("footer.sdk"), href: "/docs/sdk" },
      { name: t("footer.status"), href: "https://status.openrouter.ai" },
    ],
    connect: [
      { name: "Discord", href: "https://discord.gg/openrouter" },
      { name: "GitHub", href: "https://github.com/openrouter" },
      { name: "LinkedIn", href: "https://linkedin.com/company/openrouter" },
      { name: "X", href: "https://x.com/openrouter" },
      { name: "YouTube", href: "https://youtube.com/@openrouter" },
    ],
  };

  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-primary-foreground"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-xl tracking-tight">OpenRouter</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2026 OpenRouter, Inc
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-5">{t("footer.product")}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-5">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="font-semibold mb-5">{t("footer.developer")}</h4>
            <ul className="space-y-3">
              {footerLinks.developer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-5">{t("footer.connect")}</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
