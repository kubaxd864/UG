"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import ComparisonBox from "./ComparisonBox";

export default function ComparisonModal({
  open,
  setOpen,
  compared,
  addToCompare,
}) {
  const [infos, setInfos] = useState([]);
  const [statWins, setStatWins] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all(
          compared.map((name) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          )
        );
        const data = responses.map((r) => r.data);
        setInfos(data);

        const statNames = Array.from(
          new Set(data.flatMap((d) => d.stats.map((s) => s.stat.name)))
        );

        const maxPerStat = {};
        statNames.forEach((stat) => {
          maxPerStat[stat] = Math.max(
            ...data.map((d) => {
              const s = d.stats.find((x) => x.stat.name === stat);
              return s ? s.base_stat : -Infinity;
            })
          );
        });

        const wins = data.map((d) => {
          const map = {};
          statNames.forEach((stat) => {
            const s = d.stats.find((x) => x.stat.name === stat);
            map[stat] = !!(s && s.base_stat === maxPerStat[stat]);
          });
          return map;
        });
        setStatWins(wins);
      } catch (err) {
        console.error(err);
        setInfos([]);
        setStatWins([]);
      }
    })();
  }, [open, compared]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        console.log("Zamknij");
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;
  return createPortal(
    <>
      <div className="fixed w-screen h-screen bg-black/70 inset-0 flex flex-col items-center justify-center z-50">
        <div className="flex flex-col w-[90%] h-[95%] bg-zinc-950 rounded-2xl p-4">
          <h1 className="text-3xl text-center font-bold">
            Porównywanie Dwóch Pokemonów
          </h1>
          <div className="flex flex-row justify-center gap-10 w-full h-full p-8">
            {compared.map((pokemon, idx) => (
              <ComparisonBox
                key={pokemon}
                name={pokemon}
                pokemonInfo={infos[idx]}
                statWins={statWins[idx]}
                addToCompare={addToCompare}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-zinc-900 p-4 rounded-xl w-[300px]"
              onClick={() => setOpen(false)}
            >
              Zakończ Porównanie
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
