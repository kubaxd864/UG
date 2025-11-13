"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import CompareButton from "./CompareButton";
import axios from "axios";

export default function PokemonCard({
  name,
  id,
  favorites,
  toggleFavorite,
  addToCompare,
}) {
  const [pokemonInfo, setPokemoninfo] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data }) => {
      setPokemoninfo(data);
    });
  }, [name]);

  return (
    <div className="relative flex flex-col justify-center bg-zinc-900 shadow-lg shadow-zinc-900 border-solid rounded-xl text-center capitalize p-3">
      <img
        src={pokemonInfo.sprites?.front_default}
        alt={name}
        className=""
      ></img>
      <Link href={`/pokemon/${name}`}>
        <div className="flex flex-row gap-3 justify-center text-xl">
          <p>#{id}</p>
          <p className="font-bold">{name}</p>
        </div>
      </Link>
      <FavoriteButton
        name={name}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <CompareButton name={name} addToCompare={addToCompare} />
    </div>
  );
}
