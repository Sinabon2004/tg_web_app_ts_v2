"use client"

import Header from "@/components/header";
import Games from "@/components/games";
import { SDKProvider } from "@tma.js/sdk-react";
import { BackButton, init, postEvent } from "@tma.js/sdk";
import { useEffect } from "react";
import {startEruda} from "@/services/eruda";

export default function Main() {

    startEruda();

    useEffect(() => {
        const { viewport } = init();
        viewport.expand();
        const backButton = new BackButton(true, '6.3', postEvent);
        backButton.hide();
    }, []);


    return (
        <div className="bg-gray-800 flex justify-center">
            <SDKProvider>
                <Header />
                <Games />
            </SDKProvider>
        </div>
    );
}
