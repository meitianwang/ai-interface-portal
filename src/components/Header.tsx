"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, User, Settings, Key, LogOut, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { name: "Models", href: "/models" },
  { name: "Chat", href: "/chat" },
  { name: "Rankings", href: "/rankings" },
  { name: "Enterprise", href: "/enterprise" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
];

export function Header() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
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
              <span className="font-semibold text-lg tracking-tight">OpenRouter</span>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-80 h-9 pl-10 pr-8 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border font-mono">
                  /
                </kbd>
              </div>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Auth */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-secondary animate-pulse" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-secondary transition-colors"
                >
                  {getUserAvatar() ? (
                    <img
                      src={getUserAvatar()}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {getUserInitials()}
                    </div>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium truncate">
                        {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/settings/keys"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        <Key className="w-4 h-4 text-muted-foreground" />
                        API Keys
                      </Link>
                      <Link
                        href="/settings/credits"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        Credits
                      </Link>
                      <Link
                        href="/settings/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        Profile
                      </Link>
                      <Link
                        href="/settings/preferences"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Preferences
                      </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors w-full text-left text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}

            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t border-border my-2" />
                <Link
                  href="/settings/keys"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  API Keys
                </Link>
                <Link
                  href="/settings/preferences"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2.5 text-sm text-red-500 hover:text-red-400 transition-colors rounded-lg hover:bg-secondary text-left"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="sm:hidden mt-3 h-10 px-4 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
