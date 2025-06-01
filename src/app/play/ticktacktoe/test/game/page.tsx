"use client";

import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/avatar";
import clsx from "clsx";

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
      ],
      [
        { user_id: 456, checked_at: "2024-03-20" },
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
        <div className="absolute inset-0 bg-gradient-to-b from-primary-pink/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
      </div>

      <main className="relative">
        {/* Верхняя навигация */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/play/ticktacktoe/test/win"
                className="rounded-lg bg-green-500/20 px-4 py-2 text-green-400 transition-all hover:bg-green-500/30"
              >
                Тест победы
              </Link>
              <div className="text-center">
                <p className="text-sm text-gray-400">Ставка</p>
                <p className="text-xl font-bold text-primary-pink">
                  {mockGameData.bet} ₽
                </p>
              </div>
              <Link
                href="/play/ticktacktoe/test/lose"
                className="rounded-lg bg-red-500/20 px-4 py-2 text-red-400 transition-all hover:bg-red-500/30"
              >
                Тест поражения
              </Link>
            </div>
          </div>
        </div>

        {/* Игровое поле */}
        <div className="container mx-auto px-4 pt-24">
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-2xl bg-gray-900/90 shadow-[0_0_15px_rgba(255,45,85,0.1)] backdrop-blur-sm">
              {/* Игровая сетка */}
              <div className="relative aspect-square p-4">
                <div className="relative grid h-full w-full grid-cols-3 gap-0 rounded-xl bg-gray-800/50">
                  {mockGameData.game_progress.map((row, y) =>
                    row.map((cell, x) => (
                      <button
                        key={`${y}-${x}`}
                        disabled={cell.user_id !== null}
                        className={clsx(
                          "group relative aspect-square border-[1px] border-primary-pink/20 p-4 transition-all duration-300",
                          cell.user_id === null
                            ? "bg-gray-800 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,45,85,0.1)] hover:scale-[0.98]"
                            : "bg-gray-800 cursor-not-allowed",
                          // Добавляем специфичные границы для создания сетки
                          y === 0 && "border-t-0", // Убираем верхнюю границу для первого ряда
                          x === 0 && "border-l-0", // Убираем левую границу для первой колонки
                          y === 2 && "border-b-0", // Убираем нижнюю границу для последнего ряда
                          x === 2 && "border-r-0" // Убираем правую границу для последней колонки
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
                              width={40}
                              height={40}
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
                      <div className="rounded-full bg-gradient-to-r from-primary-pink to-purple-600 p-1">
                        <Avatar src="/images/avatar.png" size={50} />
                      </div>
                      {mockGameData.current_player_id === 123 && (
                        <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-green-500 ring-2 ring-gray-900" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-primary-white">Player 1 (You)</p>
                      <p className="text-sm text-gray-400">Игрок 1 (O)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-primary-white text-right">
                        Player 2
                      </p>
                      <p className="text-sm text-gray-400 text-right">Игрок 2 (X)</p>
                    </div>
                    <div className="relative">
                      <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-1">
                        <Avatar src="/images/avatar.png" size={50} />
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