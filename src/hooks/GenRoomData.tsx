import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type responseData = {
    redirect_to_room_uri: string;
};

const genRoomData = ({ gameId, bet, countPlayers }: { gameId: number; bet: number; countPlayers: number }) => {
    const game_id = gameId;
    const count_players = countPlayers;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Construct the room data object
        const roomData = {
            game_id,
            bet,
            count_players,
        };
        if (roomData.bet !== 0 && roomData.bet !== null){

            try {
                const response = await fetch("https://api-tg-bot.bezabon.online:8080/games/create-room", {
                    // ... (replace with your actual API endpoint)
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(roomData),
                });

                if (!response.ok) {
                    throw new Error(`Error creating room: ${response.statusText}`);
                }

                const responseData = await response.json();

                if (responseData?.redirect_to_room_uri) {
                    console.log("Redirecting to:", responseData.redirect_to_room_uri);
                    // Attempt redirection (consider using await or Promise.resolve)
                    await router.push(responseData.redirect_to_room_uri);
                } else {
                    console.log("No redirect link found");
                }
            } catch (error: any) {
                setError(error.message); // Set error state for potential display
            }
        }
    };

    return { handleSubmit, error };
};

export default genRoomData;
