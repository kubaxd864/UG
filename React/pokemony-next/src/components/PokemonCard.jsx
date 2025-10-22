import Link from "next/link";

async function getPokemonPicture(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać Obrazka Pokémona");
  }
  return res.json();
}

export default async function PokemonCard({ name, id }) {
  const pokemon = await getPokemonPicture(name);
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="flex flex-col justify-center border border-[#ccc] border-solid rounded-xl text-center capitalize shadow-md p-3">
        <img src={pokemon.sprites.front_default} alt={name} className=""></img>
        <div className="flex flex-row gap-3 justify-center text-xl">
          <p>#{id}</p>
          <p className="font-bold">{name}</p>
        </div>
      </div>
    </Link>
  );
}
