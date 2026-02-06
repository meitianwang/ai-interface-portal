import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertCircle } from "lucide-react";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Authentication Error</h1>
          <p className="text-muted-foreground mb-6">
            There was an error during the authentication process. Please try again.
          </p>
          <Link
            href="/login"
            className="inline-flex h-10 px-6 items-center justify-center bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
