import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchInput({ setSearch, filters, activeFilters }) {
  return (
    <div className="relative flex flex-col md:flex-row gap-5 items-center w-full">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-3 top-3 text-gray-400 w-[20px]"
      />
      <input
        type="text"
        id="searchBar"
        placeholder="Znajdź swojego pokemona"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
      />
      {!filters ? (
        <button
          className="bg-zinc-900 border border-gray-300 px-4 py-2 rounded-2xl flex-none whitespace-nowrap"
          onClick={() => activeFilters(true)}
        >
          Filtry Zaawansowane
        </button>
      ) : null}
    </div>
  );
}
