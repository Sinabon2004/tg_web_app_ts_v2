import React, {useEffect} from "react";
import clsx from "clsx";
import genRoomData from "@/hooks/GenRoomData";
import {useRouter} from "next/navigation";
import {router} from "next/client";
import useRoomJoin from "@/hooks/useRoomJoin";






interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameData: GameData;
}

type RoomId = {
    roomId: any ;
}

type GameData = {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    is_active: boolean;
    websocket_uri: string;
    front_uri: string;

}


const joinRoomModal: React.FC<ModalProps> = ({ isOpen, onClose, gameData}) => {

    const gameId = gameData?.id;





    let OpenClassWrapper = isOpen?"top-0":"top-[100%]";
    let OpenClassContent = isOpen?"top-0":"top-[-100%]";

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [roomId, setRoomId] = React.useState("123");






    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { handleSubmit, error } = useRoomJoin(`/play/ticktacktoe/${roomId}`);

    console.log()
    console.log(window.location.href)
    return (
        <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]   duration-150  fixed inset-0 z-40  bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden")} >
            <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-gray-700 p-6 w-full rounded-lg shadow-xl")}>

                <form onSubmit={handleSubmit} className="flex  mt-4 flex-col items-center  w-full gap-3">

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-blue-600 font-bold ">Введите ID комнаты</h1>
                        <input type="text" id="default-input" value={roomId}
                               onChange={(e) => setRoomId(e.currentTarget.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>


                    </div>
                    <button type="submit"  className={" mt-4 p-4 text-2xl text-purple-100 font-bold" +
                        " bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100" +
                        " transition" }
                    >присоединиться
                    </button>


                </form>

            </div>
        </div>
    );


}


export default joinRoomModal