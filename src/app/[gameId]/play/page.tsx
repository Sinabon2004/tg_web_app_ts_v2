"use client"
import {useRouter, useSearchParams} from "next/navigation";

import {useEffect, useState} from "react";
import useGameData from "@/hooks/useGameData";
import {BackButton, init, postEvent} from "@tma.js/sdk";
import {TickTackToeService} from "@/services/tick-tack-toe";


export default function PlayGamePage(parent: any) {
    const gameId = parent.params.gameId;
    const gameData = useGameData(gameId);
    const {initData} = init();
    const user = initData?.user;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [isReady, setIsReady] = useState(false);
    const [gameService, setGameService] = useState<TickTackToeService | null>(null);

    const generateRoomId = () => {
        // Генерация случайного идентификатора комнаты
        return Math.random().toString(36).substr(2, 9);
    };
    const roomId = typeof searchParams.get("roomId") === "undefined" || searchParams.get("roomId") === null
        ? generateRoomId() : String(searchParams.get("roomId"));
    console.log(roomId);
    useEffect(() => {
        const backButton = new BackButton(true, "6.3", postEvent);
        backButton.show();
        backButton.on("click", () => {
            router.push("/" + gameId);
        });

        // Генерация идентификатора комнаты и подключение к WebSocket

        const service = new TickTackToeService("wss://tg-mini-app.local:443", roomId, String(user?.id));
        setGameService(service);

        return () => {
            service.closeConnection();
        };
    }, [roomId,gameId, router, user?.id]);


    const handleStartGame = () => {
        setIsReady(true);
    };

    const generateRoomLink = (roomId: string) => {
        return `t.me/gamees_pay_bot/play/roomId=${roomId}`;
    };

    if (!gameData) {
        return <div className={"h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"}>
            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка сессии</h2>
            <img className={"w-[30%] ml-8"} src={"/animated/loading.svg"} alt={"loading"}/>
        </div>;
    }
    const {id, title, description, thumbnail_url} = gameData;

    return (
        <div className="h-screen w-full flex justify-center bg-gray-800">
            <div className="bg-gray-900 py-8 px-6 w-full max-w-[500px] flex flex-col gap-7">
                <div className="flex justify-between">
                    <h1 className="text-2xl text-blue-600 font-bold">Комната {gameId}</h1>
                    <h1 className="text-2xl text-blue-600 font-bold">1/2</h1>
                </div>
                <div className="w-full max-w-[500px] p-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg">
                    <h2 className="text-xl text-purple-100 font-bold mt-1">Игроки в сессии:</h2>
                    <div className="w-full bg-gray-100 rounded-lg border-black border-2 mt-3">
                        <div className="p-1">
                            <h2 className="text-xl text-gray-900 font-bold ">{user?.username}</h2>
                        </div>
                        <span className="w-full h-[2px] rounded-full block bg-black"></span>
                        <div className="p-1">
                            <h2 className="text-xl text-gray-900 font-bold ">{"Ожидание второго игрока"}</h2>
                        </div>
                        <span className="w-full h-[2px] rounded-full block bg-black"></span>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4 flex-grow justify-end mb-3.5 ">
                    {isReady ? (
                        <>
                            <button
                                className="group p-4 text-xl min-[350px]:text-2xl text-purple-100 font-semibold text-center bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100 transition flex justify-between gap-8 items-center"
                                onClick={handleStartGame}
                            >
                                <h3>Начать игру</h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="stroke-purple-100 group-hover:stroke-purple-600  w-auto h-[30px] min-[350px]:h-[40px] transition"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => console.log(generateRoomLink(roomId))}
                                className="group p-4 text-xl min-[350px]:text-2xl text-purple-100 font-semibold text-center bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100 transition flex justify-between gap-8 items-center"
                            >
                                <h3>Пригласить друга</h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    className="stroke-purple-100 group-hover:stroke-purple-600  w-auto h-[30px] min-[350px]:h-[40px] transition"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
                                </svg>
                            </button>
                            <h3 className="text-xl text-purple-100 font-semibold text-center bg-purple-600 rounded-lg p-4">
                                Ждем всех игроков...
                            </h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
