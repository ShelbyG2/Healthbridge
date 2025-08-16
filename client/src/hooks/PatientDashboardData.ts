import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../lib/utils";

export const PatientDashboardData = (userId: string) => {
  const triageQuery = useQuery({
    queryKey: ["triages", userId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/patient/${userId}/triage/daily`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch Triages");
      return res.json();
    },
    enabled: !!userId, // Only run query if userId exists
  });

  const appointmentQuery = useQuery({
    queryKey: ["appointments", userId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/appointments/${userId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch Appointments");
      return res.json();
    },
    enabled: !!userId, // Only run query if userId exists
  });

  return {
    triages: triageQuery.data?.triages || [], // Provide default empty array
    appointments: appointmentQuery.data || [],
    isLoading: triageQuery.isLoading || appointmentQuery.isLoading,
    isError: triageQuery.isError || appointmentQuery.isError,
  };
};
