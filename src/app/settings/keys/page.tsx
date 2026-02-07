"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n-context";
import {
  Key,
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  CreditCard,
  ArrowRight,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export default function SettingsKeysPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const supabase = createClient();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load API keys
      const { data: keys } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (keys) setApiKeys(keys);

      // Load credits
      const { data: creditsData } = await supabase
        .from("user_credits")
        .select("balance")
        .eq("user_id", user?.id)
        .single();

      if (creditsData) setCredits(creditsData.balance);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, keyPrefix: string) => {
    navigator.clipboard.writeText(keyPrefix);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this API key?");
    if (!confirmed) return;

    try {
      await supabase.from("api_keys").delete().eq("id", id);
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (error) {
      console.error("Error deleting key:", error);
    }
  };

  const generateApiKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let key = "sk-or-v1-";
    for (let i = 0; i < 48; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const hashKey = async (key: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleCreate = async () => {
    if (!newKeyName.trim() || !user) return;

    setIsCreating(true);
    try {
      const fullKey = generateApiKey();
      const keyHash = await hashKey(fullKey);
      const keyPrefix = fullKey.substring(0, 12) + "..." + fullKey.substring(fullKey.length - 4);

      const { data, error } = await supabase
        .from("api_keys")
        .insert({
          user_id: user.id,
          name: newKeyName,
          key_hash: keyHash,
          key_prefix: keyPrefix,
        })
        .select()
        .single();

      if (error) throw error;

      setApiKeys((prev) => [data, ...prev]);
      setNewlyCreatedKey(fullKey);
      setNewKeyName("");
    } catch (error) {
      console.error("Error creating key:", error);
      alert("Failed to create API key");
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          <h1 className="text-2xl font-bold mb-1">{t("keys.title")}</h1>
          <p className="text-muted-foreground">
            {t("keys.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t("keys.createKey")}
        </button>
      </div>

      {/* Credits Card */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("credits.availableCredits")}</p>
              <p className="text-2xl font-bold">${credits.toFixed(2)}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 h-10 px-4 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors">
            {t("credits.addCredits")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* API Keys List */}
      {apiKeys.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Key className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-2">{t("keys.noKeys")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t("keys.createFirst")}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t("keys.createKey")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Key className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("keys.created")} {formatDate(apiKey.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setShowKey(showKey === apiKey.id ? null : apiKey.id)
                    }
                    className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {showKey === apiKey.id ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleCopy(apiKey.id, apiKey.key_prefix)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {copiedKey === apiKey.id ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(apiKey.id)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <code className="flex-1 px-3 py-2 bg-secondary rounded-lg font-mono text-muted-foreground">
                  {showKey === apiKey.id
                    ? "sk-or-v1-" + "x".repeat(48)
                    : apiKey.key_prefix}
                </code>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {t("keys.lastUsed")}: {apiKey.last_used_at ? formatDate(apiKey.last_used_at) : t("keys.never")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Security Note */}
      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">{t("keys.keepSecure")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("keys.securityTip")}
            </p>
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md mx-4 rounded-2xl bg-card border border-border p-6">
            {newlyCreatedKey ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{t("keys.keyCreated")}</h2>
                </div>
                <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-500">
                      {t("keys.copyWarning")}
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t("keys.yourApiKey")}</label>
                  <div className="relative">
                    <code className="block w-full px-3 py-3 bg-secondary rounded-lg font-mono text-sm break-all">
                      {newlyCreatedKey}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(newlyCreatedKey);
                        setCopiedKey("new");
                        setTimeout(() => setCopiedKey(null), 2000);
                      }}
                      className="absolute right-2 top-2 p-2 rounded-lg hover:bg-background transition-colors"
                    >
                      {copiedKey === "new" ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewlyCreatedKey(null);
                  }}
                  className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {t("common.done")}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">{t("keys.createKey")}</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t("keys.keyName")}</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder={t("keys.keyNamePlaceholder")}
                    className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isCreating}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    disabled={isCreating}
                    className="flex-1 h-10 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={isCreating || !newKeyName.trim()}
                    className="flex-1 h-10 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("common.creating")}
                      </>
                    ) : (
                      t("common.create")
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
