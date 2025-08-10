import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoadSpinner from "../../components/LoadSpinner";
import { toast } from "react-hot-toast";
import ToggleSwitch from "../../components/ui/ToggleBtn";
import { API_URL } from "../../lib/utils";
// import FileUploader from "../../components/ui/FileUploader";
import {
  Camera,
  Shield,
  UserCog,
  Award,
  AlertCircle,
  Clock,
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
  // profile information
  const [fullname, setFullname] = useState(user.fullname || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [gender, setGender] = useState(user.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user.profileImage || "default-avatar.png"
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(
    user.profileImage || ""
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    // Pad month and day with leading zeros
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

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
  const handleImageUpload = async (file: File) => {
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("image", file);

    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}/api/upload/profile-image`, true);
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setUploadedImageUrl(data.imageUrl);
          toast.success("Image uploaded!");
          resolve(data.imageUrl);
        } else {
          toast.error("Image upload failed");
          reject(new Error("Upload failed"));
        }
        setUploadProgress(0);
      };

      xhr.onerror = () => {
        toast.error("Image upload failed");
        setUploadProgress(0);
        reject(new Error("Upload failed"));
      };

      xhr.send(formData);
    });
  };
  const onProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const url = await handleImageUpload(file);
        setUploadedImageUrl(url);
      } catch {
        setPreviewUrl(user.profileImage || "default-avatar.png");
      }
    }
  };

  // Update profile handler with image upload
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          phone: phone,
          address: address,
          profileImageUrl: uploadedImageUrl || "",
          gender: gender,
          dateOfBirth: dateOfBirth,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
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

  // professional information
  const [specialization, setSpecialization] = useState(
    user.specialization || ""
  );
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || "");
  const [experience, setExperience] = useState(user.experience || "");
  const [education, setEducation] = useState(user.education || "");

  // Availability & notifications
  const [availability, setAvailability] = useState(user.availability || false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  //Security settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //Working slots
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("04:00 PM");
  //fetch existing slots
  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch(`${API_URL}/api/doctor/availability`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setSlots(defaultSlots);
      }
      const data = await res.json();
      if (data && data.slots) {
        setSlots(mergeSlotsWithDefaults(data.slots, defaultSlots));
      }
    };
    fetchSlots();
  }, []);
  //merge slots and default slots
  const mergeSlotsWithDefaults = (backendSlots, defaultSlots) => {
    return defaultSlots.map((defaultSlot) => {
      const found = backendSlots.find(
        (s) => s.dayOfWeek === defaultSlot.dayOfWeek
      );
      return found ? { ...defaultSlot, ...found } : { ...defaultSlot };
    });
  };
  const defaultSlots = [
    { dayOfWeek: "Monday", startTime: "09:00", endTime: "16:00" },
    { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "16:00" },
    { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "16:00" },
    { dayOfWeek: "Thursday", startTime: "09:00", endTime: "16:00" },
    { dayOfWeek: "Friday", startTime: "09:00", endTime: "16:00" },
    { dayOfWeek: "Saturday", startTime: "09:00", endTime: "13:00" },
    { dayOfWeek: "Sunday", startTime: "09:00", endTime: "13:00" },
  ];
  const [slots, setSlots] = useState(defaultSlots);

  const handleTimeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      )
    );
  };

  const handleSlotsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/doctor/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ slots }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update working hours");
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? "Failed to update working hours"
          : "Failed to update working hours"
      );
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
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }
      toast.success(data.message);
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
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
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
                    onChange={onProfileImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                    <Camera size={16} />
                  </button>
                  {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6"></div>

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
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={formatDate(dateOfBirth)}
                    onChange={(e) => setDateOfBirth(e.target.value)}
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
                <div className="p-6 w-full ">
                  <div className="flex  justify-between mb-6">
                    <div className="card-header">
                      <BookmarkPlus className="w-5 h-5" />
                      <h2 className="text-xl font-semibold">Certifications</h2>
                    </div>
                  </div>
                  {/* 
                  <FileUploader
                    onFilesSelected={(files) => setCertifications(files)}
                  /> */}
                  <button className="button-primary mt-4 w-fit h-fit">
                    Upload
                  </button>
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
              <div className="flex items-center gap-2 card-header">
                <Clock className="w-5 h-5" />
                <h2 className="text-xl font-semibold">
                  Availability & Preferences
                </h2>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-light-text/80 dark:text-dark-text/80">
                    Available for Appointments
                  </h3>
                  <p className="text-sm text-light-secondary dark:text-dark-secondary">
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
                  <h3 className="font-medium text-light-text/80 dark:text-dark-text/80">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-light-secondary dark:text-dark-secondary">
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
              <div className="flex items-center gap-2 card-header">
                <Shield className="w-5 h-5 " />
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
              <div className="flex items-center gap-2 card-header">
                <Clock className="w-5 h-5 " />
                <h2 className="text-xl font-semibold">Working Hours</h2>
              </div>
            </div>
            <form action="submit" onSubmit={handleSlotsUpdate}>
              <div className="space-y-4">
                {slots.map((slot, index) => (
                  <div className="" key={index}>
                    <label htmlFor="" className="form-label">
                      {slot.dayOfWeek}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          handleTimeChange(index, "startTime", e.target.value)
                        }
                        className="form-input"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          handleTimeChange(index, "endTime", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit" className="button-primary mt-4 w-full">
                Update Working Hours
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorSettings;
