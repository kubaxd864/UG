import "../pages/App.css";

function SearchBar({ onSearchByName, onSearchByType }) {
  function handleNameChange(value) {
    onSearchByName(value);
  }

  const handleTypeChange = (e) => {
    const value = e.target.value;
    onSearchByType(value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        id="searchBar"
        placeholder="Szukaj Pokemonów"
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <select
        name="pokemon-type"
        id="pokemon-type"
        onChange={handleTypeChange}
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
  );
}

export default SearchBar;
