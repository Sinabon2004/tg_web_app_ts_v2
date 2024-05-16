"use client"

import useRoomData from "@/hooks/useRoomData";
import {useEffect, useState} from "react";
import {TickTackToeService} from "@/services/tick-tack-toe";
import Header from "@/components/header";
import Image from "next/image";
import CreateRoomModal from "@/components/CreateRoomModal";
import {init} from "@tma.js/sdk";
import useUserData from "@/hooks/useUserData";
import Link from "next/link";
// import {init} from "@tma.js/sdk";


type roomDataType = {
    bet?: number,
    connected_players?: object,
    count_players?: number,
    current_player_id?: number | null,
    description?: string,
    game_finished?: boolean,
    game_id?: number,
    game_progress?: any,
    game_started?: boolean,
    title?: string,
    websocket_uri: string,
    winner_id?: number | null,
}

type PlayingGameType = {
    game_id: number
    title: string
    description: string
    websocket_uri: string
    bet: number
    count_players: number
    connected_players?: object,
    current_player_id: number | null
    game_started: boolean
    game_progress: { user_id: number | null, checked_at: string | null }[][]
    game_finished: boolean
    winner_id: number | null

}


type userData = {

    avatar_url: string ;
    money: number;
}


export default function Page(
    {params}: {
        params: { roomId: number }
    }) {


    const [gameWs, setGameWs] = useState<WebSocket | null>(null);
    // const [websocketUrl, setWebsocketUrl] = useState<String>()
    // const roomData= useRoomData(params.roomId);
    const [roomData, setRoomData] = useState<roomDataType>();
    const [playData, setPlayData] = useState<PlayingGameType>();


    // const {initData} = init();



    useEffect(() => {
        const fetchGameData = async () => {
            if (params.roomId) {
                try {

                    const response = await fetch(
                        `https://accepted-elephant-jolly.ngrok-free.app/games/get_room/${params.roomId}`,
                        {
                            method: "get",
                            headers: new Headers({
                                "ngrok-skip-browser-warning": "69420",
                            }),
                        }
                    );

                    const data = await response.json();
                    console.log(data)
                    setRoomData(data);

                    // console.log("const", data);
                    // console.log("set", roomData);
                } catch (error) {
                    console.error("Error fetching game data:", error);
                    // Handle errors
                }
            }
        };

        fetchGameData();

    }, [params.roomId]);
    const {initData} = init();
    const userData: userData | undefined  = useUserData(initData?.user?.id);
    const user = {
        ...initData?.user,
        ...userData
    }




    useEffect(() => {
        if (roomData) {
            // console.log(roomData);
            if (!gameWs) {

                // console.log(`wss://accepted-elephant-jolly.ngrok-free.app${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(user?.id)}`);
                const service = new WebSocket(`wss://accepted-elephant-jolly.ngrok-free.app${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(user?.id)}`);
                // new TickTackToeService("wss://accepted-elephant-jolly.ngrok-free.app", String(roomData.websocket_uri), String(params.roomId), String(userId));
                setGameWs(service);
            }

        }

    }, [gameWs, params.roomId, roomData, user?.id]);

    if (gameWs !== null) {
        gameWs.onopen = () => {
            console.log('Connected to server');
        };
        gameWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data) {
                setPlayData(data);
            }
        };
        gameWs.onclose = () => {
            console.log('Disconnected from server');
        };
        gameWs.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

    }

    useEffect(() => {
        if (playData?.connected_players) {
            console.log(playData);
        }
    }, [playData]);





    const [isReady, setIsReady] = useState(false); //
    const handleClickReady = () => {
        if (gameWs !== null) {
            gameWs.send(isReady ? "not_ready" : "ready"); // Send appropriate message based on isReady
            setIsReady((prevState) => !prevState); // Toggle isReady state
        } else {
            alert("Wait");
        }
    };

    const [typePlayer, setTypePlayer] = useState<string>("1");

    if (typePlayer == "1" && (playData?.connected_players !== undefined) && (playData?.connected_players !== null)) {

        if (String(user?.id) === Object.keys(playData?.connected_players)[0]) {
            setTypePlayer("X")


        } else setTypePlayer("O")


    }


    if ((playData?.connected_players !== undefined) && (playData?.connected_players !== null)) {
        return <>

            <div className={"h-[100dvh] w-full flex justify-center mt-[80px] bg-gray-800"}>
                <Header/>
                <div className={"bg-gray-900 py-8 px-4 w-full max-w-[500px] flex flex-col gap-5"}>

                    {playData !== undefined ?

                        !(playData.game_started) ?
                            <div className="h-screen w-full flex justify-center bg-gray-800">
                                <div className="bg-gray-900 py-8 px-6 w-full max-w-[500px] flex flex-col gap-7">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl text-blue-600 font-bold">Комната {params.roomId}</h1>
                                        <h1 className="text-2xl text-blue-600 font-bold">{Object.keys(playData.connected_players).length}/{playData.count_players}</h1>
                                    </div>
                                    <div
                                        className="w-full max-w-[500px] p-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg">
                                        <h2 className="text-xl text-purple-100 font-bold mt-1">Игроки в сессии:</h2>
                                        <div className="w-full bg-gray-100 rounded-lg border-black border-2 mt-3">

                                            {playData?.connected_players &&
                                                Object.entries(playData.connected_players).map(([playerId, playerData]) => (
                                                    <div key={playerId}>
                                                        <div className="p-1">
                                                            <h2 className="text-xl text-gray-900 font-bold ">{playerData?.username}</h2>
                                                            <h2 className="text-xl text-gray-900 font-bold ">{playerData?.is_ready ? "Готов" : "Не готов"}</h2>
                                                        </div>
                                                        <span
                                                            className="w-full h-[2px] rounded-full block bg-black"></span>
                                                    </div>
                                                ))}


                                        </div>
                                    </div>


                                    <div className="w-full flex flex-col   mb-3.5 ">
                                        <button onClick={handleClickReady}
                                                className={isReady ? "group p-4 text-xl min-[350px]:text-2xl text-purple-600 font-semibold text-center bg-purple-100 rounded-lg" : "group p-4 text-xl min-[350px]:text-2xl text-purple-100 font-semibold  bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100 transition flex   items-center text-center"}
                                        >
                                            <h3>Готов</h3>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            (<div className="h-screen w-full flex justify-center bg-gray-800">
                                <div className="flex flex-col gap-0">
                                    {
                                        playData?.game_progress.flatMap((row, y) => (
                                            <div className="flex gap-0">
                                                {
                                                    row.map((el, x) => (
                                                        <div key={x}
                                                             className="flex justify-center items-center p-5 border-2 border-purple-100"
                                                             onClick={() => {
                                                                 if (el.user_id === null && gameWs) {
                                                                     if (playData.current_player_id === user.id) {
                                                                         gameWs?.send(`${y},${x}`);
                                                                     }
                                                                 }

                                                             }}>
                                                            {
                                                                el.user_id == null ? "" : (
                                                                    el.user_id == user.id ?
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             fill="none"
                                                                             viewBox="0 0 24 24"
                                                                             strokeWidth="1.5" stroke="currentColor"
                                                                             className="w-full h-full">
                                                                            <path strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                                                                        </svg>
                                                                        :
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             fill="none"
                                                                             viewBox="0 0 24 24"
                                                                             strokeWidth="1.5" stroke="currentColor"
                                                                             className="w-full h-full">
                                                                            <path strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  d="M6 18 18 6M6 6l12 12"/>
                                                                        </svg>
                                                                )
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))

                                    }

                                    {!(playData?.game_finished) ?"": (
                                        <div>
                                            <h4>Игра завершена</h4>
                                            <h3>{playData?.winner_id === null ? "Победтеля нет, деньги не спишутся" : (playData?.winner_id == user.id ? `Вы победили, скоро на ваш счёт прибудет ${playData?.bet} монет`:`Вы проиграли в честном бою, придётся списать у вас ${playData?.bet} монет`)}</h3>
                                        </div>
                                    )}
                                </div>


                            </div>)
                        : <div className={"h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"}>
                            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка сессии</h2>
                            <img className={"w-[30%] ml-8"} src={"/animated/loading.svg"} alt={"loading"}/>
                        </div>
                    }


                </div>


            </div>

        </>
    }


    {/*<div>{params?.roomId}</div>*/


    }
    {/*<div onClick={() => {gameWs !== null? gameWs.send("ready"): alert("Wait")}}>{roomData?.websocket_uri}</div>*/
    }


    ;
}