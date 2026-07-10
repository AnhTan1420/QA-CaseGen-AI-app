import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81,transparent_35%)]" />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </main>
  );
}
