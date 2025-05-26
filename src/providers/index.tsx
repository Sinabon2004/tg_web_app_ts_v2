"use client";
import Image from "next/image";
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
    return (
          <div
            className={
              "h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"
            }
          >
            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка</h2>
            <Image
              className={"w-[30%] ml-8"}
              src={"/animated/loading.svg"}
              width={100}
              height={100}
              alt={"loading"}
            />
          </div>
        );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SDKProvider>{children}</SDKProvider>
    </QueryClientProvider>
  );
}
