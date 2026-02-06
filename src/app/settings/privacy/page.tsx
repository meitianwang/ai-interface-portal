"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Shield, Eye, Trash2, Download, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPrivacyPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [dataConsent, setDataConsent] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    try {
      const { data } = await supabase
        .from("user_preferences")
        .select("data_collection_consent")
        .eq("user_id", user?.id)
        .single();

      if (data) {
        setDataConsent(data.data_collection_consent);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConsent = async (value: boolean) => {
    setDataConsent(value);
    try {
      await supabase
        .from("user_preferences")
        .update({ data_collection_consent: value })
        .eq("user_id", user?.id);
    } catch (error) {
      console.error("Error updating consent:", error);
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Privacy</h1>
        <p className="text-muted-foreground">
          Manage your data and privacy settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Data Collection */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Data Collection</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow us to collect anonymous usage data to improve our services
                  </p>
                </div>
                <button
                  onClick={() => updateConsent(!dataConsent)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    dataConsent ? "bg-primary" : "bg-secondary"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                      dataConsent ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                <p className="mb-2">We collect:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Aggregated usage statistics</li>
                  <li>Performance metrics</li>
                  <li>Error reports</li>
                </ul>
                <p className="mt-2">We never collect your prompts or API responses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Data */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Download Your Data</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Get a copy of all your data stored on OpenRouter
              </p>
              <button className="mt-4 h-10 px-4 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm">
                Request Data Export
              </button>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Chat History</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your chat history is stored locally in your browser and is not sent to our servers
              </p>
              <button className="mt-4 h-10 px-4 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm text-red-500">
                Clear Local Chat History
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-red-500">Delete Account</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-4 h-10 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md mx-4 rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-xl font-bold">Delete Account</h2>
            </div>

            <p className="text-muted-foreground mb-4">
              This will permanently delete your account, including:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mb-6 space-y-1">
              <li>Your profile and preferences</li>
              <li>All API keys</li>
              <li>Usage history</li>
              <li>Any remaining credits (non-refundable)</li>
            </ul>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Type <span className="font-mono text-red-500">delete my account</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="delete my account"
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation("");
                }}
                className="flex-1 h-10 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmation !== "delete my account"}
                className="flex-1 h-10 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
