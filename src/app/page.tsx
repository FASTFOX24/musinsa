"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function Home() {
  async function getData() {
    const { data: movies, error } = await supabase.from("movies").select("*");
    console.log("데이터베이스로부터 받아온 movies", movies);
  }

  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}
