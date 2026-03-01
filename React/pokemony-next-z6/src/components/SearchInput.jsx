import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

export default function SearchInput({ setSearch, filters, openFilters }) {
  const [openActionMenu, setOpenMenu] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-center w-full">
      <div className="w-full lg:flex-1 order-1">
        <div className="relative w-full">
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
        </div>
      </div>
      <div className="flex flex-col order-2 w-full lg:w-auto relative">
        <button
          type="button"
          className="bg-zinc-900 border border-gray-300 px-4 py-2 rounded-2xl whitespace-nowrap"
          onClick={() => setOpenMenu((s) => !s)}
        >
          Dostępne Akcje
        </button>

        {openActionMenu ? (
          <div className="absolute flex flex-col justify-center items-center left-0 lg:left-[-50px] top-full mt-2 w-full lg:w-auto bg-zinc-800 border border-gray-700 rounded-2xl p-3 z-50">
            <Link href={"/team-builder"}>
              <button
                type="button"
                className="w-full lg:w-auto bg-zinc-900 border border-gray-300 px-4 py-2 rounded-2xl whitespace-nowrap mb-2"
              >
                Stwórz Drużynę Pokemonów
              </button>
            </Link>
            <Link href={"/create-pokemon"}>
              <button
                type="button"
                className="w-full lg:w-auto bg-zinc-900 border border-gray-300 px-4 py-2 rounded-2xl whitespace-nowrap"
              >
                Stwórz Nowego Pokemona
              </button>
            </Link>
          </div>
        ) : null}
      </div>
      {!filters ? (
        <button
          type="button"
          className="order-3 w-full lg:w-auto bg-zinc-900 border border-gray-300 px-4 py-2 rounded-2xl whitespace-nowrap"
          onClick={() => {
            openFilters();
          }}
        >
          Filtry Zaawansowane
        </button>
      ) : null}
    </div>
  );
}
