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


                </div>

            </div>
        </div>
    );
};

export default Wallet;


