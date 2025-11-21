"use client";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
const STORAGE_KEY = "rating_comments_v1";

function loadComments() {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadComments:", e);
    return [];
  }
}

function saveComments(arr) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error("saveComments:", e);
  }
}

export default function RatingForm({ name }) {
  const [sendSuccessful, setSendSuccessful] = useState("Wyślij");
  const [comments, setComments] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const id = crypto?.randomUUID?.();
    const newComment = {
      id,
      pokemonname: name,
      nickname: data.nickname,
      title: data.title,
      text: data.text,
      rating: data.rating,
    };

    const next = [newComment, ...comments];
    setComments(next);
    saveComments(next);

    setSendSuccessful("Wysłano");
    reset({ nickname: "", title: "", text: "", rating: 0 });
    setTimeout(() => setSendSuccessful("Wyślij"), 2000);
  };

  useEffect(() => {
    const comments = loadComments();
    const filtered = comments.filter((e) => e.pokemonname == name);
    setComments(filtered);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 p-4 bg-zinc-800 rounded-2xl"
    >
      <h1 className="text-center text-2xl font-bold">Dodaj Komentarz</h1>
      <div className="flex flex-row justify-center gap-10">
        <div className="flex flex-col gap-5 max-w-[400px]">
          <div className="relative flex flex-col w-full">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-4 top-3 text-gray-400 w-[18px]"
            />
            <input
              {...register("nickname", {
                required: "Wprowadź nazwę użytkownika",
                minLength: {
                  value: 3,
                  message: "Za krótka nazwa użytkownika",
                },
                maxLength: {
                  value: 20,
                  message: "Za długa nazwa użytkownika",
                },
              })}
              type="text"
              id="nickname"
              placeholder="Nazwa Użytkownika"
              className="rounded-2xl border border-gray-300 pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.nickname && (
              <p className="text-red-400 text-sm text-center mt-2">
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div className="relative flex flex-col w-full">
            <FontAwesomeIcon
              icon={faComment}
              className="absolute left-4 top-3 text-gray-400 w-[18px]"
            />
            <input
              {...register("title", {
                required: "Wprowadź tytuł",
                minLength: {
                  value: 5,
                  message: "Za krótki tytuł komentarza",
                },
                maxLength: {
                  value: 50,
                  message: "Za długi tytuł komentarza",
                },
              })}
              type="text"
              id="title"
              placeholder="Tytuł"
              className="w-full rounded-2xl border border-gray-300 pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm text-center mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center">
            <label>Podaj Rating</label>
            <Controller
              name="rating"
              control={control}
              rules={{ required: "Wybierz ocenę" }}
              render={({ field }) => (
                <Rating
                  {...field}
                  max={10}
                  size="medium"
                  emptyIcon={
                    <StarBorderIcon
                      sx={{ color: "white" }}
                      fontSize="inherit"
                    />
                  }
                />
              )}
            />
            {errors.rating && (
              <p className="text-red-400 text-sm mt-2">
                {errors.rating.message}
              </p>
            )}
          </div>
        </div>
        <div className="max-w-[400px]">
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
            className="w-full h-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          {errors.text && (
            <p className="text-red-400 text-sm text-center mt-2">
              {errors.text.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center pt-2">
        <button
          type="submit"
          className="px-3 py-4 border rounded-xl bg-amber-200 text-black"
        >
          {sendSuccessful}
        </button>
      </div>
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-center mb-2">Komentarze</h2>
        <ul className="flex flex-col w-[60%] gap-3">
          {comments.map((c) => (
            <li key={c.id} className="bg-zinc-800 p-3 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="capitalize font-bold">{c.nickname}</div>
              </div>
              <div className="mt-1">{c.title}</div>
              <div className="mt-2 text-sm">{c.text}</div>
              <div className="mt-2">Ocena: {c.rating}</div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
