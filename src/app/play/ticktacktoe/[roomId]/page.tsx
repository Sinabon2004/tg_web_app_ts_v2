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
  return {
    player1: { id: parseInt(playerId1), ...playerValue1 },
    player2: { id: parseInt(playerId2), ...playerValue2 }
  };
};

export default function Page({ params }: { params: { roomId: number } }) {
  const [gameWs, setGameWs] = useState<WebSocket | null>(null);
  // const [websocketUrl, setWebsocketUrl] = useState<String>()
  // const roomData= useRoomData(params.roomId);
  const [roomData, setRoomData] = useState<roomDataType>();
  const [playData, setPlayData] = useState<PlayingGameType>();

  // const {initData} = init();

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

          // console.log("const", data);
          // console.log("set", roomData);
        } catch (error) {
          console.error("Error fetching game data:", error);
          // Handle errors
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
      // console.log(roomData);
      if (!gameWs) {
        // console.log(`wss://accepted-elephant-jolly.ngrok-free.app${String(roomData.websocket_uri)}/${String(params.roomId)}/${String(user?.id)}`);
        const service = new WebSocket(
          `${process.env.NEXT_PUBLIC_API_URL}${String(
            roomData.websocket_uri
          )}/${String(params.roomId)}/${String(user?.id)}`
        );
        // new TickTackToeService("wss://accepted-elephant-jolly.ngrok-free.app", String(roomData.websocket_uri), String(params.roomId), String(userId));
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

  const [isReady, setIsReady] = useState(false); //
  const handleClickReady = () => {
    if (gameWs !== null) {
      gameWs.send(isReady ? "not_ready" : "ready"); // Send appropriate message based on isReady
      setIsReady((prevState) => !prevState); // Toggle isReady state
    } else {
      alert("Wait");
    }
  };

  const [typePlayer, setTypePlayer] = useState<string>("1");
  let EnemyAvatar: any = null;
  if (
    typePlayer == "1" &&
    playData?.connected_players !== undefined &&
    playData?.connected_players !== null
  ) {
    if (String(user?.id) === Object.keys(playData?.connected_players)[0]) {
      setTypePlayer("X");
      EnemyAvatar = Object.values(playData?.connected_players)[1];
    } else {
      setTypePlayer("O");
      EnemyAvatar = Object.values(playData?.connected_players)[0];
    }
  }
  if (
    playData?.connected_players !== undefined &&
    Object.keys(playData?.connected_players).length == 2
  ) {
  }

  let winAnimation = "";
  {
    !playData?.game_finished
      ? (winAnimation = "opacity-0 hidden")
      : (winAnimation = "opacity-100 flex");
  }

  if (!playData?.connected_players) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-primary-dark-blue">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-pink border-t-transparent"></div>
          <p className="text-lg font-medium text-purple-200">Загрузка сессии...</p>
        </div>
      </div>
    );
  }

  const { player1, player2 } = getPlayer1And2(playData.connected_players);

  if (!playData.game_started) {
    return (
      <div className="min-h-screen bg-primary-dark-blue">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-primary-pink">
                    Комната {params.roomId}
                  </h1>
                  <span className="text-xl font-medium text-primary-white">
                    {Object.keys(playData.connected_players).length}/{playData.count_players}
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-purple-200">
                    Игроки в сессии:
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(playData.connected_players).map(([playerId, playerData]) => (
                      <div 
                        key={playerId}
                        className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-4 transition-all duration-300 hover:bg-gray-800/70"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar src="/images/avatar.png" size={40} />
                            <span className="text-primary-white">{playerData?.username}</span>
                          </div>
                          <span className={clsx(
                            "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300",
                            playerData?.is_ready 
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          )}>
                            {playerData?.is_ready ? "Готов" : "Не готов"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleClickReady}
                  className={clsx(
                    "group relative w-full overflow-hidden rounded-lg p-4 text-lg font-bold transition-all duration-300",
                    isReady
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-primary-pink text-white hover:bg-primary-pink/90"
                  )}
                >
                  <span className="relative z-10">
                    {isReady ? "Готов к игре" : "Подготовиться к игре"}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark-blue">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="mx-auto max-w-lg">
          {/* Game Over Modal */}
          <div className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
            playData.game_finished 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          )}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <div className={clsx(
              "relative w-full max-w-md transform rounded-2xl bg-gray-900 p-6 text-center transition-all duration-500",
              playData.game_finished ? "translate-y-0" : "translate-y-8"
            )}>
              <Image
                className="mx-auto w-40 h-40"
                src="/images/gameOver.gif"
                width={160}
                height={160}
                alt="Game Over"
              />
              <h2 className="mt-4 text-2xl font-bold text-primary-pink">
                {playData?.winner_id === null
                  ? "Ничья!"
                  : playData?.winner_id == user.id
                  ? "Победа!"
                  : "Поражение"}
              </h2>
              <p className="mt-2 text-lg text-purple-200">
                {playData?.winner_id === null
                  ? "Равная игра"
                  : playData?.winner_id == user.id
                  ? `Выигрыш: ${playData?.bet} монет`
                  : `Проигрыш: ${playData?.bet} монет`}
              </p>
              <Link
                href="/"
                className="mt-6 inline-block w-full rounded-lg bg-primary-pink px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-primary-pink/90 hover:scale-105"
              >
                Вернуться в меню
              </Link>
            </div>
          </div>

          {/* Game Board */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm">
            <div className="relative aspect-square p-2">
              <div className="grid h-full w-full grid-cols-3 gap-2 bg-gray-800 p-2">
                {playData?.game_progress?.map((row, y) => (
                  row.map((cell, x) => (
                    <button
                      key={`${y}-${x}`}
                      onClick={() => {
                        if (cell.user_id === null && gameWs && playData.current_player_id === user.id) {
                          gameWs.send(`${y},${x}`);
                        }
                      }}
                      disabled={cell.user_id !== null || playData.current_player_id !== user.id}
                      className={clsx(
                        "aspect-square rounded bg-gray-700/50 p-4 transition-all duration-300",
                        cell.user_id === null && playData.current_player_id === user.id
                          ? "hover:bg-gray-700 hover:scale-[0.98]"
                          : "cursor-not-allowed"
                      )}
                    >
                      {cell.user_id !== null && (
                        <div className="flex h-full items-center justify-center">
                          <Image
                            src={cell.user_id === user.id ? "/ticktacktoe/O.svg" : "/ticktacktoe/X.svg"}
                            alt={cell.user_id === user.id ? "O" : "X"}
                            width={40}
                            height={40}
                            className="h-full w-full transition-all duration-300"
                          />
                        </div>
                      )}
                    </button>
                  ))
                ))}
              </div>
            </div>

            {/* Players Info */}
            <div className="border-t border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar 
                      src={player1.avatar_url || "/images/avatar.png"} 
                      size={50}
                    />
                    {playData.current_player_id === player1.id && !playData.game_finished && (
                      <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-gray-900" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-primary-white">{player1.username}</p>
                    <p className="text-sm text-gray-400">Игрок 1 (X)</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">Ставка</p>
                  <p className="text-xl font-bold text-primary-pink">{playData.bet} ₽</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-primary-white text-right">{player2.username}</p>
                    <p className="text-sm text-gray-400 text-right">Игрок 2 (O)</p>
                  </div>
                  <div className="relative">
                    <Avatar 
                      src={player2.avatar_url || "/images/avatar.png"} 
                      size={50}
                    />
                    {playData.current_player_id === player2.id && !playData.game_finished && (
                      <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-gray-900" />
                    )}
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
