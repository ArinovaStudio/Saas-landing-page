"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import {
  ShoppingBag,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Apple,
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isVerified = searchParams.get("verified") === "true";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      if (res?.ok) {
        router.refresh();
        const session = await getSession();
        const userRole = String(session?.user?.role || "").toUpperCase();
        
        if (userRole === "ADMIN") {
          window.location.href = "/dashboard";
        } else {
          let callbackUrl = searchParams.get("callbackUrl") || "/";
          if (callbackUrl.includes("/login")) {
            callbackUrl = "/";
          }
          window.location.href = callbackUrl;
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true);
    setError("");
    try {
      let callbackUrl = searchParams.get("callbackUrl") || "/";
      if (callbackUrl.includes("/login")) {
        callbackUrl = "/";
      }
      await signIn(provider, { callbackUrl });
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafd] to-[#e8f4f8] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#050a30] tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {isVerified && !error && (
          <div className="mb-6 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
            ✓ Email verified successfully! Please login to continue.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 h-12 placeholder:text-gray-400 text-gray-900 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12 placeholder:text-gray-400 text-gray-900 rounded-xl border-gray-200 bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-4 bg-pink-600/80 hover:bg-pink-700 text-white rounded-xl text-base font-semibold shadow-md shadow-pink-200 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-xs text-gray-400 font-medium">
            Or continue with
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            disabled={isLoading}
            variant="outline"
            className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>

          <Button
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            disabled={isLoading}
            variant="outline"
            className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Github className="h-5 w-5 text-gray-700 fill-current" />
          </Button>

          <Button
            type="button"
            onClick={() => handleOAuthSignIn("twitter")}
            disabled={isLoading}
            variant="outline"
            className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1DA1F2">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </Button>

          <Button
            type="button"
            onClick={() => handleOAuthSignIn("apple")}
            disabled={isLoading}
            variant="outline"
            className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Apple className="h-5 w-5 text-black fill-current" />
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const session = await getSession(); 
      if (session) {
        const role = String(session.user?.role || "").toUpperCase();
        if (role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        setIsChecking(false);
      }
    };
    verifyUser();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafd] to-[#e8f4f8] flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafd] to-[#e8f4f8] flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
