import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";
import MultiSelect from "./TypeMultiSelect";
import RangeFilter from "./StatRangeFilter";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const StatsCache = new Map();

async function fetchPokemonStats(pokemonList) {
  const allCached = pokemonList.every((pokemon) =>
    StatsCache.has(pokemon.name)
  );
  if (allCached) return;
  for (const pokemon of pokemonList) {
    const name = pokemon.name;
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const stats = {
        hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
        attack:
          data.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
        defense:
          data.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
        speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
      };
      StatsCache.set(name, stats);
    } catch (err) {
      console.error("Nie udało się pobrać statystyk dla:", name, err);
      const fallback = { hp: 0, attack: 0, defense: 0, speed: 0 };
      StatsCache.set(name, fallback);
    }
  }
}

export default function FilterPanel({
  pokemons,
  favorites,
  setFilteredPokemons,
}) {
  const [minHp, setminHp] = useState(0);
  const [minAttack, setminAttack] = useState(0);
  const [minDefense, setminDefense] = useState(0);
  const [minSpeed, setminSpeed] = useState(0);
  const [search, setSearch] = useState("");
  const [onlyfavorites, setOnlyFavorites] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filters, activeFilters] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const searchInputRef = useRef(null);
  const pokemontypes = [
    { type: "normal", color: "bg-neutral-800", text: "text-white" },
    { type: "fire", color: "bg-red-500", text: "text-white" },
    { type: "water", color: "bg-blue-600", text: "text-white" },
    { type: "electric", color: "bg-yellow-400", text: "text-black" },
    { type: "grass", color: "bg-green-500", text: "text-white" },
    { type: "ice", color: "bg-cyan-400", text: "text-white" },
    { type: "fighting", color: "bg-orange-400", text: "text-white" },
    { type: "poison", color: "bg-purple-500", text: "text-white" },
    { type: "ground", color: "bg-amber-300", text: "text-black" },
    { type: "flying", color: "bg-sky-500", text: "text-black" },
    { type: "psychic", color: "bg-pink-500", text: "text-white" },
    { type: "bug", color: "bg-lime-400", text: "text-white" },
    { type: "rock", color: "bg-slate-400", text: "text-white" },
    { type: "ghost", color: "bg-stone-50", text: "text-black" },
    { type: "dragon", color: "bg-yellow-700", text: "text-white" },
    { type: "dark", color: "bg-zinc-900", text: "text-white" },
    { type: "steel", color: "bg-gray-500", text: "text-black" },
    { type: "fairy", color: "bg-pink-300", text: "text-black" },
  ];

  useEffect(() => {
    (async () => {
      try {
        let results = [];
        if (selectedTypes.length > 0) {
          const responses = await Promise.all(
            selectedTypes.map((type) =>
              axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            )
          );
          results = responses.reduce(
            (acc, res) =>
              acc.concat(res.data.pokemon.map((entry) => entry.pokemon)),
            []
          );
          results = Array.from(
            new Map(results.map((p) => [p.name, p])).values()
          );
        } else {
          results = pokemons.slice();
        }
        if (onlyfavorites) {
          results = results.filter((pokemon) =>
            favorites.includes(pokemon.name)
          );
        }
        if (minHp > 0) {
          results = results.filter(
            (pokemon) => (StatsCache.get(pokemon.name)?.hp ?? 0) >= minHp
          );
        }
        if (minAttack > 0) {
          results = results.filter(
            (pokemon) =>
              (StatsCache.get(pokemon.name)?.attack ?? 0) >= minAttack
          );
        }
        if (minDefense > 0) {
          results = results.filter(
            (pokemon) =>
              (StatsCache.get(pokemon.name)?.defense ?? 0) >= minDefense
          );
        }
        if (minSpeed > 0) {
          results = results.filter(
            (pokemon) => (StatsCache.get(pokemon.name)?.speed ?? 0) >= minSpeed
          );
        }
        if (search.trim() !== "") {
          results = results.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(search.toLowerCase())
          );
        }
        setFilteredPokemons(results);
      } catch (err) {
        setFilteredPokemons([]);
      }
    })();
  }, [
    search,
    selectedTypes,
    onlyfavorites,
    minHp,
    minAttack,
    minDefense,
    minSpeed,
    pokemons,
    setFilteredPokemons,
  ]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  async function openFilters() {
    setLoadingFilters(true);
    try {
      await fetchPokemonStats(pokemons);
      activeFilters(true);
    } finally {
      setLoadingFilters(false);
    }
  }

  function toggleType(type) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function getActiveFilters() {
    let count = 0;
    if (selectedTypes.length > 0) count += 1;
    if (minHp > 0) count += 1;
    if (minAttack > 0) count += 1;
    if (minDefense > 0) count += 1;
    if (minSpeed > 0) count += 1;
    if (onlyfavorites) count += 1;
    if (search.trim() !== "") count += 1;
    return count;
  }

  function resetFilters() {
    setSelectedTypes([]);
    setminHp(0);
    setminAttack(0);
    setminDefense(0);
    setminSpeed(0);
    setSearch("");
    setOnlyFavorites(false);
  }

  return (
    <form
      action=""
      className="flex flex-col justify-center items-center p-5 gap-5 m-2"
    >
      <SearchInput
        setSearch={setSearch}
        filters={filters}
        openFilters={openFilters}
      />
      {loadingFilters ? (
        <div className="flex flex-row p-2 gap-8 justify-center items-center">
          <p className="text-xl">Pobieranie statystyk pokemonów</p>
          <img src="loading.gif" className="h-10"></img>
        </div>
      ) : null}
      {filters ? (
        <div
          id="filters"
          className="flex flex-col justify-center items-center p-5 gap-5 m-2"
        >
          <div className="w-full flex justify-end text-sm text-gray-500">
            Aktywne filtry: {getActiveFilters()}
          </div>
          <MultiSelect
            pokemontypes={pokemontypes}
            selectedTypes={selectedTypes}
            toggleType={toggleType}
          />
          <div className="flex flex-col gap-10 justify-center w-full">
            <div className="flex flex-row gap-10 justify-center w-full">
              <RangeFilter name={"Hp"} stat={minHp} setStat={setminHp} />
              <RangeFilter
                name={"Attack"}
                stat={minAttack}
                setStat={setminAttack}
              />
            </div>
            <div className="flex flex-row gap-10 justify-center w-full">
              <RangeFilter
                name={"Defense"}
                stat={minDefense}
                setStat={setminDefense}
              />
              <RangeFilter
                name={"Speed"}
                stat={minSpeed}
                setStat={setminSpeed}
              />
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <input
                type="checkbox"
                name="favorites"
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />
              <label>
                Tylko Ulubione{" "}
                <FontAwesomeIcon
                  icon={faStarSolid}
                  className="text-yellow-400"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-5 p-5">
            {getActiveFilters() > 0 && (
              <button
                type="button"
                className="bg-zinc-900 border border-red-500 px-4 py-2 rounded-xl"
                onClick={resetFilters}
              >
                Wyczyść filtry
              </button>
            )}
            <button
              className="bg-zinc-900 border border-gray-300 px-4 py-2 rounded-xl"
              onClick={() => activeFilters(false)}
            >
              Ukryj filtry
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
