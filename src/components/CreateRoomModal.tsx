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
    const [bet, setBet] = useState<number>(0);
    const [countPlayers, setCountPlayers] = useState<number>(2);
    const gameId = gameData?.id;

    const [roomData, setRoomData] = useState({
        gameId,
        bet,
        countPlayers,
    });

    useEffect(() => {
        if (bet !== 0 && bet !== null) {
            setRoomData({ gameId, bet, countPlayers });
        }
    }, [bet, countPlayers, gameId]);

    const { handleSubmit, error } = genRoomData(roomData);

    return (
        <div
            onClick={onClose}
            className={clsx(
                "fixed inset-0 z-40 mt-[80px] flex items-center justify-center transition-all duration-300",
                isOpen 
                    ? "opacity-100 pointer-events-auto" 
                    : "opacity-0 pointer-events-none"
            )}
        >
            <div className="absolute inset-0 bg-primary-black bg-opacity-85 backdrop-blur-sm" />
            <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    "relative w-full max-w-[500px] transform rounded-lg bg-primary-dark-blue p-6 shadow-xl transition-all duration-300",
                    isOpen 
                        ? "translate-y-0 opacity-100" 
                        : "translate-y-8 opacity-0"
                )}
            >
                <form
                    onSubmit={(e) => {
                        if (bet === 0 || isNaN(bet)) {
                            e.preventDefault();
                            return;
                        }
                        handleSubmit(e);
                    }}
                    className="flex mt-4 flex-col items-center w-full gap-3"
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-purple-200 font-bold">Введите ставку</h2>
                        <input
                            type="number"
                            value={!isNaN(bet) ? bet : ""}
                            onChange={(e) => setBet(parseInt(e.target.value))}
                            className="bg-primary-dark-blue border border-primary-pink/80 text-primary-white font-semibold text-sm rounded-lg focus:ring-primary-pink focus:border-primary-pink block w-full p-2.5 transition-colors duration-200"
                        />

                        <h2 className="text-md text-purple-200 font-bold">
                            Выберите количество игроков:
                        </h2>
                        <div className="flex flex-row gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={2}
                                    checked={countPlayers === 2}
                                    onChange={() => setCountPlayers(2)}
                                    name="players"
                                    className="w-5 h-5 text-primary-pink bg-primary-dark-blue border-primary-pink/80 focus:ring-primary-pink"
                                />
                                <span className="text-primary-white">2</span>
                            </label>
                            <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <input
                                    type="radio"
                                    value={3}
                                    disabled
                                    name="players"
                                    className="w-5 h-5 bg-primary-dark-blue border-primary-pink/40"
                                />
                                <span className="text-primary-white">3</span>
                            </label>
                            <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <input
                                    type="radio"
                                    value={4}
                                    disabled
                                    name="players"
                                    className="w-5 h-5 bg-primary-dark-blue border-primary-pink/40"
                                />
                                <span className="text-primary-white">4</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={bet === 0 || isNaN(bet)}
                        className={clsx(
                            "mt-4 p-3 text-xl text-primary-white font-bold bg-primary-pink/80 rounded-lg transition-all duration-200",
                            bet !== 0 && !isNaN(bet)
                                ? "hover:text-primary-pink/90 hover:bg-primary-white/80 hover:scale-105"
                                : "opacity-50 cursor-not-allowed"
                        )}
                    >
                        Создать комнату
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoomModal