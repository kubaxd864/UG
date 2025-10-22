import "./App.css";
import axios from "axios";
import PokemonBox from "../components/Pokemonbox";
import SearchBar from "../components/Searchbar";
import CreatePokemonBox from "../components/Pokemonbox-create";
import { useState, useEffect } from "react";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [listlength, setListlength] = useState(20);
  const [createComponents, setcreateComponents] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // hook useEffect uruchamiający funkcję tylko raz po załadowaniu strony
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(({ data }) => {
        setAllPokemons(data.results);
        setFilteredPokemons(data.results);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // funkcja filtrująca po nazwach pokemonów
  function searchByName(value) {
    if (!value) {
      setFilteredPokemons(allPokemons);
      return;
    }

    const list = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredPokemons(list);
  }

  // funkcja filtrująca po typie
  function searchByType(value) {
    if (!value) return;
    setIsLoading(true);

    axios
      .get(`https://pokeapi.co/api/v2/type/${value}`)
      .then(({ data }) => {
        const typePokemons = data.pokemon.map((p) => p.pokemon);
        setFilteredPokemons(typePokemons);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeAPI</h1>
        <h3>Twoja ulubiona wyszukiwarka Pokemonów</h3>
        <button
          className="switch-components"
          onClick={() => setcreateComponents((prev) => !prev)}
        >
          Switch
        </button>
        <SearchBar
          onSearchByName={searchByName}
          onSearchByType={searchByType}
        />
      </header>

      {isLoading && <div id="loader">Ładowanie...</div>}

      <div id="pokemons">
        {filteredPokemons
          .slice(0, listlength)
          .map((pokemon, idx) =>
            createComponents ? (
              <CreatePokemonBox key={idx} name={pokemon.name} idx={idx + 1} />
            ) : (
              <PokemonBox key={idx} name={pokemon.name} idx={idx + 1} />
            )
          )}
      </div>
      <footer className="addmorepokemons">
        <button
          className="morepokemonsBtn"
          onClick={() => {
            if (listlength + 20 <= filteredPokemons.length) {
              setListlength(listlength + 20);
            }
          }}
        >
          Wyświetl więcej Pokemonów
        </button>
      </footer>
    </div>
  );
}

export default App;
