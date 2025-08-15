import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export const API_URL = import.meta.env.VITE_API_URL;

export const fetchConfig = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
