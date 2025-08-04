import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import ToggleSwitch from "../../components/ui/ToggleBtn";
import { API_URL } from "../../lib/utils";
import {
  Camera,
  Lock,
  Shield,
  UserCog,
  Phone,
  Mail,
  MapPin,
  Book,
  Award,
  AlertCircle,
  Clock,
  Calendar,
  BookmarkPlus,
} from "lucide-react";

const DoctorSettings = () => {
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
  const [gender, setGender] = useState(user.gender || "");
  const [DOB, setDOB] = useState(user.DOB || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Add new state for professional details
  const [specialization, setSpecialization] = useState(
    user.specialization || ""
  );
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || "");
  const [experience, setExperience] = useState(user.experience || "");
  const [education, setEducation] = useState(user.education || "");
  const [availability, setAvailability] = useState(user.availability || false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Add new state for additional features
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user.profileImage || "default-avatar.png"
  );
  const [workingHours, setWorkingHours] = useState({
    monday: { start: "09:00", end: "17:00", isWorking: true },
    tuesday: { start: "09:00", end: "17:00", isWorking: true },
    wednesday: { start: "09:00", end: "17:00", isWorking: true },
    thursday: { start: "09:00", end: "17:00", isWorking: true },
    friday: { start: "09:00", end: "17:00", isWorking: true },
    saturday: { start: "09:00", end: "13:00", isWorking: false },
    sunday: { start: "09:00", end: "13:00", isWorking: false },
  });
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertification, setNewCertification] = useState("");

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

  // Add image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Update profile handler with image upload
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("DOB", DOB);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message || "Failed to update profile"
          : "Failed to update profile"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Add certification handler
  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCertification.trim()) {
      setCertifications([...certifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  // Add working hours handler
  const handleWorkingHoursChange = (
    day: string,
    field: "start" | "end" | "isWorking",
    value: string | boolean
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
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
      toast.error(
        error instanceof Error
          ? error.message || "Failed to update password"
          : "Failed to update password"
      );
    }
  };
  return (
    <div className="flex-1 p-4 md:p-6 w-full  flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with profile summary */}
      <header className="mb-8 pl-8 ">
        <h1 className="text-2xl lg:text-3xl text-light-text dark:text-dark-text font-bold">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your profile and preferences
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min overflow-auto mb-8">
        {/* Profile Information */}
        <div className="bg-white  dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center gap-2 text-light-text dark:text-dark-text mb-6">
              <UserCog />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <div className="flex items-center flex-grow gap-6 mb-6">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6"></div>
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
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone
                </label>
                <div className="relative mt-2 max-w-xs text-gray-500">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select className="text-sm outline-none rounded-lg h-full">
                      <option>KE 🇰🇪</option>
                      <option>TZ 🇹🇿</option>
                      <option>UG 🇺🇬</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    placeholder="+1 (555) 000-000"
                    className="w-full pl-[4.5rem] pr-3  bg-transparent  py-2 rounded-lg border border-light-border dark:border-dark-border 
         bg-light-surface dark:bg-dark-surface text-light-secondary dark:text-dark-secondary
         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
         transition-colors outline-none"
                  />
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <button type="submit" className="button-primary w-full">
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 card-header">
                <Award className="" />
                <h2 className="text-xl font-semibold">Professional Details</h2>
              </div>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="form-input"
                  placeholder="e.g., Cardiology, Pediatrics"
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Medical License Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="form-input"
                  placeholder="License number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="form-input"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="form-label">Education</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="form-input"
                    placeholder="e.g., MD, University"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <BookmarkPlus className="w-5 h-5 text-blue-500" />
                      <h2 className="text-xl font-semibold">Certifications</h2>
                    </div>
                  </div>
                  <form onSubmit={handleAddCertification} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        placeholder="Add a certification"
                        className="form-input flex-1"
                      />
                      <button type="submit" className="button-primary px-4">
                        Add
                      </button>
                    </div>
                  </form>
                  <div className="space-y-2">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <span>{cert}</span>
                        <button
                          onClick={() =>
                            setCertifications(
                              certifications.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" className="button-primary w-full">
                Update Professional Info
              </button>
            </form>
          </div>
        </div>

        {/* Availability & Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">
                  Availability & Preferences
                </h2>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Available for Appointments</h3>
                  <p className="text-sm text-gray-500">
                    Toggle your availability for new appointments
                  </p>
                </div>
                <ToggleSwitch
                  checked={availability}
                  onChange={setAvailability}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive email notifications for new appointments
                  </p>
                </div>
                <ToggleSwitch
                  checked={notificationsEnabled}
                  onChange={setNotificationsEnabled}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Security</h2>
              </div>
            </div>
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
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Password must be at least 8 characters long and include
                    uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Add Working Hours Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Working Hours</h2>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 capitalize">{day}</div>
                  <ToggleSwitch
                    checked={hours.isWorking}
                    onChange={(checked) =>
                      handleWorkingHoursChange(day, "isWorking", checked)
                    }
                  />
                  {hours.isWorking && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "start", e.target.value)
                        }
                        className="form-input w-32"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "end", e.target.value)
                        }
                        className="form-input w-32"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Certifications Section */}
      </section>
    </div>
  );
};

export default DoctorSettings;
