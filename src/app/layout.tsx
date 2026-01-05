"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <html lang="en">
      <head>
        <title>Musinsa-Bay</title>
      </head>
      <body>
        <StyledComponentsRegistry>
          <SessionContextProvider supabaseClient={supabase}>
            {children}
          </SessionContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
