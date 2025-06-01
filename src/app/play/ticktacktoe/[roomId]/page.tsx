"use client";

import { useEffect, useState } from "react";

import Header from "@/components/header";

import useUserData from "@/hooks/useUserData";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import Avatar from "@/components/avatar";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

type roomDataType = {
  bet?: number;
  connected_players?: object;
  count_players?: number;
  current_player_id?: number | null;
  description?: string;
  game_finished?: boolean;
  game_id?: number;
  game_progress?: any;
  game_started?: boolean;
  title?: string;
  websocket_uri: string;
  winner_id?: number | null;
};

type PlayingGameType = {
  game_id: number;
  title: string;
  description: string;
  websocket_uri: string;
  bet: number;
  count_players: number;
  connected_players?: object;
  current_player_id: number | null;
  game_started: boolean;
  game_progress: { user_id: number | null; checked_at: string | null }[][];
  game_finished: boolean;
  winner_id: number | null;
};

type userData = {
  avatar_url: string;
  money: number;
};

interface Player {
  id: number;
  last_name: string | null;
  first_name: string;
  username: string;
  avatar_url: string | null;
  is_ready: boolean;
}

interface Players {
  [userId: string]: Player;
}

const getPlayer1And2 = (connected_players: object) => {
  const [playerId1, playerId2] = Object.keys(connected_players);
  const [playerValue1, playerValue2] = Object.values(connected_players);

  // Create Player1 and Player2 objects
  const player1: Player = {
    id: parseInt(playerId1),
    ...playerValue1,
  };

  const player2: Player = {
    id: parseInt(playerId2),
    ...playerValue2,
  };
  console.log(typeof player2?.id);
  return { player1, player2 };
};

export default function Page({ params }: { params: { roomId: number } }) {
  const [gameWs, setGameWs] = useState<WebSocket | null>(null);
  const [roomData, setRoomData] = useState<roomDataType>();
  const [playData, setPlayData] = useState<PlayingGameType>();
  const [isReady, setIsReady] = useState(false);
  const [typePlayer, setTypePlayer] = useState<string>("1");

  useEffect(() => {
    const fetchGameData = async () => {
      if (params.roomId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/games/get_room/${params.roomId}`,
            {
              method: "get",
              headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
              }),
            }
          );

          const data = await response.json();
          console.log(data);
          setRoomData(data);
        } catch (error) {
          console.error("Error fetching game data:", error);
        }
      }
    };

    fetchGameData();
  }, [params.roomId]);
  const { initData } = retrieveLaunchParams();
  const userData: userData | undefined = useUserData(initData?.user?.id);
  const user = {
    ...initData?.user,
    ...userData,
  };

  useEffect(() => {
    if (roomData) {
      if (!gameWs) {
        const service = new WebSocket(
          `${process.env.NEXT_PUBLIC_API_URL}${String(
            roomData.websocket_uri
          )}/${String(params.roomId)}/${String(user?.id)}`
        );
        setGameWs(service);
      }
    }
  }, [gameWs, params.roomId, roomData, user?.id]);

  if (gameWs !== null) {
    gameWs.onopen = () => {
      console.log("Connected to server");
    };
    gameWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        setPlayData(data);
      }
    };
    gameWs.onclose = () => {
      console.log("Disconnected from server");
    };
    gameWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  useEffect(() => {
    if (playData?.connected_players) {
      console.log(playData);
    }
  }, [playData]);

  const handleClickReady = () => {
    if (gameWs !== null) {
      gameWs.send(isReady ? "not_ready" : "ready");
      setIsReady((prevState) => !prevState);
    } else {
      alert("Wait");
    }
  };

  if (playData?.connected_players !== undefined && playData?.connected_players !== null) {
    const { player1, player2 } = getPlayer1And2(playData?.connected_players);

    if (playData?.game_started) {
      return (
        <div className="relative min-h-screen overflow-hidden">
          {/* Фиксированный фон */}
          <div className="fixed inset-0 bg-[#1C1C1D]">
            <div className={`absolute inset-0 bg-gradient-to-b ${
              playData.game_finished 
                ? playData.winner_id === user.id 
                  ? "from-green-500/5" 
                  : "from-red-500/5"
                : "from-primary-pink/5"
            } to-transparent`} />
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
          </div>

          {/* Game Over Modal */}
          {playData.game_finished && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <div className={`relative w-full max-w-md transform rounded-2xl bg-gray-900/90 p-8 text-center ${
                playData.winner_id === user.id
                  ? "shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  : "shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              }`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${
                  playData.winner_id === user.id
                    ? "from-green-500/20"
                    : "from-red-500/20"
                } to-transparent opacity-20`} />
                <Image
                  className="mx-auto h-40 w-40 animate-bounce-slow"
                  src="/images/gameOver.gif"
                  width={160}
                  height={160}
                  alt="Game Over"
                />
                <h2 className={`mt-4 text-3xl font-bold ${
                  playData.winner_id === user.id
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {playData.winner_id === user.id ? "Победа!" : "Поражение"}
                </h2>
                <p className={`mt-2 text-xl ${
                  playData.winner_id === user.id
                    ? "text-green-200/80"
                    : "text-red-200/80"
                }`}>
                  {playData.winner_id === user.id ? "Выигрыш: " : "Проигрыш: "} 
                  {playData.bet} монет
                </p>
                <Link
                  href="/"
                  className={`mt-6 inline-block w-full rounded-xl px-6 py-4 text-lg font-medium text-white transition-all duration-300 transform hover:scale-105 relative group overflow-hidden ${
                    playData.winner_id === user.id
                      ? "bg-gradient-to-r from-green-500 via-green-400 to-green-500"
                      : "bg-gradient-to-r from-red-500 via-red-400 to-red-500"
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Вернуться в меню
                  </span>
                </Link>
              </div>
            </div>
          )}

          <main className="relative min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 container mx-auto px-4 py-6 mt-[72px]">
              <div className="mx-auto max-w-2xl h-full flex flex-col">
                {/* Верхняя навигация */}
                <div className="mb-4">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Вернуться в меню
                  </Link>
                </div>

                <div className={`flex-1 overflow-hidden rounded-2xl bg-gray-900/90 backdrop-blur-sm ${
                  playData.game_finished
                    ? playData.winner_id === user.id
                      ? "shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                      : "shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "shadow-[0_0_15px_rgba(255,45,85,0.1)]"
                }`}>
                  {/* Игровая сетка */}
                  <div className="relative aspect-square p-4">
                    <div className="relative grid h-full w-full grid-cols-4 gap-0 rounded-xl bg-gray-800/50">
                      {playData?.game_progress.map((row, y) =>
                        row.map((el, x) => (
                          <button
                            key={`${y}-${x}`}
                            className={clsx(
                              "group relative aspect-square p-3 transition-all duration-300",
                              "border-[1px]",
                              playData.game_finished
                                ? playData.winner_id === user.id
                                  ? "border-green-500/20"
                                  : "border-red-500/20"
                                : "border-primary-pink/20",
                              el.user_id === null && !playData.game_finished
                                ? "bg-gray-800 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,45,85,0.1)] hover:scale-[0.98]"
                                : el.user_id === playData.winner_id && playData.game_finished
                                ? playData.winner_id === user.id
                                  ? "bg-green-500/10"
                                  : "bg-red-500/10"
                                : "bg-gray-800",
                              y === 0 && "border-t-0",
                              x === 0 && "border-l-0",
                              y === 3 && "border-b-0",
                              x === 3 && "border-r-0"
                            )}
                            onClick={() => {
                              if (el.user_id === null && gameWs) {
                                if (playData.current_player_id === user.id) {
                                  gameWs?.send(`${y},${x}`);
                                }
                              }
                            }}
                          >
                            {el.user_id === null && !playData.game_finished && (
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-pink/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                            {el.user_id !== null && (
                              <div className="flex h-full items-center justify-center">
                                <Image
                                  src={el.user_id == user.id ? "/ticktacktoe/O.svg" : "/ticktacktoe/X.svg"}
                                  alt={el.user_id == user.id ? "O" : "X"}
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
                  <div className="border-none bg-gray-900/50 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className={`rounded-full p-[2px] ${
                            playData.game_finished
                              ? playData.winner_id === player1.id
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : "bg-gradient-to-r from-gray-700 to-gray-600 opacity-50"
                              : "bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500"
                          }`}>
                            <div className="rounded-full p-[2px] bg-gray-900">
                              <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${player1.avatar_url}`|| "/images/avatar.png"} size={50} />
                            </div>
                          </div>
                          {((playData.current_player_id === player1.id && !playData.game_finished) ||
                            (playData.game_finished && playData.winner_id === player1.id)) && (
                            <div className={`absolute -right-1 -top-1 h-4 w-4 rounded-full ${
                              playData.game_finished
                                ? "bg-green-500"
                                : "bg-green-500 animate-pulse"
                            } ring-2 ring-gray-900`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium bg-gradient-to-r from-primary-pink to-purple-500 inline-block text-transparent bg-clip-text">
                            {player1.username}
                          </p>
                          <p className={`text-sm ${
                            playData.game_finished
                              ? playData.winner_id === player1.id
                                ? "text-green-400/60"
                                : "text-gray-400"
                              : "text-gray-400"
                          }`}>
                            {playData.game_finished
                              ? playData.winner_id === player1.id
                                ? "Победитель"
                                : "Проигравший"
                              : "Игрок 1 (O)"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium bg-gradient-to-r from-purple-500 to-blue-500 inline-block text-transparent bg-clip-text text-right">
                            {player2.username}
                          </p>
                          <p className={`text-sm text-right ${
                            playData.game_finished
                              ? playData.winner_id === player2.id
                                ? "text-green-400/60"
                                : "text-gray-400"
                              : "text-gray-400"
                          }`}>
                            {playData.game_finished
                              ? playData.winner_id === player2.id
                                ? "Победитель"
                                : "Проигравший"
                              : "Игрок 2 (X)"}
                          </p>
                        </div>
                        <div className="relative">
                          <div className={`rounded-full p-[2px] ${
                            playData.game_finished
                              ? playData.winner_id === player2.id
                                ? "bg-gradient-to-r from-green-500 to-green-400"
                                : "bg-gradient-to-r from-gray-700 to-gray-600 opacity-50"
                              : "bg-gradient-to-r from-purple-600 to-blue-500"
                          }`}>
                            <div className="rounded-full p-[2px] bg-gray-900">
                              <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${player2.avatar_url}` || "/images/avatar.png"} size={50} />
                            </div>
                          </div>
                          {((playData.current_player_id === player2.id && !playData.game_finished) ||
                            (playData.game_finished && playData.winner_id === player2.id)) && (
                            <div className={`absolute -right-1 -top-1 h-4 w-4 rounded-full ${
                              playData.game_finished
                                ? "bg-green-500"
                                : "bg-green-500 animate-pulse"
                            } ring-2 ring-gray-900`} />
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
    } else {
      return (
        <div className="relative min-h-screen overflow-hidden">
          {/* Фиксированный фон */}
          <div className="fixed inset-0 bg-[#1C1C1D]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-pink/5 to-transparent" />
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
          </div>

          <main className="relative">
            <Header />
            <div className="container mx-auto px-4 pt-24">
              <div className="mx-auto max-w-lg">
                <div className="bg-gray-900/90 py-8 px-6 rounded-2xl backdrop-blur-sm shadow-[0_0_15px_rgba(255,45,85,0.1)]">
                  <div className="flex justify-between">
                    <h1 className="text-2xl text-blue-600 font-bold">
                      Комната {params.roomId}
                    </h1>
                    <h1 className="text-2xl text-blue-600 font-bold">
                      {Object.keys(playData.connected_players).length}/
                      {playData.count_players}
                    </h1>
                  </div>
                  <div className="w-full max-w-[500px] p-1 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg mt-7">
                    <div className="w-full bg-gray-800/80 rounded-lg p-4 backdrop-blur-sm">
                      <h2 className="text-xl font-bold bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500 inline-block text-transparent bg-clip-text">
                        Игроки в сессии:
                      </h2>
                      <div className="mt-4 space-y-3">
                        {playData?.connected_players &&
                          Object.entries(playData.connected_players as Record<string, any>).map(
                            ([playerId, playerData], index, array) => (
                              <div key={playerId}>
                                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-transparent bg-gradient-to-r from-transparent via-primary-pink/20 to-transparent hover:from-primary-pink/20 hover:via-purple-500/20 hover:to-blue-500/20 transition-all duration-300">
                                  <div className="flex items-center space-x-3">
                                    <div className="rounded-full p-[2px] bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500">
                                      <div className="rounded-full p-[2px] bg-gray-900">
                                        <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${playerData.avatar_url}` || "/images/avatar.png"} size={40} />
                                      </div>
                                    </div>
                                    <div>
                                      <p className="font-medium bg-gradient-to-r from-primary-pink to-purple-500 inline-block text-transparent bg-clip-text">
                                        {playerData.username}
                                      </p>
                                      <p className={`text-sm ${
                                        playerData.is_ready
                                          ? "text-green-400"
                                          : "text-gray-400"
                                      }`}>
                                        {playerData.is_ready ? "Готов" : "Не готов"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {index < array.length - 1 && (
                                  <div className="h-[2px] mx-4 my-3 bg-gradient-to-r from-transparent via-primary-pink/30 to-transparent" />
                                )}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Кнопка готовности */}
                  <div className="mt-6 p-[2px] rounded-lg bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500">
                    <button
                      onClick={handleClickReady}
                      className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-all duration-300 relative group overflow-hidden ${
                        isReady
                          ? "bg-gray-900 text-green-400"
                          : "bg-gray-900 text-purple-400"
                      }`}
                    >
                      <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                        isReady
                          ? "bg-gradient-to-r from-green-500/20 via-green-400/20 to-green-500/20"
                          : "bg-gradient-to-r from-primary-pink/20 via-purple-500/20 to-blue-500/20"
                      }`} />
                      <span className="relative">
                        {isReady ? (
                          <span className="bg-gradient-to-r from-green-400 to-green-500 inline-block text-transparent bg-clip-text">
                            Готов
                          </span>
                        ) : (
                          <span className="bg-gradient-to-r from-primary-pink via-purple-500 to-blue-500 inline-block text-transparent bg-clip-text">
                            Не готов
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  } else {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Фиксированный фон */}
        <div className="fixed inset-0 bg-[#1C1C1D]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-pink/5 to-transparent" />
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5" />
        </div>

        <div className="h-screen w-full flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-xl text-purple-200 font-bold mb-4">
              Идет загрузка сессии
            </h2>
            <Image
              className="w-32 h-32 mx-auto"
              width={100}
              height={100}
              src="/animated/loading.svg"
              alt="loading"
            />
          </div>
        </div>
      </div>
    );
  }
}
