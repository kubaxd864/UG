"use client";
import PokemonList from "../components/PokemonList";
import FavoriteCounter from "@/components/FavoriteCounter";
import ComparisonModal from "@/components/ComparisonModal";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ToastContainer from "@/components/ToastContainer";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredpokemons, setFilteredPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listlength, setListlength] = useState(20);
  const [compared, setCompared] = useState([]);
  const [onOpen, setOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastTimersRef = useRef(new Map());

  useEffect(() => {
    return () => {
      toastTimersRef.current.forEach((timer) => clearTimeout(timer));
      toastTimersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch((err) => {
        addToast(err, "error");
      });
  }, []);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      if (prev.length !== 12) {
        if (prev.includes(name)) {
          addToast("Usunięto z ulubionych", "info");
          return prev.filter((favName) => favName !== name);
        } else {
          addToast("Dodano do ulubionych", "success");
          return [...prev, name];
        }
      } else {
        if (prev.includes(name)) {
          addToast("Usunięto z ulubionych", "info");
          return prev.filter((favName) => favName !== name);
        } else {
          addToast("Przekroczono limit Ulubionych", "warning");
          return prev;
        }
      }
    });
  };

  const addToCompare = (name) => {
    setCompared((prev) => {
      if (prev.length != 3) {
        if (prev.includes(name)) {
          addToast("Usunięto do Porównania", "info");
          return prev.filter((ComparedName) => ComparedName !== name);
        } else {
          addToast("Dodano do Porównania", "success");
          return [...prev, name];
        }
      } else {
        if (prev.includes(name)) {
          addToast("Usunięto do Porównania", "info");
          return prev.filter((ComparedName) => ComparedName !== name);
        } else {
          addToast("Przekroczono limit W Porównaniu", "warning");
          return prev;
        }
      }
    });
  };

  const addToast = (message, type, timeout = 3000) => {
    const id = crypto.randomUUID();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    if (timeout > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        toastTimersRef.current.delete(id);
      }, timeout);
      toastTimersRef.current.set(id, timer);
    }
  };

  const removeToast = (id) => {
    const timer = toastTimersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <main className="w-[80%] p-4">
      <Header
        pokemons={pokemons}
        favorites={favorites}
        listlength={listlength}
        filteredpokemons={filteredpokemons}
        setFilteredPokemons={setFilteredPokemons}
      />
      <FavoriteCounter count={favorites.length} />
      <PokemonList
        pokemons={filteredpokemons}
        listlength={listlength}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addToCompare={addToCompare}
      />
      <button
        className="fixed bottom-5 right-5 bg-zinc-900 p-4 rounded-xl"
        onClick={() => setOpen(true)}
        disabled={compared.length < 2}
      >
        Porównaj ({compared.length})
      </button>
      <ComparisonModal
        open={onOpen}
        setOpen={setOpen}
        compared={compared}
        addToCompare={addToCompare}
      />
      <ToastContainer
        toasts={toasts}
        addToast={addToast}
        removeToast={removeToast}
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
