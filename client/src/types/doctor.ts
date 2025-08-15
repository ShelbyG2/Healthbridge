export interface BaseUser {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  profileImage?: string;
}

export interface Doctor extends BaseUser {
  specialization: string;
  licenseNumber: string;
  experience: string;
  education: string;
  availability: boolean;
}

export interface FormState {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  profileImage: File | null;
  previewUrl: string;
  uploadProgress: number;
  uploadedImageUrl: string;
  specialization: string;
  licenseNumber: string;
  experience: string;
  education: string;
  availability: boolean;
  notificationsEnabled: boolean;
  currentPassword: string;
  newPassword: string;
}

export interface TimeSlot {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}
