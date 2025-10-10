import "./Pokemonbox.css";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonBox({ name, idx }) {
  const [moreInfo, showMoreInfo] = useState(false);
  const [pokemonInfo, setPokemoninfo] = useState([]);
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data }) => {
      setPokemoninfo(data);
    });
  }, [name]);

  return (
    <div className="pokemonBox">
      {pokemonInfo.sprites && (
        <img src={pokemonInfo.sprites.front_default} alt={name} />
      )}
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <div className="statsDiv">
        {pokemonInfo.stats?.map((e, i) => (
          <>
            <p className="stat">
              <label>{e.stat.name}:</label>
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
            </p>
          </>
        ))}
        <p>
          Suma statystyk:{" "}
          {pokemonInfo.stats
            ? pokemonInfo.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
            : 0}
        </p>
      </div>
      <div className="btnDiv">
        <button
          className="moreBtn"
          style={{ display: moreInfo ? "none" : "block" }}
          onClick={() => showMoreInfo(true)}
        >
          Więcej ...
        </button>
      </div>
      {pokemonInfo && moreInfo && (
        <div className="infoDiv">
          <p>Waga: {pokemonInfo.weight}</p>
          <p>Wysokość: {pokemonInfo.height}</p>
          <p>
            Typ:{" "}
            {pokemonInfo.types?.map((e) => e.type.name).join(", ") ||
              "Brak danych"}
          </p>
          <p>
            Umiejętności:{" "}
            {pokemonInfo.abilities?.map((e, i) => (
              <span
                key={e.ability.name}
                style={{ color: e.is_hidden ? "gray" : "black" }}
              >
                {e.ability.name}
                {i < (pokemonInfo.abilities?.length || 0) - 1 ? ", " : ""}
              </span>
            )) || "Brak danych"}
          </p>
        </div>
      )}
    </div>
  );
}

export default PokemonBox;
