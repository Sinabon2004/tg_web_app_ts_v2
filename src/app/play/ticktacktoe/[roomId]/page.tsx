"use client"

import useRoomData from "@/hooks/useRoomData";
import {useEffect, useState} from "react";
import {TickTackToeService} from "@/services/tick-tack-toe";
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
    game_progress: any
    game_finished: boolean
    winner_id: number | null

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

    const userId = 895701241
    // const {initData} = init();

    // console.log(roomData);

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

    useEffect(() => {
        if (roomData){
            if(!gameWs){
                const service = new WebSocket(`wss://accepted-elephant-jolly.ngrok-free.app${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(userId)}`);
                // new TickTackToeService("wss://accepted-elephant-jolly.ngrok-free.app", String(roomData.websocket_uri), String(params.roomId), String(userId));
                setGameWs(service);
            }

        }

    }, [gameWs, params.roomId, roomData]);

    if (gameWs !== null){
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
        if(playData?.connected_players){
            console.log(playData?.connected_players);
        }
    }, [playData?.connected_players]);



    // const ws = useWebSocket(`https://accepted-elephant-jolly.ngrok-free.app${roomData?.websocket_uri}`)


    // const { socket, messages, sendMessage } = useWebSocket(`ws://accepted-elephant-jolly.ngrok-free.app/${params?.roomId}`);


    return <>
        <div>{params?.roomId}</div>
        <div>{roomData?.websocket_uri}</div>
    </>;
}