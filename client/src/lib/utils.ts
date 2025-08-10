import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL = "http://192.168.100.14:3000";

export const fetchConfig = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
