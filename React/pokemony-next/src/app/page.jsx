import PokemonList from "../components/PokemonList";
import Header from "../components/Header";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać danych");
  }

  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const pokemons = await getPokemons();
  const listlength = 50;

  return (
    <main className="w-[80%] p-4">
      <Header />
      <PokemonList pokemons={pokemons} listlength={listlength} />
    </main>
  );
}
