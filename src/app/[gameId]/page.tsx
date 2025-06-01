"use client";

import { useRouter } from "next/navigation";
import useGameData from "@/hooks/useGameData";
import Header from "@/components/header";
import Image from "next/image";
import CreateRoomModal from "@/components/CreateRoomModal";
import { useState } from "react";
import JoinRoomModal from "@/components/JoinRoomModal";
import { BackButton, postEvent } from "@telegram-apps/sdk-react";
import clsx from "clsx";

export default function GameDetailsPage({
  params,
}: {
  params: { gameId: number };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const gameData = useGameData(params.gameId);
  const router = useRouter();

  // Setup back button
  const backButton = new BackButton(true, "6.3", postEvent);
  backButton.show();
  backButton.on("click", () => router.push("/"));

  if (!gameData) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-primary-dark-blue">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-pink border-t-transparent"></div>
          <p className="text-purple-200 font-bold">Загрузка игры...</p>
        </div>
      </div>
    );
  }

  const { title, description, thumbnail_url, is_active } = gameData;

  return (
    <div className="min-h-screen bg-primary-dark-blue">
      <Header />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm">
            <div className="relative">
              <div className={clsx(
                "transition-opacity duration-500",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
                <Image
                  src={thumbnail_url || "/images/game_placeholder.png"}
                  width={1200}
                  height={675}
                  alt={title}
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: "16/9" }}
                  onLoad={() => setIsImageLoaded(true)}
                  priority
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-3xl font-bold text-primary-white">
                  {title}
                </h1>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <p className="text-lg leading-relaxed text-primary-white/90">
                {description}
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={!is_active}
                  className={clsx(
                    "group relative overflow-hidden rounded-lg bg-primary-pink p-4 text-lg font-bold text-primary-white transition-all duration-300",
                    is_active 
                      ? "hover:bg-primary-white hover:text-primary-pink hover:scale-[1.02]" 
                      : "cursor-not-allowed opacity-50"
                  )}
                >
                  <span className="relative z-10">Создать игру</span>
                  <div className="absolute inset-0 -translate-x-full bg-primary-white transition-transform duration-300 group-hover:translate-x-0" />
                </button>

                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  disabled={!is_active}
                  className={clsx(
                    "group relative overflow-hidden rounded-lg bg-[#6857F0] p-4 text-lg font-bold text-primary-white transition-all duration-300",
                    is_active 
                      ? "hover:bg-primary-white hover:text-[#6857F0] hover:scale-[1.02]" 
                      : "cursor-not-allowed opacity-50"
                  )}
                >
                  <span className="relative z-10">Присоединиться к игре</span>
                  <div className="absolute inset-0 -translate-x-full bg-primary-white transition-transform duration-300 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

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
