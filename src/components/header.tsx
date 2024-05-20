"use client"

import useHeaderLogic from '@/hooks/useHeaderLogic';
import Wallet from "@/components/wallet";
import Avatar from "@/components/avatar";
import Profile from "@/components/profile";
import User from "@/components/user";
import {init} from "@tma.js/sdk";
import useGameData from "@/hooks/useGameData";
import useUserData from "@/hooks/useUserData";

type userData = {
    // id: number;
    // username?: string;
    // lastName: string;
    // firstName: string;
    avatar_url: string | null | undefined;
    money: number;
}
export default function Header() {


    const { initData} = init();
    const userData:userData | undefined = useUserData(initData?.user?.id);
    const user = {
        ...initData?.user,
        ...userData
    }




    return (

        <header className="bg-gray-900 text-gray-200 shadow-lg fixed w-full top-0 z-10 py-1">
            <User user={user} />
        </header>
    );
}


