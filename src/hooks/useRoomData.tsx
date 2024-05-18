// game_id: int
// title: str
// description: str
// websocket_uri: str
// bet: int
// count_players: int
// connected_players: Dict[int, UserDataForGameResponse] = Field({})
// current_player_id: int | None = Field(None)
// game_started: bool = Field(False)
// game_progress: Any = Field(False)
// game_finished: bool = Field(False)
// winner_id: int | None = Field(None)

import * as timers from "node:timers";

type roomData = {
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
    websocket_uri?: string,
    winner_id?: number | null,
}


import {useEffect, useState} from "react";

const useRoomData = (roomId: number) => {
    const [roomData, setRoomData] = useState<roomData>();


    useEffect(() => {
        const fetchGameData = async () => {
            if (roomId) {
                try {

                    const response = await fetch(
                        `https://api-tg-bot.bezabon.online:8080/games/get_room/${roomId}`,
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
    }, [roomId]);

    return roomData;
};

export default useRoomData;

