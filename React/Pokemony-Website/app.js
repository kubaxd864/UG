function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function getMoreInfo(pokemonId) {
  showLoader();
  setTimeout(() => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}`)
        .then((res) => res.json())
        .then((data) => addMoreInfo(data, pokemonId));
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }, 800);
}

function addMoreInfo(pokemonData, pokemonId) {
  const div = document.querySelector(`.pokemonBox-${pokemonId}`);
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("InfoDiv");

  const weight = document.createElement("p");
  weight.textContent = `Waga: ${pokemonData.weight}`;

  const height = document.createElement("p");
  height.textContent = `Wysokość: ${pokemonData.height}`;

  const types = document.createElement("p");
  const typesText = pokemonData.types.map((e) => e.type.name).join(", ");
  types.textContent = `Typy: ${typesText}`;

  infoDiv.appendChild(weight);
  infoDiv.appendChild(height);
  infoDiv.appendChild(types);
  div.appendChild(infoDiv);
}

function renderdiv(pokemonName, pokemonId) {
  const main = document.getElementById("pokemons");
  const div = document.createElement("div");
  div.classList.add(`pokemonBox-${pokemonId}`);

  const img = document.createElement("img");
  img.src = `./pictures/Pokemon-${pokemonId + 1}.jpg`;
  img.alt = pokemonName;

  const title = document.createElement("h2");
  title.textContent = pokemonName;

  const button = document.createElement("button");
  button.textContent = "Więcej...";
  button.classList.add("moreBtn");
  button.onclick = function () {
    getMoreInfo(pokemonId);
    this.disabled = true;
  };

  div.appendChild(img);
  div.appendChild(title);
  div.appendChild(button);
  main.appendChild(div);
}

function getpokemonlist() {
  showLoader();
  setTimeout(() => {
    try {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then(({ results }) => {
          results.map((item, i) => {
            renderdiv(item.name, i);
          });
        });
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }, 1500);
}

document.addEventListener("DOMContentLoaded", function () {
  getpokemonlist();
});
