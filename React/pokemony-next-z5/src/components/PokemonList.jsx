import PokemonCard from "../components/PokemonCard";

export default function PokemonList({
  pokemons,
  listlength,
  favorites,
  toggleFavorite,
  addToCompare,
}) {
  return (
    <div
      className="grid gap-15"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {pokemons.length > 0 ? (
        pokemons
          .slice(0, listlength)
          .map((pokemon, idx) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={idx + 1}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCompare={addToCompare}
            />
          ))
      ) : (
        <div className="col-span-full text-center text-2xl text-gray-500 py-8">
          Brak pokémonów do wyświetlenia
        </div>
      )}
    </div>
  );
}
