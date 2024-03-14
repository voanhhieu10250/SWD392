"use server";

import { unstable_noStore as noStore } from "next/cache";
import type { Art, Category, User } from "./types";
import { redirect } from "next/navigation";
import { login, logout } from "./lib/auth";

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
  const res = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts?limit=8"
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

export const getWhatIsHotArts = async (page = 1) => {
  noStore();
  const res = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts?page=" + page
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

export const getRecentArts = async (page = 1) => {
  noStore();
  const url = new URL("https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts");
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", "5");

  const res = await fetch(url);

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

  const url = new URL("https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts");
  const res = await fetch(url);

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: [],
    };
  }

  const data = (await res.json()) as Art[];
  const arts = data.filter((art) => art.title.includes(query));

  return {
    error: false,
    message: "",
    data: arts,
  };
};

//xong
export const getArtDetail = async (artId: string) => {
  noStore();
  const res = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts/" + artId
  );

  const user = await fetch("http://localhost:3000/user_profile.json");

  if (!res.ok || !user.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: null,
    };
  }

  const data = (await res.json()) as Art;
  const userData = (await user.json()) as User[];
  const owner = userData.find((user) => user.id === data.ownerId);

  // console.log(userData, owner, data.ownerId, data);

  if (!owner) {
    return {
      error: false,
      message: "",
      data: null,
    };
  }

  return {
    error: false,
    message: "",
    data: {
      ...data,
      owner: owner,
    } as Art & { owner: { name: string; id: string } },
  };
};

//xong
export const getArtDetailMoreArts = async () => {
  noStore();
  const res = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts?limit=3"
  );

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

//xong
export const getUserProfile = async (userId: string) => {
  noStore();
  const res = await fetch("http://localhost:3000/user_profile.json");

  if (!res.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: null,
    };
  }

  const data = (await res.json()) as User[];
  const user = data.find((user) => user.id === userId);

  if (!user) {
    return {
      error: false,
      message: "",
      data: null,
    };
  }

  const artsRes = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts?ownerId=" + userId
  );

  if (!artsRes.ok) {
    return {
      error: true,
      message: "An error occurred while fetching arts",
      data: null,
    };
  }
  // only return 3 arts
  return {
    error: false,
    message: "",
    data: {
      ...user,
      arts: (await artsRes.json()) as Art[],
    } as User & { arts: Art[] },
  };
};

export const handleLogin = async (formData: FormData) => {
  await login(formData.get("username") as string);
};

export const handleLogout = async () => {
  await logout();
  redirect("/");
};

export const handleUpload = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    originUrl: formData.get("originUrl"),
    tags: formData.get("tags"),
    ownerId: formData.get("ownerId"),
  };
  // console.log("data", data);

  const res = await fetch(
    "https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await res.json();
  // console.log(response);

  redirect("/art/" + response.id);
};
