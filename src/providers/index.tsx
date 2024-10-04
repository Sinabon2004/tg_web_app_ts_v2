"use client";
import {
  LaunchParams,
  SDKProvider,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";

import { QueryClient, QueryClientProvider } from "react-query";

import { useEffect, useState } from "react";

export default function MyAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const [isClient, setIsClient] = useState(false);
  const [TgData, setTgData] = useState<LaunchParams | null>(null);

  useEffect(() => {
    // Ensure the code runs only on the client side

    setIsClient(true);
    import("eruda")
      .then((eruda) => {
        eruda.default.init();
      })
      .catch((err) => {
        console.error("Failed to load eruda:", err);
      });
    const initData = retrieveLaunchParams();
    if (initData) {
      setTgData(initData);
    }
  }, []);

  if (!isClient || !TgData) {
    // Optionally, return a loader or null while initializing
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SDKProvider>{children}</SDKProvider>
    </QueryClientProvider>
  );
}
