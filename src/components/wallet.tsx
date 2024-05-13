import clsx from "clsx";
import {useEffect, useMemo, useState} from "react";
import useUserData from "@/hooks/useUserData";
import UseUserData from "@/hooks/useUserData";



type userData = {
    id?: number;
    username?: string;
    lastName?: string;
    firstName?: string;
    photo_url?: string;
    money?: number | undefined;
}

interface WalletProps {
    isOpen: boolean;
    onClose: () => void;
    user: userData;

}

const Wallet: React.FC<WalletProps> = ({ isOpen, onClose, user   }) => {



    let OpenClassWrapper = isOpen?"top-0":"top-[100%]";
    let OpenClassContent = isOpen?"top-0":"top-[-100%]";


    return (
        <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]   duration-150  fixed inset-0 z-40  bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden")} >
            <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-gray-700 p-6 w-full rounded-lg shadow-xl")}>

                <div className="flex mt-4 flex-col items-center justify-center w-full gap-3">

                    <div
                        className="bg-gray-800 rounded-lg border-[#6457E0] border-2 border-opacity-50 p-5 flex  gap-[10%] items-center justify-center w-full">
                        <div className="flex flex-col gap-2">
                            <h5 className="font-bold text-sm sm:text-lg">ваш баланс</h5>
                            <h4 className="font-extrabold text-[#6457E0] text-lg sm:text-2xl">{user?.money}</h4>
                            {/*<h5 className="font-bold text-sm sm:text-lg">20 TON</h5>*/}
                        </div>
                        <div className="w-[33%]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0}
                                 stroke="#6457E0" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"/>
                            </svg>
                        </div>
                    </div>
                    {/*<div*/}
                    {/*    className="bg-gray-800 rounded-lg border-[#6457E0] border-2 border-opacity-50 p-5 flex mt-4 gap-[10%] items-center justify-center w-full">*/}

                    {/*    <div className="flex flex-col gap-4">*/}
                    {/*        <div className="px-5 flex justify-center gap-6 items-center">*/}
                    {/*            <h5 className="font-bold  text-lg sm:text-2xl">Пополнить </h5>*/}
                    {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*                 strokeWidth={1.0} stroke="#6457E0" className="w-[33%] h-full">*/}
                    {/*                <path strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                </div>

            </div>
        </div>
    );
};

export default Wallet;


