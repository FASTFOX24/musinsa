"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function Home() {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google 로그인 에러:", error.message);
    } else {
      console.log("Google 로그인 시도 중:", data);
    }
  };

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth Event:", event);
        console.log("Session:", session);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <main>
      <h1>Google 로그인 테스트</h1>
      <button onClick={signInWithGoogle}>구글로 로그인하기</button>
    </main>
  );
}
