import "./Pokemonbox.css";

function PokemonBox({ name, idx }) {
  const getMoreInfo = (pokemonName, pokemonId) => {
    console.log(pokemonName, pokemonId);
  };

  return (
    <div className="pokemonbox">
      <img src={`/pictures/Pokemon-${idx}.jpg`} alt={name} />
      <h2>{name}</h2>
      <button className="moreBtn" onClick={getMoreInfo(name, idx)}>
        Więcej ...
      </button>
    </div>
  );
}

export default PokemonBox;
