"use client";
import { useState, useRef, useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import SubmitButton from "../SubmitButton";

export default function CreationForm({
  setName,
  setTypes,
  setHp,
  setAttack,
  setDeffence,
  setSpeed,
  setText,
  picture,
  setPicture,
  saveContent,
  pokemonlist,
  setPokemonList,
}) {
  const [sendSuccessful, setSendSuccessful] = useState("Stwórz");
  const [mainlast, setMainLast] = useState("");
  const [secondlast, setSecondLast] = useState("");
  const previewRef = useRef(null);
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const id = crypto?.randomUUID?.();
    const newPokemon = {
      id,
      pokemonname: data.name,
      maintype: data.maintype,
      secondtype: data.secondtype || null,
      hp: data.hp,
      attack: data.attack,
      defence: data.defence,
      speed: data.speed,
      text: data.text,
      pokemonpicture: picture || null,
    };

    const next = [newPokemon, ...pokemonlist];
    setPokemonList(next);
    saveContent(next);

    setSendSuccessful("Wysłano");
    reset({
      name: "",
      maintype: "",
      secondtype: "",
      hp: null,
      attack: null,
      defence: null,
      speed: null,
      text: null,
      picture: null,
    });
    setName("");
    setTypes([]);
    setHp("");
    setAttack(""),
      setDeffence(""),
      setSpeed(""),
      setText(""),
      setPicture(""),
      setTimeout(() => setSendSuccessful("Wyślij"), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center font-bold text-2xl">Podaj Dane Pokemona</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 p-4"
      >
        <div className="flex flex-row justify-center gap-10">
          <div className="flex flex-col gap-5 max-w-[500px]">
            <div className="relative flex flex-col w-full">
              <input
                {...register("name", {
                  required: "Wprowadź nazwę pokemona",
                  minLength: {
                    value: 3,
                    message: "Za krótka nazwa",
                  },
                  maxLength: {
                    value: 20,
                    message: "Za długa nazwa",
                  },
                })}
                type="text"
                id="name"
                placeholder="Nazwa"
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-gray-300 pl-4 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col w-full">
              <select
                {...register("maintype", { required: "Podaj główny typ" })}
                defaultValue=""
                name="maintype"
                onChange={(e) => {
                  const val = e.target.value;
                  setTypes((prev) => {
                    const arr = Array.isArray(prev)
                      ? [...prev]
                      : prev
                      ? [prev]
                      : [];
                    if (mainlast) {
                      const i = arr.indexOf(mainlast);
                      if (i !== -1) arr.splice(i, 1);
                    }
                    if (!arr.includes(val)) arr.push(val);
                    return arr;
                  });
                  setMainLast(val);
                }}
                className="custom-select appearance-none bg-[#0a0a0a] text-neutral-600 pr-10 rounded-2xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-no-repeat bg-right-3 bg-[length:1rem] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22%3E%3Cpath d=%22M0 0 L5 6 L10 0%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%221.2%22 stroke-opacity=%220.35%22/%3E%3C/svg%3E')]"
              >
                <option value="" disabled>
                  Główny Typ
                </option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="grass">Grass</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
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
              {errors.maintype && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.maintype.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col w-full">
              <select
                {...register("secondtype")}
                name="secondtype"
                onChange={(e) => {
                  const val = e.target.value;
                  setTypes((prev) => {
                    const arr = Array.isArray(prev)
                      ? [...prev]
                      : prev
                      ? [prev]
                      : [];
                    if (secondlast) {
                      const i = arr.indexOf(secondlast);
                      if (i !== -1) arr.splice(i, 1);
                    }
                    if (val && !arr.includes(val)) arr.push(val);
                    return arr;
                  });
                  setSecondLast(val);
                }}
                className="custom-select appearance-none bg-[#0a0a0a] text-neutral-600 pr-10 rounded-2xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-no-repeat bg-right-3 bg-[length:1rem] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22%3E%3Cpath d=%22M0 0 L5 6 L10 0%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%221.2%22 stroke-opacity=%220.35%22/%3E%3C/svg%3E')]"
              >
                <option value="" disabled selected>
                  Drugorzędny Typ
                </option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="grass">Grass</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
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
            <div className="relative flex flex-col w-full">
              <input
                {...register("hp", {
                  required: "Podaj Ilość Zdrowia",
                  max: {
                    value: 255,
                    message: "Zbyt Wysoka Wartość",
                  },
                })}
                type="number"
                placeholder="Hp"
                onChange={(e) => setHp(e.target.value)}
                className="no-spinner rounded-2xl border border-gray-300 pl-4 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></input>
              {errors.hp && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.hp.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col w-full">
              <input
                {...register("attack", {
                  required: "Podaj Wartość Ataku",
                  max: {
                    value: 255,
                    message: "Zbyt Wysoka Wartość",
                  },
                })}
                type="number"
                placeholder="Attack"
                onChange={(e) => setAttack(e.target.value)}
                className="no-spinner rounded-2xl border border-gray-300 pl-4 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></input>
              {errors.attack && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.attack.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-[500px]">
            <div className="relative flex flex-col w-full">
              <input
                {...register("defence", {
                  required: "Podaj Wartość Obrony",
                  max: {
                    value: 255,
                    message: "Zbyt Wysoka Wartość",
                  },
                })}
                type="number"
                placeholder="Deffence"
                onChange={(e) => setDeffence(e.target.value)}
                className="no-spinner rounded-2xl border border-gray-300 pl-4 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></input>
              {errors.deffence && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.deffence.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col w-full">
              <input
                {...register("speed", {
                  required: "Podaj Prędkość",
                  max: {
                    value: 255,
                    message: "Zbyt Wysoka Wartość",
                  },
                })}
                type="number"
                placeholder="Speed"
                onChange={(e) => setSpeed(e.target.value)}
                className="no-spinner rounded-2xl border border-gray-300 pl-4 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></input>
              {errors.speed && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {errors.speed.message}
                </p>
              )}
            </div>
            <textarea
              {...register("text", {
                required: "Wprowadź Opis",
                minLength: {
                  value: 20,
                  message: "Za krótki Opis Komentarza",
                },
                maxLength: {
                  value: 500,
                  message: "Za długi Opis Komentarza",
                },
              })}
              id="text"
              name="text"
              placeholder="Dodaj Opis"
              rows={5}
              cols={30}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
            {errors.text && (
              <p className="text-red-400 text-sm text-center mt-2">
                {errors.text.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-col gap-2 border border-gray-300 rounded-2xl p-4">
            <label className="text-sm">Dodaj zdjęcie</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  setPicture("");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  const dataUrl = reader.result;
                  setPicture(dataUrl);
                };
                reader.readAsDataURL(file);
              }}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-zinc-700 file:text-white"
            />
          </div>
        </div>
        <div className="flex justify-center items-center pt-2">
          <SubmitButton text={sendSuccessful} pending={pending} />
        </div>
      </form>
    </div>
  );
}
