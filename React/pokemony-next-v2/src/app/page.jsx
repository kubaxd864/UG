"use client";
import PokemonList from "../components/PokemonList";
import FavoriteCounter from "@/components/FavoriteCounter";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listlength, setListlength] = useState(20);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.length != 12) {
        return prev.includes(id)
          ? prev.filter((favId) => favId !== id)
          : [...prev, id];
      } else {
        if (prev.includes(id)) {
          return prev.filter((favId) => favId !== id);
        } else {
          alert("Przekroczono limit Ulubionych");
          return prev;
        }
      }
    });
  };

  return (
    <main className="w-[80%] p-4">
      <Header />
      <FavoriteCounter count={favorites.length} />
      <PokemonList
        pokemons={pokemons}
        listlength={listlength}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <footer className="flex justify-center items-center p-3 pt-8">
        <button
          className="bg-zinc-900 p-4 rounded-xl"
          onClick={() => {
            if (listlength + 20 <= pokemons.length) {
              setListlength(listlength + 20);
            }
          }}
        >
          Wyświetl więcej Pokemonów
        </button>
      </footer>
    </main>
  );
}
