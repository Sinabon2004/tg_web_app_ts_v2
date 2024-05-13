"use client"

import { useState } from 'react';
import Wallet from "@/components/wallet";
import Avatar from "@/components/avatar";
import Profile from "@/components/profile";
import useUserData from "@/hooks/useUserData";
import moneyFormat from "@/utils/moneyFormat";

interface User {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    photo_url?: string;
    money?: number

    // Add other properties as needed (e.g., email, id)
}
export default function User(props: { user?: User }) {

    const user =props.user;

    const money = moneyFormat(user?.money)









    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleWalletClick = () => {
        setIsWalletOpen(!isWalletOpen);
        if (isProfileOpen) setIsProfileOpen(false);
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };


    return (
        <div className=" h-[80px]  mx-auto px-6 py-5 flex justify-between items-center">
            <div >
                <img src="/next.svg" className="w-[100px]" alt=""/>
            </div>
            <div className="flex gap-4 p-0 justify-center items-center">
                <button
                    onClick={handleWalletClick}
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none">
                    <div
                        className="h-10 gap-2 relative flex items-center px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"/>
                        </svg>

                        <h5 className="leading-none">{money}</h5>

                    </div>

                </button>


                <Wallet isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} money={money}/>

                <button
                    onClick={handleProfileClick}
                    className="h-10 bg-gradient-to-br  from-purple-600 to-blue-500 text-white px-3 rounded-2xl
                                   hover:bg-blue-800 transition-colors
                                   flex items-center justify-between
                                    shadow-md hover:shadow-lg gap-3 py-6 ">
                    <div className='flex items-center py-2 justify-between gap-2'>
                        <div className="flex items-center ">
                            <Avatar user={user} className={"h-10 w-10 rounded-full"}/>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold">{user?.username}</h5>
                    </div>
                </button>
                <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user}/>
            </div>
        </div>
    );
}
