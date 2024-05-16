import {useEffect, useState} from "react";

type Game = {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    is_active: boolean;
};

const useGamesData = () => {
    const [gameData, setGameData] = useState<Game[]>();

    useEffect(() => {
        const fetchGameData = async () => {

            try {
                const response = await fetch(`https://accepted-elephant-jolly.ngrok-free.app/games`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                });
                const data = await response.json();



                setGameData(data);
            } catch (error) {
                console.error('Error fetching game data:', error);

            }

        };

        fetchGameData();
    }, []);

    return gameData;
};

export default useGamesData;
