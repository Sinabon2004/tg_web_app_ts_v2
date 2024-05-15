import {FormEvent, useState} from "react";
import {redirect, useRouter} from "next/navigation";



type responseData = {
    redirect_to_room_uri: string;
}
const genRoomData = ({gameId, bet, countPlayers}: { gameId: number, bet: number, countPlayers: number } ) => {

    const game_id = gameId;
    const count_players = countPlayers

    const [error, setError] = useState(null);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Construct the room data object
        const roomData = {
            game_id,
            bet,
            count_players,
        };

        try {
            const response = await fetch('https://accepted-elephant-jolly.ngrok-free.app/games/create-room', { // Replace with your actual API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData),
            });

            if (!response.ok) {
                throw new Error(`Error creating room: ${response.statusText}`);
            }

            const responseData = await response.json();
            if (responseData?.redirect_to_room_uri){

                window.location.href = responseData.redirect_to_room_uri;
            }
            else {
                console.log("нет ссылки")
            }


        } catch (error: any) {
            setError(error.message); // Set error state for potential display
        }
    };

    return { handleSubmit, error };
}

export default genRoomData