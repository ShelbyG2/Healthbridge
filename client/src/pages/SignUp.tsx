import { useEffect, useState, useContext } from "react";

import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadSpinner from "../components/LoadSpinner";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!fullname || !email || !password || !confirmPassword || !role) {
      toast.error("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          role,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }
      setIsAuthenticated(true);
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/login");
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Signup faled");
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
        method="post"
        onSubmit={handleSubmit}
        className="bg-light-bg dark:bg-dark-bg border border-light-accent dark:border-dark-accent rounded-xl flex flex-col justify-between p-10 z-10 shadow-xl
        transition-transform duration-700 animate-card-3d "
      >
        <h1 className="text-light-text text-3xl font-bold mb-4">Sign Up</h1>
        <label
          htmlFor="fullname"
          className="text-light-secondary dark:text-dark-secondary"
        >
          Name
        </label>
        <input
          type="text"
          required
          name="name"
          className="bg-transparent border-2 border-light-border dark:border-dark-border focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border rounded-lg p-2 outline-none text-light-input-text dark:text-dark-input-text"
          value={fullname}
          onChange={handleNameChange}
        />
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
          className="bg-transparent border-2 focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border text-light-input-text dark:text-dark-input-text border-light-border dark:border-dark-border rounded-lg p-2 outline-none "
          value={email}
          onChange={handleEmailChange}
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
          className="bg-transparent border-2 focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border border-light-border dark:border-dark-border rounded-lg p-2 outline-none"
          value={password}
          onChange={handlePasswordChange}
        />
        <label
          htmlFor="password"
          className="text-light-secondary dark:text-dark-secondary"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="bg-transparent border-2 focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border border-light-border dark:border-dark-border rounded-lg p-2 outline-none"
        />
        <label
          htmlFor="role"
          className="text-light-secondary dark:text-dark-secondary"
        >
          Role
        </label>
        <select
          name="role"
          id="role"
          className="text-light-secondary focus:ring-2 focus:ring-light-border focus:dark:ring-dark-border dark:text-dark-secondary bg-transparent border-2 border-light-border dark:border-dark-border rounded-lg p-2 outline-none text-center mb-2"
          required
          value={role}
          onChange={handleRoleChange}
        >
          <option value="" disabled className=" bg-transparent">
            Select your role
          </option>
          <option value="patient" className=" bg-transparent">
            Patient
          </option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
        </select>
        <button
          type="submit"
          className="bg-light-accent dark:bg-dark-accent text-white dark:text-dark-text rounded-lg p-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors duration-300"
        >
          Sign Up
        </button>
        <p className="text-light-secondary dark:text-dark-secondary text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-light-text dark:text-dark-text underline"
          >
            Login
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

export default SignUp;
