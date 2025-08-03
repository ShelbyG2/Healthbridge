import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import ToggleSwitch from "../../components/ui/ToggleBtn";
import { API_URL } from "../../lib/utils";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullname,
          email,
          phone,
          address,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      toast.success(data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json(); // Get backend message
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }
      toast.success(data.message || "Password updated successfully");
    } catch (error) {
      toast.error((error as Error).message || "Failed to update password");
    }
  };
  return (
    <div className="flex-1 p-4 md:p-6 w-full flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your profile and preferences
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min overflow-auto mb-8">
        {/* Profile information */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="card-header ">
              <h2 className="text-xl font-semibold ">Profile Information</h2>
              <span className="">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </span>
            </div>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              <div className="space-y-2">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={fullname}
                  onChange={handleFullnameChange}
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="form-input"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                  className="form-input"
                  placeholder=" City, State, ZIP"
                />
              </div>
              <button type="submit" className="button-primary">
                <span>Save Changes</span>
              </button>
            </form>
          </div>
        </div>
        {/* Emergency Contact */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="card-header">
              <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
              <span className="">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </span>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="emergencyContactName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="emergencyContactName"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="emergencyContactPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="emergencyContactPhone"
                  className="form-input"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label
                  htmlFor="emergencyContactRelation"
                  className="form-label"
                >
                  Relation
                </label>
                <input
                  type="text"
                  id="emergencyContactRelation"
                  className="form-input"
                  placeholder="e.g., Mother, Father, Spouse"
                />
              </div>
              <button className="button-primary">Save Emergency Contact</button>
            </form>
          </div>
        </div>
        {/* Health Preferences */}

        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="card-header">
              <h2 className="text-xl font-semibold mb-4">Health Preferences</h2>
            </div>
            {/* Health preferences form or information display goes here */}
            <form className="space-y-4">
              <div>
                <label htmlFor="preferredDoctor" className="form-label">
                  Preferred Doctor
                </label>
                <input
                  type="text"
                  id="preferredDoctor"
                  className="form-input"
                  placeholder="Dr. John Doe"
                />
              </div>
              <div className="space-y-6">
                <label htmlFor="notificationPreferences" className="form-label">
                  Notification Preferences
                </label>
                <div className="flex items-center space-x-4">
                  <span className="form-label">Email Notifications</span>
                  <ToggleSwitch />
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="form-label">SMS Notifications</span>
                  <ToggleSwitch />
                </div>
              </div>
              <button className="button-primary">Save Preferences</button>
            </form>
          </div>
        </div>
        {/* Security */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden p-6">
          <div className="card-header">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
          </div>
          {/* Security settings form or information display goes here */}
          <form className="space-y-4" onSubmit={handlePasswordUpdate}>
            <div>
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="form-input"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                placeholder="Enter your current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-input"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Enter your new password"
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              type="submit"
              disabled={!currentPassword || !newPassword}
              className="button-primary"
            >
              Update Password
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PatientSettings;
