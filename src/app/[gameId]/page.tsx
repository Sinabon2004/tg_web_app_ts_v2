"use client"

import {useRouter} from "next/navigation";
import useGameData from "@/hooks/useGameData";
import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import {BackButton, postEvent} from "@tma.js/sdk";

export default function GameDetailsPage(
    {params}: {
        params: { gameId: number }
    }

) {
    const gameData = useGameData(params.gameId);

    const router = useRouter();
    const backButton = new BackButton(true, '6.3', postEvent);
    backButton.show();
    backButton.on("click", ()=>{
        router.push("/");
    })

    if (!gameData) {
        return <div className={"h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"}>
            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка игры</h2>
            <Image className={"w-[30%] ml-8"} src={"/animated/loading.svg"} width={100} height={100}   alt={"loading"}/>
        </div>; // Show a loading message while fetching data
    }

    const {id, title, description, thumbnail_url  } = gameData;
    return (

        <div className={"h-[100dvh] w-full flex justify-center mt-[80px] bg-gray-800"} >
            <Header/>

            <div className={"bg-gray-900 py-8 px-4 max-w-[500px] flex flex-col gap-5"}>
                <div
                    className=" max-w-[500px]  p-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg">
                    <Image src={thumbnail_url ? thumbnail_url : "/images/game_placeholder.png"}
                           width={500} height={500}
                         alt={title} className="h-auto  object-cover rounded-lg
                                        scale-100 transition duration-500
                                        group-hover:scale-105 focus:scale-105
                                        "/>
                </div>


                <h1 className="text-2xl text-blue-600 font-bold ">{title}</h1>
                <h2 className="text-xl text-purple-200 font-bold">{description}</h2>
                <div className={"w-full flex "}>
                    <Link className={" p-4 text-2xl text-purple-100 font-bold" +
                        " bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100" +
                        " transition  "} href={`/${id}/play`}
                    >Начать игру</Link>
                </div>
            </div>
        </div>
    );
}