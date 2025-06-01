"use client";

import Logo from "@/components/Logo";

import useUserData from "@/hooks/useUserData";
import {
  InitData,
  LaunchParams,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";
import ShowStat from "./ShowStat";
import { useEffect, useState } from "react";
import { log } from "console";
import Menu from './Menu'

type userData = {
  // id: number;
  // username?: string;
  // lastName: string;
  // firstName: string;
  avatar_url: string | null | undefined;
  money: number;
};
export default function Header() {
  const [isReady, setReady] = useState(false);
  const [TgData, setTgData] = useState<LaunchParams | null>(null);
  useEffect(() => {
    setReady(true);
    const initData = retrieveLaunchParams();
    if (initData) {
      setTgData(initData);
    }
  }, []);
  const userData: any = useUserData(TgData?.initData?.user?.id);
  const user = {
    ...TgData?.initData?.user,
    ...userData,
  };
  if (!isReady || !userData) {
    return null;
  }
  return (
    <header
      className="backdrop-blur-[10px] bg-black fixed w-full top-0 z-10 p-3
                       flex justify-between items-center"
    >
      <Logo />
      <div className="flex gap-1 items-center">
        <ShowStat src="/images/ticket.png" value={user.money} />
        {/* <ShowStat src="/images/star.png" value={"0"} /> */}
        <Menu user={user}/>
      </div>
      {/* <User user={user} /> */}
    </header>
  );
}
