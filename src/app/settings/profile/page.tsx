"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Check, Camera, User } from "lucide-react";

interface Profile {
  full_name: string;
  display_name: string;
  bio: string;
  website: string;
  company: string;
  location: string;
  avatar_url: string;
}

export default function SettingsProfilePage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    display_name: "",
    bio: "",
    website: "",
    company: "",
    location: "",
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile:", error);
      }

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          display_name: data.display_name || "",
          bio: data.bio || "",
          website: data.website || "",
          company: data.company || "",
          location: data.location || "",
          avatar_url: data.avatar_url || user?.user_metadata?.avatar_url || "",
        });
      } else {
        // Use data from auth
        setProfile({
          full_name: user?.user_metadata?.full_name || user?.user_metadata?.name || "",
          display_name: "",
          bio: "",
          website: "",
          company: "",
          location: "",
          avatar_url: user?.user_metadata?.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          display_name: profile.display_name,
          bio: profile.bio,
          website: profile.website,
          company: profile.company,
          location: profile.location,
        })
        .eq("id", user.id);

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
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
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground">
            Manage your public profile information
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <Check className="w-4 h-4" />
            Saved
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Avatar</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Click the camera icon to upload a new avatar.</p>
              <p>Recommended size: 256x256 pixels</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder="John Doe"
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={profile.display_name}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                placeholder="johndoe"
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This will be shown publicly if you share apps
              </p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Bio</h2>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Tell us a bit about yourself..."
            rows={3}
            className="w-full px-4 py-3 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {profile.bio.length}/160 characters
          </p>
        </div>

        {/* Links & Location */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Additional Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                placeholder="https://example.com"
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                placeholder="Acme Inc."
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="w-full h-10 px-4 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Email</h2>
          <div className="flex items-center gap-4">
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="flex-1 h-10 px-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground border border-transparent cursor-not-allowed"
            />
            <span className="text-xs text-muted-foreground">
              Email cannot be changed
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="h-10 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
