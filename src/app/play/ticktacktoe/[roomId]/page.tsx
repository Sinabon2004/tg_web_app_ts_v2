"use client"

import useRoomData from "@/hooks/useRoomData";
import {useEffect, useState} from "react";
import useWebSocket from 'react-use-websocket';



type roomData ={
    bet: number,
    connected_players: object,
    count_players: number,
    current_player_id: number,
    description: string,
    game_finished: boolean,
    game_id: number,
    game_progress: object,
    game_started: boolean,
    title: string,
    websocket_uri: string,
    winner_id: number,
}

export default function Page(
    {params}: {
        params: { roomId: number }
    })
{

    // const [websocketUrl, setWebsocketUrl] = useState<String>()
    const roomData= useRoomData(params.roomId);





    // const {sendMessage, lastMessage, readyState} = useWebSocket(`wss://accepted-elephant-jolly.ngrok-free.app/${ websocketUrl }`, { onOpen: console.log })


    // const ws = useWebSocket(`https://accepted-elephant-jolly.ngrok-free.app${roomData?.websocket_uri}`)


    // const { socket, messages, sendMessage } = useWebSocket(`ws://accepted-elephant-jolly.ngrok-free.app/${params?.roomId}`);


    return <div>{params?.roomId}</div>;
}