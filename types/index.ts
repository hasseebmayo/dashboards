export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

// Enums
export enum AppointmentStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  NO_SHOW = "NO_SHOW",
}

export enum AppointmentPaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum DoctorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  NURSE = "NURSE",
  MANAGER = "MANAGER",
}

// Core Types
export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role?: UserRole
  banned?: boolean
  banReason?: string
  banExpires?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Doctor {
  id: string
  userid: string
  user: User
  licenseNumber: string
  licenseDocument: string
  subCategoryId: string
  subCategory: SubCategory
  licenseExpiry: Date
  status: DoctorStatus
  createdAt: Date
  updatedAt: Date
  education: Education[]
  experience: ProfessionalExperience[]
}

export interface Education {
  id: string
  doctorId: string
  degree: string
  institution: string
  startYear: Date
  endYear?: Date
  year: number
  document: string
  createdAt: Date
  updatedAt: Date
}

export interface ProfessionalExperience {
  id: string
  doctorId: string
  hospital: string
  position: string
  startDate: Date
  endDate?: Date
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  icon_url?: string
  createdAt: Date
  updatedAt: Date
  subCategories: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  categoryId: string
  category: Category
  price: number
  description?: string
  icon_url?: string
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  doctorId: string
  doctor: User
  patientId: string
  patient: User
  timeSlotId: string
  timeSlot: TimeSlot
  status: AppointmentStatus
  paymentStatus: AppointmentPaymentStatus
  medicalRecordId?: string
  medicalRecord?: MedicalRecord
  chatroomExpiry?: Date
  createdAt: Date
  updatedAt: Date
  prescription?: Prescription
  review?: DoctorReview
  messages: AppointmentChat[]
  payments: Payment[]
}

export interface TimeSlot {
  id: string
  doctorId: string
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
}

export interface MedicalRecord {
  id: string
  patientId: string
  patient: User
  description: string
  document?: string
  createdAt: Date
  updatedAt: Date
  files: MedicalRecordFile[]
}

export interface MedicalRecordFile {
  id: string
  medicalRecordId: string
  fileUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface Prescription {
  id: string
  appointmentId: string
  medicines: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  medicineList: Medicine[]
}

export interface Medicine {
  id: string
  name: string
  quantity: string
  unit?: string
  dosage?: string
  time?: string
  frequency?: string
  prescriptionId: string
  createdAt: Date
  updatedAt: Date
}

export interface DoctorReview {
  id: string
  doctorId: string
  doctor: User
  patientId: string
  patient: User
  appointmentId: string
  rating: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentChat {
  id: string
  appointmentId: string
  message: string
  fileUrl?: string
  senderId: string
  sender: User
  senderRole?: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  appointmentId: string
  appointment: Appointment
  amount: number
  doctorId: string
  doctor: User
  patientId: string
  patient: User
  currency: string
  paymentMethod: string
  paymentStatus: string
  transactionId: string
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  user: User
  title: string
  message: string
  url?: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

// Dashboard specific types
export interface DashboardStats {
  totalDoctors: number
  totalPatients: number
  totalAppointments: number
  totalRevenue: number
  pendingDoctors: number
  todayAppointments: number
  completedAppointments: number
  cancelledAppointments: number
}

export interface AppointmentWithDetails extends Appointment {
  duration: number
  price: number
  service: string
}

export interface DoctorWithStats extends Doctor {
  totalAppointments: number
  totalPatients: number
  rating: number
  totalReviews: number
  revenue: number
  nextAppointment?: Date
}

export interface PatientWithStats {
  id: string
  user: User
  totalAppointments: number
  totalSpent: number
  lastAppointment?: Date
  nextAppointment?: Date
  medicalRecords: MedicalRecord[]
}

// Settings types
export interface RolePermission {
  id: string
  roleName: string
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SystemSettings {
  id: string
  enableDoctorSignupNotifications: boolean
  enableAppointmentReminders: boolean
  enablePaymentNotifications: boolean
  appointmentDuration: number
  cancellationPolicy: string
  refundPolicy: string
  createdAt: Date
  updatedAt: Date
}
