"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useGamesData from "@/hooks/useGamesData";
import { useInView } from "react-intersection-observer";

type Games = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  is_active: boolean;
};

function Games() {
  let games: Games[] = useGamesData();
  // const [loadedLists, setLoadedLists] = useState(2);

  const { ref, inView, entry } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is in view
  });
  // useEffect(() => {
  //     if (inView && entry && entry.boundingClientRect.top + entry.boundingClientRect.height / 2 >= window.innerHeight / 2) {
  //         setLoadedLists(loadedLists+1)
  //     }
  // }, [inView, entry]);

  if (!games) {
    return (
      <div
        className={
          "h-[100dvh] w-full flex justify-center flex-col items-center bg-gray-800"
        }
      >
        <h2 className="text-xl text-purple-200 font-bold">Идет загрузка игр</h2>
        <Image
          className={"w-[30%] ml-8"}
          src={"/animated/loading.svg"}
          width={100}
          height={100}
          alt={"loading"}
        />
      </div>
    ); // Show a loading message while fetching data ф
  }

  return (
    <div className={"h-[100%] w-full flex justify-center bg-gray-800"}>
      <div className="bg-gray-800 py-8 mt-[80px] max-w-[500px] ">
        <div className="mx-auto !py-2 !px-6 ">
          {games.map((game) => (
            <Link key={game.id} href={`/${game.id}`} ref={ref}>
              <div
                className="group  mb-4 p-4 scale-100 rounded-lg shadow-md hover:shadow-lg
                                 hover:scale-105 focus:scale-105 transition duration-300 border-primary-pink border-2 border-opacity-50 focus:border-opacity-95 hover:border-opacity-90"
              >
                <Image
                  width={100}
                  height={100}
                  src={
                    game.thumbnail_url
                      ? game.thumbnail_url
                      : "/images/game_placeholder.png"
                  }
                  alt={game.title}
                  className="max-h-[231px] max-w-[430px] w-full object-cover rounded-lg
                                                scale-100 transition duration-500 group-hover:scale-105 focus:scale-105"
                />
                <div className="p-4 ab">
                  <h3 className="text-xl text-primary-pink font-semibold">
                    {game.title}
                  </h3>
                  <p className="text-primary-white">{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
