// lib/useGameData.js
import { useState, useEffect } from 'react';

const useGameData = (gameId: number) => {
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        const fetchGameData = async () => {
            if (gameId) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}`, {
                        method: 'GET',
                        headers: {
                            'ngrok-skip-browser-warning': '69420',
                        },
                    });
                    const data = await response.json();
                    setGameData(data);
                } catch (error) {
                    console.error('Error fetching game data:', error);
                    // Обработайте ошибки
                }
            }
        };

        fetchGameData();
    }, [gameId]);

    return gameData;
};

export default useGameData;