import React, { useEffect } from "react";
import clsx from "clsx";
import genRoomData from "@/hooks/GenRoomData";
import { useRouter } from "next/navigation";
import { router } from "next/client";
import useRoomJoin from "@/hooks/useRoomJoin";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: GameData;
}

type RoomId = {
  roomId: any;
};

type GameData = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  is_active: boolean;
  websocket_uri: string;
  front_uri: string;
};

const joinRoomModal: React.FC<ModalProps> = ({ isOpen, onClose, gameData }) => {
  const gameId = gameData?.id;

  let OpenClassWrapper = isOpen ? "top-0" : "top-[100%]";
  let OpenClassContent = isOpen ? "top-0" : "top-[-100%]";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [roomId, setRoomId] = React.useState("123");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSubmit, error } = useRoomJoin(`/play/ticktacktoe/${roomId}`);

  return (
    <div
      onClick={() => {
        onClose();
      }}
      className={clsx(
        OpenClassWrapper,
        "mt-[80px]   duration-150  fixed inset-0 z-40  bg-primary-black bg-opacity-85 flex justify-center items-center overflow-hidden"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          OpenClassContent,
          "relative transition-all  duration-400 max-w-[500px] bg-primary-dark-blue p-6 w-full rounded-lg shadow-xl"
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="flex  mt-4 flex-col items-center  w-full gap-3"
        >
          <div className="flex flex-col w-full  gap-4">
            <h1 className="text-xl text-primary-white font-bold ">
              Введите ID комнаты
            </h1>
            <input
              type="text"
              id="default-input"
              value={roomId}
              onChange={(e) => setRoomId(e.currentTarget.value)}
              className="bg-primary-white border border-primary-pink text-primary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <button
            type="submit"
            className={
              " mt-4 p-4 text-xl text-primary-white font-bold" +
              " bg-primary-pink/50 rounded-lg hover:text-primary-dark-blue hover:bg-primary-white/80" +
              " transition"
            }
          >
            присоединиться
          </button>
        </form>
      </div>
    </div>
  );
};

export default joinRoomModal;
