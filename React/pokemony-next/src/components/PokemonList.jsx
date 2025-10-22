import PokemonCard from "../components/PokemonCard";

export default function PokemonList({ pokemons, listlength }) {
  return (
    <div
      className="grid gap-15"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {pokemons.slice(0, listlength).map((pokemon, id) => (
        <PokemonCard key={id} name={pokemon.name} id={id + 1} />
      ))}
    </div>
  );
}
