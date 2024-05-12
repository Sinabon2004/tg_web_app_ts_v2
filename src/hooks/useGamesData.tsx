import {useEffect, useState} from "react";

const useGamesData = () => {
    const [games, setGames] = useState([]);


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