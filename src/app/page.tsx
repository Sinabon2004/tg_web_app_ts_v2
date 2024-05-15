"use client"

import Header from "@/components/header";
import {SDKProvider} from "@tma.js/sdk-react";
import {BackButton, init, postEvent} from "@tma.js/sdk";

import Games from "@/components/games";
import {startEruda} from "@/services/eruda";
import {useEffect} from "react";


export default function Home() {
    const {viewport, miniApp,initData} = init();
    startEruda();
    viewport.expand();
    const backButton = new BackButton(true, '6.3', postEvent);
    backButton.hide();


    //
    // useEffect(() => {
    //     if (initData?.startParam) {
    //         console.log(initData?.startParam);
    //     }
    // }, [initData?.startParam]);


    return (

        <SDKProvider>

            <div className="bg-gray-800  flex justify-center ">

                <Header/>
                <Games/>

            </div>

        </SDKProvider>

    );
}
