import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL = import.meta.env.PROD
  ? "https://healthbridge-dl9s.onrender.com"
  : "http://localhost:3000";

export const fetchConfig = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
