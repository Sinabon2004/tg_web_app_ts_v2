import {FormEvent, useState} from "react";
import {redirect, useRouter} from "next/navigation";




const useRoomJoin = (redirect_to_room_uri:string  ) => {



    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Construct the room data object

        try {
            if (!redirect_to_room_uri) {
                throw new Error("Ссылка на комнату не найдена");
            }

            // Here you can add any additional validation or API calls before redirect
            // For example, checking if the room exists, has space, etc.

            window.location.href = redirect_to_room_uri;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Произошла ошибка при присоединении к комнате");
        }
    };

    return { handleSubmit, error };
}

export default useRoomJoin