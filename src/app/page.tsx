"use client";
import Header from "@/components/header";
import Games from "@/components/games";
import Image from "next/image";
import QuickRoutes from "@/components/QuickRoutes";
import { initViewport, useViewport } from "@telegram-apps/sdk-react";
function Home() {
  const viewport = useViewport();

  if (viewport === null) {
    
    return (
          <div
            className={
              "h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"
            }
          >
            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка игр</h2>
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
    <div className="relative">
      <div className="absolute bg-primary-dark-blue inset-0">
        <img className="w-full h-dvh" src="/images/background.png" alt="" />
      </div>
      <Header />
      <Games />
      <QuickRoutes />
    </div>
  );
}


export default Home;
