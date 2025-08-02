import { useState, useContext } from "react";
import { API_URL } from "../lib/utils";
import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadSpinner from "../components/LoadSpinner";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signin failed !");
      }
      login(data.user);
      toast.success("Signin successful");
      //Redirect to dashboard based on roles
      setTimeout(() => {
        if (data.user.role === "patient") {
          navigate("/dashboard/patient");
        } else if (data.user.role === "doctor") {
          navigate("/dashboard/doctor");
        } else if (data.user.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          throw new Error("Invalid user role");
        }
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signin failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center ">
      <div
        className="absolute inset-0 z-0 bg-light-bg-shape1 dark:bg-dark-bg-shape1 [clip-path:polygon(0_0,100%_0,0_100%)] 
        animate-slide-in-left"
      ></div>
      <div
        className="absolute inset-0 z-0 bg-light-bg-shape2 dark:bg-dark-bg-shape2 [clip-path:polygon(100%_0,100%_100%,0_100%)] 
        animate-slide-in-right"
      ></div>
      <img
        src={logo}
        alt="Logo"
        className="h-1/3 z-10 animate-drop-bounce mb-4"
      />

      <form
        action="submit"
        onSubmit={handleSubmit}
        className="bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-xl flex flex-col justify-between p-10 z-10 shadow-xl
        transition-transform duration-700 animate-card-3d"
      >
        <h1 className="text-light-text text-3xl font-bold mb-4">Sign In</h1>

        <label
          htmlFor="email"
          className="text-light-secondary dark:text-dark-secondary "
        >
          Email address
        </label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="bg-transparent border-2 focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border text-light-input-text dark:text-dark-input-text border-light-border dark:border-dark-border rounded-lg p-2 outline-none "
        />

        <label
          htmlFor="password"
          className="text-light-secondary dark:text-dark-"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="bg-transparent border-2 focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border border-light-border dark:border-dark-border rounded-lg p-2 outline-none"
        />

        <button
          type="submit"
          className="bg-light-accent dark:bg-dark-accent text-white dark:text-dark-text rounded-lg mt-4 p-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors duration-300"
        >
          Sign In
        </button>
        <p className="text-light-secondary dark:text-dark-secondary text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-light-text dark:text-dark-text underline"
          >
            Register
          </Link>
        </p>
      </form>
      {loading && (
        <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 ">
          <LoadSpinner />
        </div>
      )}
    </div>
  );
};

export default SignIn;
