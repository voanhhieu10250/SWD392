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
export const getTopArtsThisWeek = async () => {
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

export const getWhatIsHotArts = async (page = 1) => {
  noStore();
  const res = await fetch("http://localhost:3000/arts.json?page=" + page);

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

export const getRecentArts = async (page = 1) => {
  noStore();
  const res = await fetch(
    "http://localhost:3000/recent_arts.json?page=" + page
  );

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

export const getSearchResults = async (
  query: string,
  searchBy: string,
  page = 1
) => {
  noStore();
  const res = await fetch(
    "http://localhost:3000/recent_arts.json?query=" +
      query +
      "&searchBy=" +
      searchBy +
      "&page=" +
      page
  );

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

export const getArtDetail = async (artId: string) => {
  noStore();
  const res = await fetch("http://localhost:3000/art_detail.json?id=" + artId);

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: null,
    };
  }

  return {
    error: false,
    message: "",
    data: (await res.json()) as Art & { owner: { name: string; id: number } },
  };
};

export const getArtDetailMoreArts = async () => {
  noStore();
  const res = await fetch("http://localhost:3000/recent_arts.json");

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: [],
    };
  }

  // only return 3 arts
  return {
    error: false,
    message: "",
    data: ((await res.json()) as Art[]).slice(0, 3),
  };
};
