// app/(auth)/login/page.tsx
"use client"; // Mark as client component

import { signIn } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const handleLogin = () => {
    signIn.social({
      provider: "github",
      callbackURL: "/dashboard", // Redirect here after login
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={handleLogin}>
        Sign in with GitHub
      </Button>
    </div>
  );
}
