import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import ToggleSwitch from "../../components/ui/ToggleBtn";
import { API_URL } from "../../lib/utils";
import FileUploader from "../../components/ui/FileUploader.tsx";
import {
  Camera,
  Shield,
  UserCog,
  Award,
  AlertCircle,
  Clock,
  BookmarkPlus,
} from "lucide-react";

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  DOB: string;
  specialization: string;
  licenseNumber: string;
  experience: string;
  education: string;
}

interface WorkingHours {
  start: string;
  end: string;
  isWorking: boolean;
}

interface WorkingHoursState {
  [key: string]: WorkingHours;
}

const defaultWorkingHours: WorkingHoursState = {
  monday: { start: "09:00", end: "17:00", isWorking: true },
  tuesday: { start: "09:00", end: "17:00", isWorking: true },
  wednesday: { start: "09:00", end: "17:00", isWorking: true },
  thursday: { start: "09:00", end: "17:00", isWorking: true },
  friday: { start: "09:00", end: "17:00", isWorking: true },
  saturday: { start: "09:00", end: "13:00", isWorking: false },
  sunday: { start: "09:00", end: "13:00", isWorking: false },
};
