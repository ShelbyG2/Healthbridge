import { createContext } from "react";

export interface BaseUser {
  _id: string;
  fullname: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  phone?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  profileImage?: string;
}
export interface DoctorUser extends BaseUser {
  role: "doctor";
  specialization: string;
  licenseNumber: string;
  experience: number;
  education: string;
  availability: boolean;
}
export interface PatientUser extends BaseUser {
  role: "patient";
  medicalHistory?: string[];
  emergencyContact?: string[];
  medications?: string[];
}
export interface AdminUser extends BaseUser {
  role: "admin";
  permissions: string[];
}

export type User = DoctorUser | PatientUser | AdminUser;

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
