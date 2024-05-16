import {FormEvent, useState} from "react";
import {redirect, useRouter} from "next/navigation";




const useRoomJoin = (redirect_to_room_uri:string  ) => {



    const [error, setError] = useState(null);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Construct the room data object

        try {



            if (redirect_to_room_uri){

                window.location.href = redirect_to_room_uri;
                console.log(redirect_to_room_uri)
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

export default useRoomJoin