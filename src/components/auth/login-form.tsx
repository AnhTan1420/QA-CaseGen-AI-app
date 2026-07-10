"use client";

import { GitBranch } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  async function signInWithProvider(provider: "google" | "github") {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      alert("Add Supabase environment variables to enable authentication.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in to QA CaseGen AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" onClick={() => signInWithProvider("google")}>
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() => signInWithProvider("github")}>
          <GitBranch className="h-4 w-4" />
          Continue with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
