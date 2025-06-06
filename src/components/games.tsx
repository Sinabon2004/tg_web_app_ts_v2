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
    );
  }


  return (
    <div className={"h-[100%] w-full flex justify-center bg-gray-800"}>
      <div className="bg-gray-800 py-8 mt-[80px] max-w-[500px] ">
        <div className="mx-auto !py-2 !px-6 ">
          {games.map((game, index) => (
            <Link 
              key={game.id} 
              href={index === 0 ? `/${game.id}` : '#'} 
              ref={ref}
              className={index !== 0 ? 'cursor-not-allowed' : ''}
              onClick={(e) => index !== 0 && e.preventDefault()}
            >
              <div
                className={`group mb-4 p-4 scale-100 rounded-lg shadow-md hover:shadow-lg bg-primary-pink/10 backdrop-blur-sm
                          hover:scale-105 focus:scale-105 transition duration-300 border-primary-pink border-2 border-opacity-50 
                          focus:border-opacity-95 hover:border-opacity-90 relative ${
                            index !== 0 ? 'opacity-50' : ''
                          }`}
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
                {index !== 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-[2px] rounded-lg">
                    <div className="bg-primary-pink/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary-pink/50">
                      <p className="text-primary-white font-semibold">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
