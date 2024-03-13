"use server";

import { unstable_noStore as noStore } from "next/cache";
import type { Art, Category } from "./types";

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

// This function fetches the top art for the week. Only top 10
export const getTopArtThisWeek = async () => {
  noStore();
  const res = await fetch("http://localhost:3000/arts.json");

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: [],
    };
  }

  return {
    error: false,
    message: "",
    data: (await res.json()) as Art[],
  };
};