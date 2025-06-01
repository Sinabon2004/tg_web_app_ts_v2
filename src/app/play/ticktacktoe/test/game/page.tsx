"use client";

import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/avatar";
import clsx from "clsx";
import Logo from "@/components/Logo";

function MockHeader() {
  return (
    <header className="backdrop-blur-[10px] bg-black/80 fixed w-full top-0 z-10 p-3 flex justify-between items-center">
      <Logo />
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900">
          <Image
            src="/images/ticket.png"
            width={24}
            height={24}
            alt="Tickets"
            className="w-6 h-6"
          />
          <span className="text-white font-medium">1000</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500 p-[2px]">
            <div className="rounded-full p-[2px] bg-gray-900">
              <Avatar src="/images/avatar.png" size={32} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function GameTestPage() {
  const mockGameData = {
    bet: 100,
    game_finished: false,
    current_player_id: 123,
    game_progress: [
      [
        { user_id: 123, checked_at: "2024-03-20" },
        { user_id: 456, checked_at: "2024-03-20" },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
      ],
      [
        { user_id: 456, checked_at: "2024-03-20" },
        { user_id: 123, checked_at: "2024-03-20" },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
      ],
      [
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
      ],
      [
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
        { user_id: null, checked_at: null },
      ],
    ],
    connected_players: {
      "123": {
        username: "Player 1 (You)",
        avatar_url: "/images/avatar.png",
      },
      "456": {
        username: "Player 2",
        avatar_url: "/images/avatar.png",
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Фиксированный фон */}
      <div className="fixed inset-0 bg-[#1C1C1D]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-pink/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
      </div>

      <main className="relative min-h-screen flex flex-col">
        <MockHeader />
        <div className="flex-1 container mx-auto px-4 py-6 mt-[72px]">
          <div className="mx-auto max-w-2xl h-full flex flex-col">
            {/* Верхняя навигация */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Ставка</p>
                <p className="text-xl font-bold bg-gradient-to-r from-primary-pink to-purple-500 inline-block text-transparent bg-clip-text">
                  {mockGameData.bet} ₽
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/play/ticktacktoe/test/win"
                  className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
                >
                  Тест победы
                </Link>
                <Link
                  href="/play/ticktacktoe/test/lose"
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  Тест поражения
                </Link>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl bg-gray-900/90 backdrop-blur-sm shadow-[0_0_15px_rgba(255,45,85,0.1)]">
              {/* Игровая сетка */}
              <div className="relative aspect-square p-4">
                <div className="relative grid h-full w-full grid-cols-4 gap-0 rounded-xl bg-gray-800/50">
                  {mockGameData.game_progress.map((row, y) =>
                    row.map((cell, x) => (
                      <button
                        key={`${y}-${x}`}
                        disabled={cell.user_id !== null}
                        className={clsx(
                          "group relative aspect-square p-3 transition-all duration-300",
                          "border-[1px] border-primary-pink/20",
                          cell.user_id === null
                            ? "bg-gray-800 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,45,85,0.1)] hover:scale-[0.98]"
                            : "bg-gray-800 cursor-not-allowed",
                          y === 0 && "border-t-0",
                          x === 0 && "border-l-0",
                          y === 3 && "border-b-0",
                          x === 3 && "border-r-0"
                        )}
                      >
                        {/* Декоративная рамка для активных ячеек */}
                        {cell.user_id === null && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-pink/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                        
                        {cell.user_id !== null && (
                          <div className="flex h-full items-center justify-center">
                            <Image
                              src={
                                cell.user_id === 123
                                  ? "/ticktacktoe/O.svg"
                                  : "/ticktacktoe/X.svg"
                              }
                              alt={cell.user_id === 123 ? "O" : "X"}
                              width={30}
                              height={30}
                              className="h-full w-full transition-all duration-300"
                            />
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Информация об игроках */}
              <div className="border-t border-gray-800/50 bg-gray-900/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="rounded-full p-[2px] bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500">
                        <div className="rounded-full p-[2px] bg-gray-900">
                          <Avatar src="/images/avatar.png" size={50} />
                        </div>
                      </div>
                      {mockGameData.current_player_id === 123 && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-green-500 ring-2 ring-gray-900" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium bg-gradient-to-r from-primary-pink to-purple-500 inline-block text-transparent bg-clip-text">
                        Player 1 (You)
                      </p>
                      <p className="text-sm text-gray-400">Игрок 1 (O)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium bg-gradient-to-r from-purple-500 to-blue-500 inline-block text-transparent bg-clip-text text-right">
                        Player 2
                      </p>
                      <p className="text-sm text-gray-400 text-right">Игрок 2 (X)</p>
                    </div>
                    <div className="relative">
                      <div className="rounded-full p-[2px] bg-gradient-to-r from-purple-600 to-blue-500">
                        <div className="rounded-full p-[2px] bg-gray-900">
                          <Avatar src="/images/avatar.png" size={50} />
                        </div>
                      </div>
                      {mockGameData.current_player_id === 456 && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-green-500 ring-2 ring-gray-900" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 