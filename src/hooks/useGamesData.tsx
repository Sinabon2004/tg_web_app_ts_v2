import {useEffect, useState} from "react";

type Game = {
    id: number,
    title: string,
    description: string,
    thumbnail_url: string,
}
const useGamesData = () => {
    const [games, setGames] = useState<Game[]>([]);


    useEffect(() => {
        fetch('https://accepted-elephant-jolly.ngrok-free.app/games', {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        })
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    return games;
}

export default useGamesData;