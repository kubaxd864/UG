"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function SubmitButton({ text, pending }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-3 py-4 border rounded-xl bg-amber-200 text-black w-40"
    >
      {pending ? "Wysyłanie..." : text}
    </button>
  );
}
