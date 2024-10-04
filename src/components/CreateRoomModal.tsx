import React, { useState, useEffect } from "react";
import clsx from "clsx";
import genRoomData from "@/hooks/GenRoomData";

interface GameData {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    is_active: boolean;
    websocket_uri: string;
    front_uri: string;
}

interface RoomProps {
    isOpen: boolean;
    onClose: () => void;
    gameData: GameData;
}

const CreateRoomModal = ({ isOpen, onClose, gameData }: RoomProps) => {
    const [bet, setBet] = useState<number>(0); // Use number state for bet
    const [countPlayers, setCountPlayers] = useState<number>(2);
    const gameId = gameData?.id;

    const [roomData, setRoomData] = useState({
        gameId,
        bet,
        countPlayers,
    });

    useEffect(() => {
        if (bet !== 0 && bet !==null){
            setRoomData({ gameId, bet, countPlayers });
        }
    }, [bet, countPlayers, gameId]);

    const { handleSubmit, error } = genRoomData(roomData);

    const OpenClassWrapper = isOpen ? "top-0" : "top-[100%]";
    const OpenClassContent = isOpen ? "top-0" : "top-[-100%]";

    return (
        <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]   duration-150  fixed inset-0 z-40  bg-primary-black bg-opacity-85 flex justify-center items-center overflow-hidden")} >
            <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-primary-dark-blue p-6 w-full rounded-lg shadow-xl")}>

                <form onSubmit={(e) => {
                    if (bet === 0 || isNaN(bet)) {
                        e.preventDefault();
                        return;
                    }

                        handleSubmit(e);
                    }}
                      className="flex  mt-4 flex-col items-center  w-full gap-3">

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-purple-200 font-bold">Введите ставку</h2>
                        <input
                            type="number"
                            id="default-input"
                            value={!isNaN(bet) ? bet : ""}  // Set value from state
                            onChange={(e) => setBet(parseInt(e.currentTarget.value))} // Update state on change
                            className="bg-primary-dark-blue border border-primary-pink/80 text-primary-white font-semibold text-sm rounded-lg focus:ring-primary-pink focus:border-primary-pink block w-full p-2.5 "
                        />


                        <h2 className="text-md text-purple-200 font-bold">Выберите количество игроков:</h2>
                        <div className="flex flex-row">
                            <div className="flex items-center me-4">
                                <input id="purple-radio" type="radio" value={2} onChange={(e) => {
                                    setCountPlayers(2)
                                }} name="col"
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">2</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input disabled id="purple-radio" type="radio" value={3} onChange={(e) => {
                                    setCountPlayers(3)
                                }} name="col"
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input disabled id="purple-radio" type="radio" value={4} onChange={(e) => {
                                    setCountPlayers(4)
                                }} name="col"
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">4</label>
                            </div>


                        </div>

                    </div>
                    <button type="submit"  className={" mt-4 p-3 text-xl text-primary-white font-bold" +
                        " bg-primary-pink/80 rounded-lg hover:text-primary-pink/90 hover:bg-primary-white/80" +
                        " transition" }
                    >Создать комнату
                    </button>


                </form>

            </div>
        </div>
    );


}


export default CreateRoomModal