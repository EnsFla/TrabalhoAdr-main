// app/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de login automaticamente
    router.push("/login");
  }, [router]);

  return null; // Não renderiza nada, pois o redirecionamento já ocorre
}
