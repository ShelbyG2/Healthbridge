import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast/headless";

const PatientSettings = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadSpinner />;
  }
  if (!user) {
    return toast.error("Failed to load user data");
  }
  const [fullname, setFullname] = useState(user.fullname || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  return (
    <div className="flex-1 p-6 w-full flex flex-col overflow-hidden">
      <header className="mb-6">
        <h1 className="text-2xl lg:text-4xl text-light-text dark:text-dark-text font-bold ">
          Settings
        </h1>
      </header>
      <section className="flex-1 overflow-y-auto dashboard-grid pb-8 ">
        {/* Profile information */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {/* Profile form or information display goes here */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                defaultValue={user.fullname || ""}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                defaultValue={user.email || ""}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2">
              Save Changes
            </button>
          </form>
        </div>
        {/* Emergency Contact */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
          {/* Emergency contact form or information display goes here */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="emergencyContactName"
                className="block text-sm font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="emergencyContactName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="emergencyContactPhone"
                className="block text-sm font-medium"
              >
                Phone
              </label>
              <input
                type="tel"
                id="emergencyContactPhone"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="emergencyContactRelation"
                className="block text-sm font-medium"
              >
                Relation
              </label>
              <input
                type="text"
                id="emergencyContactRelation"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2">
              Save Emergency Contact
            </button>
          </form>
        </div>
        {/* Health Preferences */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Health Preferences</h2>
          {/* Health preferences form or information display goes here */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="preferredLanguage"
                className="block text-sm font-medium"
              >
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="notificationPreferences"
                className="block text-sm font-medium"
              >
                Notification Preferences
              </label>
              <select
                id="notificationPreferences"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2">
              Save Preferences
            </button>
          </form>
        </div>
        {/* Security */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          {/* Security settings form or information display goes here */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2">
              Update Password
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PatientSettings;
