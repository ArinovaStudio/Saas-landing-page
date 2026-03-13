"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./AuthContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}ḍ
      </AuthProvider>
    </SessionProvider>
  );
}

// Re-export hooks for convenience
export { useAuth } from "./AuthContext";
