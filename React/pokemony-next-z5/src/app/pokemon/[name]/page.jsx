import "./style.css";
export const revalidate = false;
export async function generateStaticParams() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await res.json();

  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

async function getPokemon(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać danych Pokémona");
  }
  return res.json();
}

export default async function PokemonPage({ params }) {
  const pokemon = await getPokemon(params.name);

  return (
    <main className="flex flex-col justify-center items-center w-[50%] rounded-2xl bg-zinc-900 p-5 gap-5">
      <div className="flex flex-row w-full items-center gap-10 rounded-xl bg-zinc-800">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={250}
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex flex-row gap-2">
            {pokemon.types?.map((e, i) => (
              <p
                key={i}
                className="bg-amber-200 text-black p-2 rounded-xl capitalize text-sm"
              >
                {e.type.name}
              </p>
            )) || "Brak danych"}
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <p>Wzrost:</p>
              <p className="text-2xl font-bold">{pokemon.height / 10} m</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Waga:</p>
              <p className="text-2xl font-bold">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-center font-bold mb-2">Umiejętności</p>
        <div className="flex flex-row gap-3">
          {pokemon.abilities?.map((e, i) => (
            <p
              key={i}
              className={`p-2 rounded-xl text-center capitalize text-black ${
                e.is_hidden ? "bg-stone-600" : "bg-amber-200"
              }`}
            >
              {e.ability.name}
            </p>
          )) || "Brak danych"}
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <p className="text-2xl text-center font-bold">Statystyki</p>
        {pokemon.stats?.map((e, i) => (
          <div key={i}>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row justify-between">
                <label className="capitalize">{e.stat.name}:</label>
                <p className="bg-zinc-800 p-0.5 px-2 rounded-xl">
                  {e.base_stat}
                </p>
              </div>
              <progress
                max="100"
                value={e.base_stat}
                className={
                  e.base_stat > 90
                    ? "progress-superhigh"
                    : e.base_stat > 70
                    ? "progress-high"
                    : e.base_stat > 50
                    ? "progress-medium"
                    : e.base_stat > 30
                    ? "progress-low"
                    : "progress-superlow"
                }
              />
            </div>
          </div>
        ))}
        <p className="flex justify-center items-center bg-zinc-800 rounded-2xl p-2 mt-3">
          Suma statystyk:{" "}
          {pokemon.stats
            ? pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
            : 0}
        </p>
      </div>
    </main>
  );
}
