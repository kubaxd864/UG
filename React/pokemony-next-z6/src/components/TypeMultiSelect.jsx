export default function MultiSelect({
  pokemontypes,
  selectedTypes,
  toggleType,
}) {
  return (
    <div className="flex flex-wrap justify-center items-center p-3 gap-2">
      {pokemontypes.map((e) => (
        <button
          key={e.type}
          name="type"
          value={e.type}
          type="button"
          className={`${e.color} ${e.text} px-4 py-2 rounded-full capitalize ${
            selectedTypes.includes(e.type)
              ? "ring-2 ring-blue-800 ring-offset-2 ring-offset-black"
              : null
          }`}
          onClick={() => toggleType(e.type)}
        >
          {e.type}
        </button>
      ))}
    </div>
  );
}
