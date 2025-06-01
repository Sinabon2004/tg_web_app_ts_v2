import React from "react";
import clsx from "clsx";
import useRoomJoin from "@/hooks/useRoomJoin";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: GameData;
}

type GameData = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  is_active: boolean;
  websocket_uri: string;
  front_uri: string;
};

const JoinRoomModal: React.FC<ModalProps> = ({ isOpen, onClose, gameData }) => {
  const [roomId, setRoomId] = React.useState("");
  const { handleSubmit, error } = useRoomJoin(`/play/ticktacktoe/${roomId}`);

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
            if (!roomId.trim()) {
              e.preventDefault();
              return;
            }
            handleSubmit(e);
          }}
          className="flex mt-4 flex-col items-center w-full gap-3"
        >
          <div className="flex flex-col w-full gap-4">
            <h2 className="text-xl text-purple-200 font-bold">
              Введите ID комнаты
            </h2>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Например: abc123"
              className="bg-primary-dark-blue border border-primary-pink/80 text-primary-white font-semibold text-sm rounded-lg focus:ring-primary-pink focus:border-primary-pink block w-full p-2.5 transition-colors duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={!roomId.trim()}
            className={clsx(
              "mt-4 p-3 text-xl text-primary-white font-bold bg-primary-pink/80 rounded-lg transition-all duration-200",
              roomId.trim()
                ? "hover:text-primary-pink/90 hover:bg-primary-white/80 hover:scale-105"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            Присоединиться
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomModal;
