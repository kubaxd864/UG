"use client";
import CreationForm from "@/components/forms/PokemonCreationForm";
import LivePreview from "@/components/PokemonLivePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const STORAGE_KEY = "created_pokemons";

function loadContent() {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadContent:", e);
    return [];
  }
}

function saveContent(arr) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error("saveContent:", e);
  }
}

export default function CreatePokemon() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defence, setDeffence] = useState("");
  const [speed, setSpeed] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [pokemonlist, setPokemonList] = useState([]);

  useEffect(() => {
    const pokemons = loadContent();
    console.log(pokemons);
    setPokemonList(pokemons);
  }, []);

  return (
    <main className="w-full h-screen p-5">
      <div className="pb-8">
        <header className="flex flex-col pb-2 m-1 justify-center items-center">
          <h1 className="text-6xl font-bold mb-5">PokeAPI</h1>
          <h3 className="text-xl text-center">
            Twoja ulubiona wyszukiwarka Pokemonów
          </h3>
        </header>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-center gap-5 w-full">
        <div className="flex flex-col gap-5 w-[70%]">
          <div className="min-h-[300px]">
            <h1 className="text-center font-bold text-2xl">Twoje Pokemony</h1>
            <div className="flex flex-row gap-10 py-6 px-12 overflow-auto scroll-smooth scrollbar-black">
              {pokemonlist.map((e) => (
                <div
                  key={e.id}
                  className="flex flex-col snap-start gap-2 text-center p-3 rounded-xl bg-zinc-900"
                >
                  {e.pokemonpicture ? (
                    <div
                      className="bg-zinc-900 w-[200px] h-[200px] rounded-full bg-center bg-cover"
                      style={{ backgroundImage: `url(${e.pokemonpicture})` }}
                    />
                  ) : (
                    <div className="relative bg-zinc-900 w-[200px] h-[200px] rounded-full">
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 w-12 h-12"
                      />
                    </div>
                  )}
                  <div className="font-bold capitalize">{e.pokemonname}</div>
                  <div className="flex flex-row gap-1 justify-center">
                    Typ: {""}
                    {e.maintype && (
                      <>
                        <span className="capitalize">{e.maintype},</span>
                        {e.secondtype && (
                          <span className="capitalize">{e.secondtype}</span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-row justify-center gap-3">
                    <p>Hp: {e.hp}</p>
                    <p>Attack: {e.attack}</p>
                  </div>
                  <div className="flex flex-row justify-center gap-3">
                    <p>Defence: {e.defence}</p>
                    <p>Speed: {e.speed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CreationForm
            setName={setName}
            setTypes={setTypes}
            setHp={setHp}
            setAttack={setAttack}
            setDeffence={setDeffence}
            setSpeed={setSpeed}
            setText={setText}
            picture={picture}
            setPicture={setPicture}
            saveContent={saveContent}
            pokemonlist={pokemonlist}
            setPokemonList={setPokemonList}
          />
        </div>
        <LivePreview
          name={name}
          types={types}
          hp={hp}
          attack={attack}
          defence={defence}
          speed={speed}
          text={text}
          picture={picture}
        />
      </div>
    </main>
  );
}
