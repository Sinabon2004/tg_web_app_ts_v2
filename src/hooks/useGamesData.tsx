import {useEffect, useState} from "react";

type gameData = {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    is_active: boolean;
}

const useGamesData = () => {
    const [gameData, setGameData] = useState<gameData[]>([]);

    useEffect(() => {
        const fetchGameData = async () => {

            try {
                const response = await fetch(`https://api-tg-bot.bezabon.online:8080/games`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                });
                const data = await response.json();
                console.log(data)


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
