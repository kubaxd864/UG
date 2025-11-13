import FilterPanel from "./FilterPanel";

export default function Header({
  pokemons,
  listlength,
  filteredpokemons,
  favorites,
  setFilteredPokemons,
}) {
  return (
    <div className="pb-8">
      <header className="flex flex-col pb-2 m-1 justify-center items-center">
        <h1 className="text-6xl font-bold mb-5">PokeAPI</h1>
        <h3 className="text-xl text-center">
          Twoja ulubiona wyszukiwarka Pokemonów
        </h3>
      </header>
      <FilterPanel
        pokemons={pokemons}
        favorites={favorites}
        setFilteredPokemons={setFilteredPokemons}
      />
      <div className="p-2 text-xl text-center">
        Wyświetlono{" "}
        {filteredpokemons.length === 1328
          ? listlength
          : filteredpokemons.length}
        /1328 Pokemonów
      </div>
    </div>
  );
}
