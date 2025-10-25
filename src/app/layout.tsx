// app/layout.tsx는 Next.js 내부 런타임에서 자동으로 불러오는 특수 파일

"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

export default function RootLayout({ // RootLayout은 개발자가 직접 import하는 게 아니라, Next.js가 자동으로 최상위에서 감싼다..
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => // useState를 사용해서 인스턴스를 한 번만 생성. 이외에 재렌더링 시에 인스턴스를 생성하지 않도록 함.
    createBrowserClient( // supabase 인스턴스 생성. supabase를 사용한 로그인, DB 접근 등에 필요한 유틸함수를 포함하고 있음.
      process.env.NEXT_PUBLIC_SUPABASE_URL!, // !를 붙여서 “이건 undefined가 아니야!”라고 명시해서 타입 에러를 방지.
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <html lang="en">
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
