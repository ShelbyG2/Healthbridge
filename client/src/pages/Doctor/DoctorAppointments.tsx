import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { LoadSpinner } from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import { API_URL } from "../../lib/utils";
import { Calendar1, Clock } from "lucide-react";

type Patient = {
  _id: string;
  fullname: string;
};

type Appointment = {
  _id: string;
  patientId: Patient;
  date: string;
  status: string;
  reason: string;
};

const DoctorAppointments = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date");
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useContext(AuthContext);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?._id) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_URL}/api/doctor/appointments/${user._id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch appointments");
        }

        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch Appointments. Please try again,");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user?._id]);

  if (isLoading) {
    return <LoadSpinner />;
  }

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/appointment/${appointmentId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Confirmed",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to confirm appointment");
      }
      const data = await res.json();
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === data._id
            ? { ...appointment, ...data }
            : appointment
        )
      );

      toast.success("Appointment confirmed successfully");
      setIsConfirmOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment. Please try again");
    }
  };
  const handleCompleteAppointnment = async (appointmentId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/appointment/${appointmentId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to confirm appointment");
      }
      const data = await res.json();
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === data._id
            ? { ...appointment, ...data }
            : appointment
        )
      );

      toast.success("Appointment completed successfully");
      setIsCompleteOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment. Please try again");
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    filter === "All" ? true : appointment.status === filter
  );
  const sortedAppointments = filteredAppointments?.length
    ? [...filteredAppointments].sort((a, b) => {
        if (sort === "date") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      })
    : [];

  return (
    <div className="flex-1  p-4 md:p-6 w-full flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="mb-8 ">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          Your Appointments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your appointments and bookings
        </p>
      </header>

      {/* Filter Navigation */}
      <nav className=" mb-4 overflow-y-hidden overflow-x-auto ">
        <div className="flex gap-4  p-6">
          {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === status
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </nav>

      {/* Sorter */}
      {/* <div className="flex justify-between items-center mb-4">
        <p className="text-light-secondary dark:text-dark-secondary">
          Sort by:
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-light-border dark:border-dark-border rounded-lg p-2"
        >
          <option value="date">Date</option>
      
        </select>
      </div> */}

      {/* List of Appointments */}
      <section className="h-full pb-20 w-full overflow-y-auto bg-light-surface dark:bg-dark-surface dark:text-dark-secondary p-6 rounded-lg">
        {sortedAppointments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <p className="text-light-secondary dark:text-dark-secondary">
              No appointments found.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {sortedAppointments.map((appointment) => (
              <li
                key={appointment._id}
                className="flex flex-col p-4 border border-light-border dark:border-dark-border rounded-lg"
              >
                <h2 className="text-lg text-light-text dark:text-dark-text font-semibold">
                  Appointment with Dr.{" "}
                  {appointment.patientId?.fullname ?? "Unknown Doctor"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  <Calendar1 className="inline-block mr-1" /> Date:{" "}
                  {new Date(appointment.date).toLocaleDateString()}{" "}
                </p>
                <p>
                  <Clock className="inline-block mr-1" /> Time:{" "}
                  {new Date(appointment.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </p>
                <p className="text-light-secondary flex items-center gap-2">
                  Status:{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : appointment.status === "Completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
                <p className="text-light-secondary">
                  Reason: {appointment.reason}
                </p>
                {appointment.status === "Pending" && (
                  <div className="flex justify-end">
                    <button
                      className="button-primary"
                      onClick={() => {
                        setIsConfirmOpen(true);
                        setSelectedAppointmentId(appointment._id);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                )}
                {appointment.status === "Confirmed" && (
                  <div className="flex justify-end">
                    <button
                      className="button-primary"
                      onClick={() => {
                        setIsCompleteOpen(true);
                        setSelectedAppointmentId(appointment._id);
                      }}
                    >
                      Complete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Modal to confirm Appointment confirmation */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center h-screen w-screen bg-light-bg/60 dark:bg-dark-bg/60 justify-center z-50">
          <div className="bg-light-bg dark:bg-dark-bg rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-light-text dark:text-dark-text">
              Confirm Appointment
            </h2>
            <p className="text-light-secondary dark:text-dark-secondary">
              Are you sure you want to confirm this appointment?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="button-primary"
                onClick={() => handleConfirmAppointment(selectedAppointmentId)}
              >
                Confirm
              </button>
              <button
                className="button-danger"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal to complete Appointment */}
      {isCompleteOpen && (
        <div className="fixed inset-0 flex items-center h-screen w-screen bg-light-bg/60 dark:bg-dark-bg/60 justify-center z-50">
          <div className="bg-light-bg dark:bg-dark-bg rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-light-text dark:text-dark-text">
              Complete Appointment
            </h2>
            <p className="text-light-secondary dark:text-dark-secondary">
              Are you sure you want to complete this appointment?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="button-primary"
                onClick={() =>
                  handleCompleteAppointnment(selectedAppointmentId)
                }
              >
                Complete
              </button>
              <button
                className="button-danger"
                onClick={() => setIsCompleteOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
