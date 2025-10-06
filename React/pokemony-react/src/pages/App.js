import "./App.css";
import axios from "axios";
import PokemonBox from "../components/Pokemonbox";
import { useState, useEffect } from "react";

function App() {
  const [pokemony, setPokemony] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(({ data }) => {
        setPokemony(data.results);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemony</h1>
      </header>
      {isLoading ? <div id="loader">Ładowanie...</div> : null}
      <div id="pokemons">
        {pokemony.map((pokemon, idx) => (
          <PokemonBox key={idx} name={pokemon.name} idx={idx + 1} />
        ))}
      </div>
    </div>
  );
}

export default App;
