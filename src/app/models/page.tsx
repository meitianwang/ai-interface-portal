"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { models, categories, providers } from "@/lib/models-data";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  ArrowUpDown,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = "popular" | "newest" | "price-low" | "price-high" | "context";
type ViewMode = "grid" | "list";

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filteredModels = useMemo(() => {
    let result = [...models];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.provider.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "free") {
        result = result.filter((m) => m.isFree);
      } else {
        result = result.filter((m) => m.tags.includes(selectedCategory));
      }
    }

    // Provider filter
    if (selectedProviders.length > 0) {
      result = result.filter((m) => selectedProviders.includes(m.provider));
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low":
        result.sort((a, b) => a.inputPrice - b.inputPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.inputPrice - a.inputPrice);
        break;
      case "context":
        result.sort((a, b) => b.contextLength - a.contextLength);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedProviders, sortBy]);

  const toggleProvider = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "context", label: "Context: High to Low" },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    if (price < 0.01) return `$${price.toFixed(4)}`;
    if (price < 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatContext = (length: number) => {
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
    return length.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                          selectedCategory === cat.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Providers */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Providers
                  </h3>
                  <div className="space-y-1">
                    {providers.map((provider) => (
                      <button
                        key={provider}
                        onClick={() => toggleProvider(provider)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                          selectedProviders.includes(provider)
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center",
                            selectedProviders.includes(provider)
                              ? "bg-primary border-primary"
                              : "border-border"
                          )}
                        >
                          {selectedProviders.includes(provider) && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span>{provider}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedProviders.length > 0 && (
                  <button
                    onClick={() => setSelectedProviders([])}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Models</h1>
                <p className="text-muted-foreground">
                  Browse {models.length}+ models from {providers.length}+ providers
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Mobile Filters Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 h-10 px-4 bg-secondary rounded-lg text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 h-10 px-4 bg-secondary rounded-lg text-sm min-w-[180px] justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      <span>
                        {sortOptions.find((o) => o.value === sortBy)?.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        sortDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {sortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value as SortOption);
                            setSortDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2 text-sm text-left hover:bg-secondary transition-colors",
                            sortBy === option.value && "text-primary"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "grid"
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "list"
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 bg-secondary rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-colors",
                          selectedCategory === cat.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border border-border"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredModels.length} models
              </p>

              {/* Models Grid/List */}
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "space-y-3"
                )}
              >
                {filteredModels.map((model) => (
                  <Link
                    key={model.id}
                    href={`/models/${model.id}`}
                    className={cn(
                      "group block rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                      viewMode === "list" && "flex items-center"
                    )}
                  >
                    {viewMode === "grid" ? (
                      // Grid View
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
                              model.provider === "Anthropic" && "bg-orange-500",
                              model.provider === "OpenAI" && "bg-emerald-600",
                              model.provider === "Google" && "bg-blue-500",
                              model.provider === "Meta" && "bg-blue-600",
                              model.provider === "Mistral AI" && "bg-violet-600",
                              model.provider === "DeepSeek" && "bg-cyan-600",
                              model.provider === "Alibaba" && "bg-orange-600",
                              model.provider === "Cohere" && "bg-rose-600",
                              model.provider === "Hugging Face" && "bg-yellow-500",
                              model.provider === "Nous Research" && "bg-purple-600",
                              model.provider === "Perplexity" && "bg-teal-600"
                            )}
                          >
                            {model.providerLogo}
                          </div>
                          <div className="flex gap-1.5">
                            {model.isNew && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 rounded-full">
                                New
                              </span>
                            )}
                            {model.isFree && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {model.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {model.provider}
                        </p>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {model.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                          <div>
                            <span className="text-muted-foreground">Context: </span>
                            <span className="font-medium">
                              {formatContext(model.contextLength)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Input: </span>
                            <span className="font-medium">
                              {formatPrice(model.inputPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="flex items-center gap-4 p-4 w-full">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0",
                            model.provider === "Anthropic" && "bg-orange-500",
                            model.provider === "OpenAI" && "bg-emerald-600",
                            model.provider === "Google" && "bg-blue-500",
                            model.provider === "Meta" && "bg-blue-600",
                            model.provider === "Mistral AI" && "bg-violet-600",
                            model.provider === "DeepSeek" && "bg-cyan-600",
                            model.provider === "Alibaba" && "bg-orange-600",
                            model.provider === "Cohere" && "bg-rose-600",
                            model.provider === "Hugging Face" && "bg-yellow-500",
                            model.provider === "Nous Research" && "bg-purple-600",
                            model.provider === "Perplexity" && "bg-teal-600"
                          )}
                        >
                          {model.providerLogo}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                              {model.name}
                            </h3>
                            {model.isNew && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-500/20 text-emerald-400 rounded-full">
                                New
                              </span>
                            )}
                            {model.isFree && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {model.provider}
                          </p>
                        </div>

                        <div className="hidden sm:flex items-center gap-6 text-sm">
                          <div className="text-right">
                            <p className="text-muted-foreground">Context</p>
                            <p className="font-medium">
                              {formatContext(model.contextLength)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">Input</p>
                            <p className="font-medium">
                              {formatPrice(model.inputPrice)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">Output</p>
                            <p className="font-medium">
                              {formatPrice(model.outputPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {filteredModels.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No models found</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedProviders([]);
                    }}
                    className="text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
