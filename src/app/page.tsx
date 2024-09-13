"use client"
import Main from "@/components/Main";
import {startEruda} from "@/services/eruda";
import {useEffect} from "react";
import {BackButton, initViewport, postEvent, SDKProvider} from "@telegram-apps/sdk-react";
import Header from "@/components/header";
import Games from "@/components/games";
import {useDidMount} from '@/hooks/useDidMount';

function Home() {
    startEruda();


    useEffect(() => {
        const initializeViewport = async () => {
            const [viewport] = initViewport();
            const vp = await viewport;
            if (!vp.isExpanded) {
                vp.expand(); // will expand the Mini App, if it's not
            }
        };
        initializeViewport();
        const backButton = new BackButton(true, '6.3', postEvent);
        backButton.hide();
    }, []);

    const didMount = useDidMount();
    return didMount ? (
        <div className="bg-gray-800 flex justify-center">
            <SDKProvider>
                <Header/>
                <Games/>
            </SDKProvider>
        </div>
    ) : <div>Loading</div>;
}

export default Home;
