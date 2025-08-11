import { Calendar1, Clock, Plus } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "../../lib/utils";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import LoadSpinner from "../../components/LoadSpinner";

const PatientAppointments = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Pending"); // Fixed: useState syntax
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?._id) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/api/appointments/${user._id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch appointments");
        }

        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch Appointments. Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user?._id]); // Add dependency

  if (isLoading) {
    return <LoadSpinner />;
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic here
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setStatus(appointmentId.at(0) === "1" ? "Cancelled" : "Pending");
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sort === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <div className="flex-1 p-4 md:p-6 w-full flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="mb-8 pl-8">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          Your Appointments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your appointments and bookings
        </p>
        <button className="button-primary" onClick={handleModalOpen}>
          <span className="text-xl">+</span> Book Appointment
        </button>
      </header>

      {/* Filter Navigation */}
      <nav className="flex gap-4 mb-4">
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
      <section className="h-full w-full overflow-y-auto bg-light-surface dark:bg-dark-surface dark:text-dark-secondary p-6 rounded-lg">
        {sortedAppointments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <p className="text-light-secondary dark:text-dark-secondary">
              No appointments found.
            </p>
            <button
              className="button-primary max-w-fit"
              onClick={handleModalOpen}
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {sortedAppointments.map((appointment) => (
              <li
                key={appointment._id}
                className="flex flex-col p-4 border border-light-border dark:border-dark-border rounded-lg"
              >
                <h2 className="text-lg text-light-text dark:text-dark-text font-semibold">
                  Appointment with Dr. {appointment.doctorId}
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
                      className="button-danger"
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Appointment booking modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center h-screen w-screen bg-light-bg/60 dark:bg-dark-bg/60 justify-center z-50">
          <div className="bg-light-bg dark:bg-dark-bg rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label htmlFor="doctor" className="form-label">
                  Select Doctor
                </label>
                <select id="doctor" className="form-input">
                  <option value="doctor1">Dr. Smith</option>
                  <option value="doctor2">Dr. Johnson</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="form-label">
                  Select Date
                </label>
                <input type="date" id="date" className="form-input" />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="form-label">
                  Select Time
                </label>
                <input type="time" id="time" className="form-input" />
              </div>
              <div className="mb-4">
                <label htmlFor="reason" className="form-label">
                  Reason for Appointment
                </label>
                <textarea id="reason" className="form-input" rows={3} />
              </div>
              <div className="flex justify-between mt-4">
                <button className="button-primary " type="submit">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="button-danger max-h-fit"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
