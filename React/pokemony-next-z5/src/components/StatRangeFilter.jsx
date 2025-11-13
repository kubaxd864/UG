export default function RangeFilter({ hp, setHp }) {
  return (
    <div className="flex flex-row gap-5 w-[30%]">
      <label className="flex-none whitespace-nowrap">Min Hp: {hp}</label>
      <input
        type="range"
        id="min-hp"
        name="min-hp"
        min="0"
        max="100"
        value={hp}
        className="flex-1 min-w-0"
        onChange={(e) => setHp(e.target.value)}
      ></input>
    </div>
  );
}
