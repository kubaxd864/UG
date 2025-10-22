import PokemonCard from "@/components/PokemonCard";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function getPokemons({ name, type }) {
  if (!name && !type) return [];

  let results = [];
  if (name) {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await res.json();

    results = data.results.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (type && type !== "any") {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    const typePokemons = data.pokemon.map((p) => p.pokemon);

    results = name
      ? results.filter((r) => typePokemons.some((tp) => tp.name === r.name))
      : typePokemons;
  }

  return results;
}

export default async function SearchPage({ searchParams }) {
  const name = searchParams.name || "";
  const type = searchParams.type || "any";
  const pokemons = await getPokemons({ name, type });
  const timestamp = new Date().toLocaleTimeString();
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

  return (
    <main className="w-[80%] p-4">
      <Link href={"/"}>
        <header className="flex flex-col pb-2 m-1 justify-center items-center">
          <h1 className="text-6xl font-bold mb-5" color="">
            PokeAPI
          </h1>
          <h3 className="text-xl text-center">
            Twoja ulubiona wyszukiwarka Pokemonów
          </h3>
        </header>
      </Link>
      <form method="GET" action="/search" className="mb-6">
        <div className="flex flex-row p-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nazwa Pokémona"
            defaultValue={name}
            className="p-2 border border-[#ccc] rounded-xl w-full"
          />
          <button
            type="submit"
            className="bg-neutral-700 text-white p-4 border-none rounded-xl"
          >
            Szukaj
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center p-3 gap-2">
          {pokemontypes.map((e) => (
            <button
              key={e.type}
              name="type"
              value={e.type}
              type="submit"
              className={`${e.color} ${e.text} px-4 py-2 rounded-full capitalize`}
            >
              {e.type}
            </button>
          ))}
        </div>
      </form>
      <p className="mb-4 text-[#666]">🕒 Renderowane o: {timestamp}</p>
      {pokemons.length > 0 ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {pokemons.slice(0, 20).map((pokemon, id) => (
            <PokemonCard key={id} name={pokemon.name} id={id + 1} />
          ))}
        </div>
      ) : (
        <p className="text-[#999]">Brak wyników dla podanych kryteriów.</p>
      )}
    </main>
  );
}
