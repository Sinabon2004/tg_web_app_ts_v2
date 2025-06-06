"use client";

import { useRouter } from "next/navigation";
import useGameData from "@/hooks/useGameData";
import Header from "@/components/header";
import Image from "next/image";
import CreateRoomModal from "@/components/CreateRoomModal";
import { useState } from "react";
import JoinRoomModal from "@/components/JoinRoomModal";
import { BackButton, postEvent } from "@telegram-apps/sdk-react";

export default function GameDetailsPage({
  params,
}: {
  params: { gameId: number };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const handleModalClickJoin = () => {
    setIsJoinModalOpen(!isJoinModalOpen);
  };

  const gameData = useGameData(params.gameId);

  const router = useRouter();
  const backButton = new BackButton(true, "6.3", postEvent);
  backButton.show();
  backButton.on("click", () => {
    router.push("/");
  });

  if (!gameData) {
    return (
      <div
        className={
          "relative h-[100dvh] w-full flex justify-center flex-col items-center"
        }
      >
        <div className="absolute bg-primary-dark-blue z-[-1] inset-0">
          {/* <img className="w-full h-full " src="/images/background.png" alt="" /> */}
        </div>
        <h2 className="text-xl text-purple-200 font-bold">
          Идет загрузка игры
        </h2>
        <Image
          className={"w-[30%] ml-8"}
          src={"/animated/loading.svg"}
          width={100}
          height={100}
          alt={"loading"}
        />
      </div>
    ); // Show a loading message while fetching data
  }
  const { id, title, description, thumbnail_url, is_active } = gameData;

  return (
    <div
      className={"h-[100dvh] w-full flex justify-center mt-[80px] "}
    >
        <div className="absolute bg-primary-dark-blue z-[-1] inset-0">
          {/* <img className="w-full h-full " src="/images/background.png" alt="" /> */}
        </div>
      <Header />

      <div
        className={"bg-gray-900 py-8 px-4 max-w-[500px] flex flex-col gap-5"}
      >
        <div
          className={
            "max-w-[500px]  p-2 bg-gradient-to-br from-primary-pink to-[#6857F0] rounded-lg"
          }
        >
          <Image
            src={thumbnail_url ? thumbnail_url : "/images/game_placeholder.png"}
            width={500}
            height={500}
            alt={title}
            className={
              "h-auto  object-cover rounded-lg scale-100 transition duration-500 group-hover:scale-105 focus:scale-105"
            }
          />
        </div>

        <h1 className="text-xl text-primary-pink font-semibold ">{title}</h1>
        <h2 className="text-lg text-primary-white font-semibold">{description}</h2>
        <div className={" flex flex-col w-full gap-4"}>
          <button
            onClick={handleModalClick}
            className={
              " p-3 text-xl text-primary-white font-bold" +
              " bg-primary-pink rounded-lg hover:text-primary-pink hover:bg-primary-white" +
              " transition" +
              (!is_active
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : "")
            }
          >
            Создать игру
          </button>
          <button
            onClick={handleModalClickJoin}
            className={
              " p-3 text-xl text-primary-white font-bold" +
              " bg-[#6857F0] rounded-lg hover:text-[#6857F0] hover:bg-primary-white" +
              " transition" +
              (!is_active
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : "")
            }
          >
            Присоединиться к игре
          </button>
        </div>
      </div>

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameData={gameData}
      />
      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        gameData={gameData}
      />
    </div>
  );
}
