

type roomData ={
    bet?: number,
    connected_players?: object,
    count_players?: number,
    current_player_id?: number,
    description?: string,
    game_finished?: boolean,
    game_id?: number,
    game_progress?: object,
    game_started?: boolean,
    title?: string,
    websocket_uri?: string,
    winner_id?: number,
}


import { useEffect, useState } from "react";

const useRoomData = (roomId: number) => {
    const [roomData, setRoomData] = useState<roomData>();


    useEffect(() => {
        const fetchGameData = async () => {
            if (roomId) {
                try {

                    const response = await fetch(
                        `https://accepted-elephant-jolly.ngrok-free.app/games/get_room/${roomId}`,
                        {
                            method: "GET",
                            headers: {
                                "ngrok-skip-browser-warning": "69420",
                            },
                        }
                    );

                    const data = await response.json();
                    setRoomData(data);

                    console.log(data);
                    console.log(roomData);
                } catch (error) {
                    console.error("Error fetching game data:", error);
                    // Handle errors
                }
            }
        };

        fetchGameData();
    }, [roomId]);

    return {
        roomData,
    };
};

export default useRoomData;

