function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function showError(msg) {
  const mainDiv = document.getElementById("pokemons");
  const errDiv = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Powrót do Listy";
  button.onclick = function () {
    window.location.reload();
  };
  errDiv.classList.add("errDiv");
  errDiv.textContent = msg;
  errDiv.appendChild(button);
  mainDiv.appendChild(errDiv);
}

function search() {
  const inputtext = document.getElementById("searchBar").value;
  const parentDiv = document.getElementById("pokemons");
  parentDiv.innerHTML = "";
  showLoader();
  setTimeout(() => {
    try {
      if (!inputtext == "") {
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputtext}`)
          .then((res) => {
            if (res.status === 404) {
              showError("Nie znaleziono takiego pokemona");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              renderdiv(inputtext, 0);
            }
          });
      } else {
        showError("Wyszkiwanie nie może być puste");
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  }, 800);
}

function getMoreInfo(pokemonName, pokemonId) {
  showLoader();
  setTimeout(() => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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
  try {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        img.src = data.sprites.front_default;
      });
  } catch (error) {
    console.error(error);
  }
  img.alt = pokemonName;

  const title = document.createElement("h2");
  title.textContent =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const button = document.createElement("button");
  button.textContent = "Więcej...";
  button.classList.add("moreBtn");
  button.onclick = function () {
    getMoreInfo(pokemonName, pokemonId);
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
  document.getElementById("searchBtn").onclick = function () {
    search();
  };
});
