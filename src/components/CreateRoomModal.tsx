import React, {useEffect} from "react";
import clsx from "clsx";
import genRoomData from "@/hooks/GenRoomData";






interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameData: GameData;
}

type RoomData = {
    gameId: number;
    bet: number;
    countPlayers: number;
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


const createRoomModal: React.FC<ModalProps> = ({ isOpen, onClose, gameData}) => {

    const gameId = gameData?.id;




    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [bet, setBet] = React.useState<number>(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [countPlayers, setCountPlayers] = React.useState<number>(2)

    let OpenClassWrapper = isOpen?"top-0":"top-[100%]";
    let OpenClassContent = isOpen?"top-0":"top-[-100%]";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [roomData, setRoomData] = React.useState<RoomData>({gameId, bet, countPlayers});



    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setRoomData({gameId, bet, countPlayers})

    }, [bet, countPlayers]);


    const { handleSubmit, error } = genRoomData(roomData);

    return (
        <div onClick={ () => { onClose() }} className={clsx(OpenClassWrapper, "mt-[80px]   duration-150  fixed inset-0 z-40  bg-gray-900 bg-opacity-75 flex justify-center items-center overflow-hidden")} >
            <div onClick={ e => e.stopPropagation() } className={clsx(OpenClassContent,"relative transition-all  duration-400 max-w-[500px] bg-gray-700 p-6 w-full rounded-lg shadow-xl")}>

                <form onSubmit={handleSubmit} className="flex  mt-4 flex-col items-center  w-full gap-3">

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-purple-200 font-bold">Введите ставку</h2>
                        <input type="number" id="default-input" value={bet}
                               onChange={(e) => setBet(parseInt(e.currentTarget.value))}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>


                        <div className="flex flex-row gap-2 ">
                            <div className="flex gap-1">
                                <input id="purple-radio" type="radio" value={10} name="colored-radio"
                                       onChange={e => setBet(10)}
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-purple-600 focus:ring-2 dark:bg-purple-600 dark:border-purple-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">10</label>
                            </div>

                            <div className="flex gap-1">
                                <input id="purple-radio" type="radio" value={20} name="colored-radio"
                                       onChange={e => setBet(20)}
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">20</label>
                            </div>

                            <div className="flex gap-1">
                                <input id="purple-radio" type="radio" value={30} name="colored-radio"
                                       onChange={e => setBet(30)}
                                       className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="purple-radio"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">30</label>
                            </div>
                        </div>
                        <h2 className="text-xl text-purple-200 font-bold">Выберите количество игроков:</h2>
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
                    <button type="submit"  className={" mt-4 p-4 text-2xl text-purple-100 font-bold" +
                        " bg-purple-600 rounded-lg hover:text-purple-600 hover:bg-purple-100" +
                        " transition" }
                    >Создать комнату
                    </button>


                </form>

            </div>
        </div>
    );


}


export default createRoomModal