import "./Pokemonbox.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PokemonBox({ name, idx }) {
  const [moreInfo, showMoreInfo] = useState(false);
  const [pokemonInfo, setPokemoninfo] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data }) => {
      setPokemoninfo(data);
    });
  }, [name]);

  return React.createElement(
    "div",
    { className: "pokemonBox" },
    pokemonInfo.sprites
      ? React.createElement("img", {
          src: pokemonInfo.sprites.front_default,
          alt: name,
        })
      : null,

    React.createElement(
      "h2",
      null,
      name.charAt(0).toUpperCase() + name.slice(1)
    ),

    React.createElement(
      "div",
      { className: "statsDiv" },
      pokemonInfo.stats?.map((e, i) =>
        React.createElement(
          "p",
          { className: "stat", key: e.stat.name },
          React.createElement("label", null, e.stat.name + ":"),
          React.createElement("progress", {
            max: "100",
            value: e.base_stat,
            className:
              e.base_stat > 90
                ? "progress-superhigh"
                : e.base_stat > 70
                ? "progress-high"
                : e.base_stat > 50
                ? "progress-medium"
                : e.base_stat > 30
                ? "progress-low"
                : "progress-superlow",
          })
        )
      )
    ),

    React.createElement(
      "div",
      { className: "btnDiv" },
      React.createElement(
        "button",
        {
          className: "moreBtn",
          style: { display: moreInfo ? "none" : "block" },
          onClick: () => showMoreInfo(true),
        },
        "Więcej ..."
      )
    ),

    pokemonInfo && moreInfo
      ? React.createElement(
          "div",
          { className: "infoDiv" },
          React.createElement("p", null, `Waga: ${pokemonInfo.weight}`),
          React.createElement("p", null, `Wysokość: ${pokemonInfo.height}`),
          React.createElement(
            "p",
            null,
            "Typ: ",
            pokemonInfo.types?.map((e) => e.type.name).join(", ") ||
              "Brak danych"
          ),
          React.createElement(
            "p",
            null,
            "Umiejętności: ",
            pokemonInfo.abilities?.map((e, i) =>
              React.createElement(
                "span",
                {
                  key: e.ability.name,
                  style: { color: e.is_hidden ? "gray" : "black" },
                },
                e.ability.name,
                i < (pokemonInfo.abilities?.length || 0) - 1 ? ", " : ""
              )
            ) || "Brak danych"
          )
        )
      : null
  );
}

export default PokemonBox;
