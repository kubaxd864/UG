import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function LivePreview({
  name,
  types,
  hp,
  attack,
  defence,
  speed,
  text,
  picture,
}) {
  const pokemontypes = [
    { type: "normal", color: "bg-neutral-800", text: "text-white" },
    { type: "fire", color: "bg-red-500", text: "text-white" },
    { type: "water", color: "bg-blue-600", text: "text-white" },
    { type: "electric", color: "bg-yellow-400", text: "text-black" },
    { type: "grass", color: "bg-green-500", text: "text-white" },
    { type: "ice", color: "bg-cyan-400", text: "text-white" },
    { type: "fighting", color: "bg-orange-400", text: "text-white" },
    { type: "poison", color: "bg-purple-500", text: "text-white" },
    { type: "ground", color: "bg-amber-300", text: "text-black" },
    { type: "flying", color: "bg-sky-500", text: "text-black" },
    { type: "psychic", color: "bg-pink-500", text: "text-white" },
    { type: "bug", color: "bg-lime-400", text: "text-white" },
    { type: "rock", color: "bg-slate-400", text: "text-white" },
    { type: "ghost", color: "bg-stone-50", text: "text-black" },
    { type: "dragon", color: "bg-yellow-700", text: "text-white" },
    { type: "dark", color: "bg-zinc-900", text: "text-white" },
    { type: "steel", color: "bg-gray-500", text: "text-black" },
    { type: "fairy", color: "bg-pink-300", text: "text-black" },
  ];
  return (
    <div className="flex flex-col bg-zinc-800 rounded-xl w-[70%] xl:w-[30%] p-8 gap-8">
      <h1 className="text-center text-2xl font-bold p-4">Podgląd na żywo</h1>
      <div className="flex flex-col">
        <div className="relative flex flex-col justify-center items-center w-full h-[250px] ">
          <div className="bg-zinc-900 w-[200px] h-[200px] rounded-full">
            {picture !== "" ? (
              <div
                className={`bg-zinc-900 w-[200px] h-[200px] rounded-full bg-cover`}
                style={{ backgroundImage: `url(${picture})` }}
              ></div>
            ) : (
              <FontAwesomeIcon
                icon={faCamera}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 w-12 h-12"
              />
            )}
          </div>
        </div>
      </div>
      <p className="text-center text-2xl font-bold">
        {name !== "" ? name : "Nazwa"}
      </p>
      <div className="flex flex-row gap-3 justify-center items-center w-full p-2">
        {Array.isArray(types) && types.length > 0 ? (
          types.map((type, i) => {
            const meta = pokemontypes.find((p) => p.type === type) || {};
            return (
              <p
                key={`${type}-${i}`}
                className={`w-20 h-full text-center p-2 rounded-2xl capitalize ${meta.color} ${meta.text}`}
              >
                {type}
              </p>
            );
          })
        ) : (
          <>
            <p className="w-20 h-full text-center p-2 rounded-2xl bg-zinc-900">
              ?
            </p>
            <p className="w-20 h-full text-center p-2 rounded-2xl bg-zinc-900">
              ?
            </p>
          </>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col gap-2">
          <label className="capitalize">Hp:</label>
          <progress value={hp} max="255" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="capitalize">Attack:</label>
          <progress value={attack} max="255" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col gap-2">
          <label className="capitalize">Deffence:</label>
          <progress value={defence} max="255" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="capitalize">Speed:</label>
          <progress value={speed} max="255" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold p-4">Opis</h1>
        <div className="w-[80%] h-[200px] bg-zinc-900 p-4 rounded-2xl break-words">
          {text}
        </div>
      </div>
    </div>
  );
}
