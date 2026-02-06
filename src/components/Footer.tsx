import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Chat", href: "/chat" },
    { name: "Rankings", href: "/rankings" },
    { name: "Models", href: "/models" },
    { name: "Providers", href: "/providers" },
    { name: "Pricing", href: "/pricing" },
    { name: "Enterprise", href: "/enterprise" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Announcements", href: "/announcements" },
    { name: "Careers", href: "/careers", badge: "Hiring" },
    { name: "Partners", href: "/partners" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Support", href: "/support" },
    { name: "State of AI", href: "/state-of-ai" },
    { name: "Works With OR", href: "/works-with" },
  ],
  developer: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api" },
    { name: "SDK", href: "/docs/sdk" },
    { name: "Status", href: "https://status.openrouter.ai" },
  ],
  connect: [
    { name: "Discord", href: "https://discord.gg/openrouter" },
    { name: "GitHub", href: "https://github.com/openrouter" },
    { name: "LinkedIn", href: "https://linkedin.com/company/openrouter" },
    { name: "X", href: "https://x.com/openrouter" },
    { name: "YouTube", href: "https://youtube.com/@openrouter" },
  ],
};

export function Footer() {
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
            <h4 className="font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
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
            <h4 className="font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
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
            <h4 className="font-semibold mb-5">Developer</h4>
            <ul className="space-y-3">
              {footerLinks.developer.map((link) => (
                <li key={link.name}>
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
            <h4 className="font-semibold mb-5">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
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
