import { useState, useEffect } from "react";
import axios from "axios";

export default function ComparisonBox({
  name,
  pokemonInfo,
  statWins,
  addToCompare,
}) {
  return (
    <div className="relative flex flex-col w-[30%] bg-zinc-900 shadow-lg rounded-xl text-center capitalize p-3">
      <div className="flex justify-center items-center">
        <img
          src={pokemonInfo.sprites?.front_default}
          alt={name}
          className="w-[180px] h-[180px]"
        ></img>
      </div>
      <div className="flex flex-row gap-3 justify-center text-xl">
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex flex-col items-center pt-5">
        <div className="flex flex-row gap-4 text-sm">
          <div className="flex flex-col gap-2">
            <p>Wzrost:</p>
            <p className="font-bold">{pokemonInfo.height / 10} m</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Waga:</p>
            <p className="font-bold">{pokemonInfo.weight / 10} kg</p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3">
          {pokemonInfo.stats?.map((e, i) => {
            const isWin = statWins[e.stat.name];
            return (
              <div key={i}>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row justify-between">
                    <label className="capitalize">{e.stat.name}:</label>
                    <p
                      className={`bg-zinc-800 p-0.5 px-2 rounded-xl ${
                        isWin ? "font-extrabold" : ""
                      }`}
                    >
                      {e.base_stat}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute bottom-2 left-4 w-[90%] bg-red-300 border border-red-500 text-red-500 rounded-xl p-1"
        onClick={() => addToCompare(name)}
      >
        X
      </button>
    </div>
  );
}
