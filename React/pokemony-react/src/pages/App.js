import "./App.css";
import axios from "axios";
import PokemonBox from "../components/Pokemonbox";
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

        <div className="searchbar">
          <input
            type="text"
            id="searchBar"
            placeholder="Szukaj Pokemonów"
            onChange={(e) => searchByName(e.target.value)}
          />
          <select
            name="pokemon-type"
            id="pokemon-type"
            onChange={(e) => searchByType(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Wybierz typ
            </option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
            <option value="grass">Grass</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="steel">Steel</option>
            <option value="fairy">Fairy</option>
          </select>
        </div>
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
      <div className="addmorepokemons">
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
      </div>
    </div>
  );
}

export default App;
