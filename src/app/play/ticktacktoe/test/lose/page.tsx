"use client";

import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/avatar";

export default function LoseTestPage() {
  const mockGameData = {
    bet: 100,
    game_finished: true,
    winner_id: 456,
    game_progress: [
      [
        { user_id: 456, checked_at: "2024-03-20" },
        { user_id: 456, checked_at: "2024-03-20" },
        { user_id: 456, checked_at: "2024-03-20" },
      ],
      [
        { user_id: 123, checked_at: "2024-03-20" },
        { user_id: 123, checked_at: "2024-03-20" },
        { user_id: null, checked_at: null },
      ],
      [
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
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
      </div>

      {/* Game Over Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="relative w-full max-w-md transform rounded-2xl bg-gray-900/90 p-8 text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/20 to-transparent opacity-20" />
          <Image
            className="mx-auto h-40 w-40 animate-bounce-slow"
            src="/images/gameOver.gif"
            width={160}
            height={160}
            alt="Game Over"
          />
          <h2 className="mt-4 text-3xl font-bold text-red-400">
            Поражение
          </h2>
          <p className="mt-2 text-xl text-red-200/80">
            Проигрыш: {mockGameData.bet} монет
          </p>
          <Link
            href="/play/ticktacktoe/test/game"
            className="mt-6 inline-block w-full rounded-lg bg-red-500 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-red-400 hover:scale-105"
          >
            К игровому полю
          </Link>
        </div>
      </div>

      <main className="relative">
        <div className="container mx-auto px-4 pt-24">
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-2xl bg-gray-900/90 shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-sm">
              {/* Игровая сетка */}
              <div className="relative aspect-square p-4">
                <div className="relative grid h-full w-full grid-cols-3 gap-0 rounded-xl bg-gray-800/50">
                  {mockGameData.game_progress.map((row, y) =>
                    row.map((cell, x) => (
                      <button
                        key={`${y}-${x}`}
                        disabled
                        className={`
                          group relative aspect-square border-[1px] border-red-500/20 p-4 transition-all duration-300
                          ${y === 0 ? "border-t-0" : ""}
                          ${x === 0 ? "border-l-0" : ""}
                          ${y === 2 ? "border-b-0" : ""}
                          ${x === 2 ? "border-r-0" : ""}
                          ${cell.user_id === mockGameData.winner_id ? "bg-red-500/10" : "bg-gray-800"}
                        `}
                      >
                        {cell.user_id !== null && (
                          <div className="flex h-full items-center justify-center">
                            <Image
                              src={
                                cell.user_id === 123
                                  ? "/ticktacktoe/O.svg"
                                  : "/ticktacktoe/X.svg"
                              }
                              alt={cell.user_id === 123 ? "O" : "X"}
                              width={40}
                              height={40}
                              className={`h-full w-full transition-all duration-300 ${
                                cell.user_id === mockGameData.winner_id
                                  ? "text-red-400"
                                  : ""
                              }`}
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
                      <div className="rounded-full bg-gradient-to-r from-gray-700 to-gray-600 p-1 opacity-50">
                        <Avatar src="/images/avatar.png" size={50} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-primary-white">Player 1 (You)</p>
                      <p className="text-sm text-gray-400">Проигравший</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-red-400 text-right">
                        Player 2
                      </p>
                      <p className="text-sm text-red-400/60 text-right">Победитель</p>
                    </div>
                    <div className="relative">
                      <div className="rounded-full bg-gradient-to-r from-red-500 to-red-400 p-1">
                        <Avatar src="/images/avatar.png" size={50} />
                      </div>
                      <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 ring-2 ring-gray-900" />
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