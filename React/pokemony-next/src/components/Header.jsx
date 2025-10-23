import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div>
      <header className="flex flex-col pb-2 m-1 justify-center items-center">
        <h1 className="text-6xl font-bold mb-5">PokeAPI</h1>
        <h3 className="text-xl text-center">
          Twoja ulubiona wyszukiwarka Pokemonów
        </h3>
      </header>
      <div className="flex justify-center items-center p-5 pb-8 m-2">
        <Link
          href="/search"
          className="relative flex items-center w-full max-w-md"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 text-gray-400 w-[20px]"
          />
          <input
            type="text"
            id="searchBar"
            placeholder="Znajdź swojego pokemona"
            className="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Link>
      </div>
    </div>
  );
}
