"use server";

import { unstable_noStore as noStore } from "next/cache";
import type { Category } from "./types";

export const getCategories = async () => {
  noStore();
  const res = await fetch("http://localhost:3000/categories.json");

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching categories",
      data: [],
    };
  }

  return {
    error: false,
    message: "",
    data: (await res.json()) as Category[],
  };
};
