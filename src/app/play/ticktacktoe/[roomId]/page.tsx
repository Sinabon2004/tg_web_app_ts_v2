"use client"


import {useEffect, useState} from "react";

import Header from "@/components/header";

import useUserData from "@/hooks/useUserData";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import Avatar from "@/components/avatar";
import {retrieveLaunchParams} from "@telegram-apps/sdk";


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

    avatar_url: string;
    money: number;
}


interface Player {
    id: number;
    last_name: string | null;
    first_name: string;
    username: string;
    avatar_url: string | null;
    is_ready: boolean;
}

interface Players {
    [userId: string]: Player;
}


const getPlayer1And2 = (connected_players: object) => {

    const [playerId1, playerId2] = Object.keys(connected_players);
    const [playerValue1, playerValue2] = Object.values(connected_players);


    // Create Player1 and Player2 objects
    const player1: Player = {
        id: parseInt(playerId1),
        ...playerValue1,

    };

    const player2: Player = {
        id: parseInt(playerId2),
        ...playerValue2,

    };
    console.log(typeof player2?.id);
    return {player1, player2};


};


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
                        `${process.env.NEXT_PUBLIC_API_URL}/games/get_room/${params.roomId}`,
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
    const {initData} = retrieveLaunchParams();
    const userData: userData | undefined = useUserData(initData?.user?.id);
    const user = {
        ...initData?.user,
        ...userData
    }


    useEffect(() => {
        if (roomData) {
            // console.log(roomData);
            if (!gameWs) {

                // console.log(`wss://accepted-elephant-jolly.ngrok-free.app${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(user?.id)}`);
                const service = new WebSocket(`${process.env.NEXT_PUBLIC_API_URL}${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(user?.id)}`);
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
    let EnemyAvatar: any = null
    if (typePlayer == "1" && (playData?.connected_players !== undefined) && (playData?.connected_players !== null)) {

        if (String(user?.id) === Object.keys(playData?.connected_players)[0]) {
            setTypePlayer("X")
            EnemyAvatar = Object.values(playData?.connected_players)[1]


        } else {
            setTypePlayer("O")
            EnemyAvatar = Object.values(playData?.connected_players)[0]

        }


    }
    if (playData?.connected_players !== undefined && (Object.keys(playData?.connected_players).length == 2)) {

    }


    let winAnimation = "";
    {
        !(playData?.game_finished) ?
            winAnimation = "opacity-0 hidden"
            :
            winAnimation = "opacity-100 flex"
    }

    if ((playData?.connected_players !== undefined) && (playData?.connected_players !== null)) {

        const {player1, player2} = getPlayer1And2(playData?.connected_players);

        if (playData?.game_started) {
            return <>

                <div className={"h-[100dvh] w-full flex justify-center mt-[80px] bg-gray-800"}>
                    <Header/>
                    <div className={" py-8 px-4 w-full max-w-[500px] flex flex-col gap-5"}>
                        <div className=" h-screen w-full flex flex-col gap-4 bg-gray-800">
                            <div className="relative bg-purple-100 p-2 h-fit rounded-lg">

                                <div
                                    className={clsx("absolute  justify-center items-center inset-0 backdrop-blur-[6px]  border-[17px] border-gray-800 rounded-lg  ", winAnimation)}>
                                    <div
                                        className="w-full h-full transition-all duration-150 bg-gray-800 gap-3 p-2 flex flex-col justify-center items-center">


                                        <Image className="w-2/3" src="/images/gameOver.gif" width={100}
                                               height={100} alt={"gameOver"}/>
                                        <h2 className="text-2xl text-blue-600 font-bold ">{playData?.winner_id === null ? "Ничья" : (playData?.winner_id == user.id ? `Вы победили!` : `Вы проиграли`)}</h2>
                                        <h3 className="text-xl text-purple-200 font-bold">{playData?.winner_id === null ? "Ничья" : (playData?.winner_id == user.id ? `( заработано  ${playData?.bet} монет)` : `( потеряно ${playData?.bet} монет)`)}</h3>

                                        <Link
                                            className={" p-4 text-2xl text-purple-100 font-bold" +
                                                " bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100" +
                                                " transition"}
                                            href={`/`}> Вернуться в меню </Link>
                                    </div>
                                </div>

                                <div className="h-fit flex flex-col gap-0 bg-gray-800">
                                    {
                                        playData?.game_progress
                                            ?
                                            playData?.game_progress.flatMap((row, y) => (
                                                <div className="flex gap-0 h-1/4">
                                                    {
                                                        row.map((el, x) => (
                                                            <div key={x}
                                                                 className=" w-1/4 flex justify-center items-center p-5 border-2 border-purple-100"
                                                                 onClick={() => {
                                                                     if (el.user_id === null && gameWs) {
                                                                         if (playData.current_player_id === user.id) {
                                                                             gameWs?.send(`${y},${x}`);
                                                                         }
                                                                     }

                                                                 }}>
                                                                {
                                                                    el.user_id == null ?
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             fill="none"
                                                                             viewBox="0 0 24 24"
                                                                             strokeWidth="1.5" stroke="currentColor"
                                                                             className="w-full h-full opacity-0">
                                                                            <path strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  d="M6 18 18 6M6 6l12 12"/>
                                                                        </svg>
                                                                        : (
                                                                            el.user_id == user.id ?
                                                                                <Image src="/ticktacktoe/O.svg" alt="CIRCLE"
                                                                                       width={50} height={50}/>
                                                                                :
                                                                                <Image src="/ticktacktoe/X.svg" alt="CROSS"
                                                                                       width={50} height={50}/>
                                                                        )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                            :
                                            ""
                                    }


                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4 px-7">
                                <div className="py-3">
                                    <div
                                        className="flex flex-col gap-2 items-center overflow-hidden pr-[34px] py-[20px]">
                                        <div
                                            className="relative flex justify-center w-[20vw] h-[20vw] bg-gradient-to-br  from-purple-600 to-blue-500 p-0.5 rounded-full">
                                            {(playData?.game_finished) ?
                                                (playData?.winner_id == player1.id) ?
                                                    <div className="absolute inset-0">
                                                        <Image width={100} height={100} src="/images/EmojiCool.svg"
                                                               alt="WINNER"/>
                                                    </div>
                                                    :
                                                    <div className="absolute inset-0">
                                                        <Image width={100} height={100} src="/images/EmojiSad.svg"
                                                               alt="LOSER"/>
                                                    </div>

                                                : ""}

                                            <Avatar user={player1} className={"rounded-full"}></Avatar>
                                            <Image
                                                className={`transition-all absolute w-3/4 translate-x-[50%] -translate-y-[35%] rotate-[25deg] animate-pulse ${playData.current_player_id === player1.id && !playData.game_finished ? "left-0" : "left-[-200%]"} `}
                                                src="/ticktacktoe/your-turn.png" width={100} height={100}
                                                alt="your_turn"/>
                                        </div>
                                        <div className=" flex flex-col items-center">
                                            <p className="text-md text-gray-500 truncate dark:text-gray-400">
                                                {player1.username}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="grow flex justify-center items-center text-base font-semibold text-gray-900 dark:text-white">

                                    {playData?.bet} ₽
                                </div>
                                <div className="py-3 sm:py-4">
                                    <div
                                        className="flex flex-col gap-2 items-center overflow-hidden pl-[34px] py-[20px]">
                                        <div
                                            className="  relative flex justify-center w-[20vw] h-[20vw] bg-gradient-to-br  from-purple-600 to-blue-500 p-1 rounded-full">
                                            {(playData?.game_finished) ?
                                                (playData?.winner_id == player2.id) ?
                                                    <div className="absolute inset-0">
                                                        <Image src="/images/EmojiCool.svg" alt="winner" width={100}
                                                               height={100}/>
                                                    </div>
                                                    :
                                                    <div className="absolute inset-0">
                                                        <Image src="/images/EmojiSad.svg" alt="LOSER" width={100}
                                                               height={100}/>
                                                    </div>

                                                : ""}
                                            <Avatar user={player2} className={"rounded-full"}></Avatar>
                                            <Image
                                                className={`transition-all absolute w-3/4 -translate-x-[50%] -translate-y-[35%] rotate-[-25deg] animate-pulse ${playData.current_player_id === player2.id && !playData.game_finished ? "left-0" : "left-[-200%]"} `}
                                                src="/ticktacktoe/your-turn.png" width={100} height={100}
                                                alt="your_turn"/>
                                        </div>
                                        <div className=" flex flex-col items-center">
                                            <p className="text-md text-gray-500 truncate dark:text-gray-400">
                                                {player2.username}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>


                </div>

            </>
        } else {
            return <>

                <div className={"h-[100dvh] w-full flex justify-center mt-[80px] bg-gray-800"}>
                    <Header/>
                    <div className={"bg-gray-900 py-8 px-4 w-full max-w-[500px] flex flex-col gap-5"}>


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


                                <div className="w-full flex flex-col    mb-3.5 ">
                                    <button onClick={handleClickReady}
                                            className={isReady ? "group p-4 text-xl min-[350px]:text-2xl text-purple-600 font-semibold text-center bg-purple-100 rounded-lg" : "group p-4 text-xl min-[350px]:text-2xl text-purple-100 font-semibold  bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100 transition flex   items-center text-center"}
                                    >
                                        <h3>Готов</h3>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>

            </>
        }
    } else {
        <div className={"h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"}>
            <h2 className="text-xl text-purple-200 font-bold">Идет загрузка сессии</h2>
            <Image className={"w-[30%] ml-8"} width={100} height={100} src={"/animated/loading.svg"} alt={"loading"}/>
        </div>
    }


}