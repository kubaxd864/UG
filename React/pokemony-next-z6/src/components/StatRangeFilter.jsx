export default function RangeFilter({ name, stat, setStat }) {
  return (
    <div className="flex flex-row gap-5 w-[30%]">
      <label className="flex-none whitespace-nowrap">
        Min {name}: {stat}
      </label>
      <input
        type="range"
        name="stat-range"
        min="0"
        max="255"
        value={stat}
        className="flex-1 min-w-0"
        onChange={(e) => setStat(e.target.value)}
      ></input>
    </div>
  );
}
