// Telehealth Types based on Prisma Schema

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
  role?: string
  banned?: boolean
  banReason?: string
  banExpires?: Date
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
  createdAt: Date
  updatedAt: Date
  education: Education[]
  professionalExperience: ProfessionalExperience[]
}

export interface Education {
  id: string
  doctorId: string
  degree: string
  institution: string
  startYear: Date
  document: string
  endYear?: Date
  year: number
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

export interface TimeSlot {
  id: string
  doctorId: string
  doctor: User
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
}

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

export interface Appointment {
  id: string
  doctorId: string
  doctor: User
  patientId: string
  patient: User
  paymentStatus: AppointmentPaymentStatus
  medicalRecordId?: string
  medicalRecord?: MedicalRecord
  status: AppointmentStatus
  timeSlotId: string
  timeSlot: TimeSlot
  createdAt: Date
  updatedAt: Date
  chatroomExpiry?: Date
  prescription?: Prescription[]
  review?: DoctorReviews
  messages: AppointmentChat[]
  payments: Payment[]
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
  appointment: Appointment
  medicines: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  medicine: Medicine[]
}

export interface Medicine {
  id: string
  name: string
  quantity: string
  unit?: string
  dosage?: string
  time?: string
  prescriptionId: string
  frequency?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentChat {
  id: string
  appointmentId: string
  appointment: Appointment
  message: string
  fileUrl?: string
  senderId: string
  sender: User
  senderRole?: string
  createdAt: Date
  updatedAt: Date
}

export interface DoctorReviews {
  id: string
  doctorId: string
  doctor: User
  patientId: string
  patient: User
  rating: number
  comment?: string
  appointmentId: string
  appointment: Appointment
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
  url?: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

// Dashboard specific types
export interface DashboardStats {
  totalDoctors: number
  totalPatients: number
  totalServices: number
  totalAppointments: number
  pendingApprovals: number
  totalRevenue: number
  completedAppointments: number
  canceledAppointments: number
}

export interface DoctorStatus {
  PENDING: "pending"
  APPROVED: "approved"
  REJECTED: "rejected"
}

export interface DoctorWithStatus extends Doctor {
  status: keyof DoctorStatus
  approvalDate?: Date
  rejectionReason?: string
}

// Chart data types
export interface ChartData {
  name: string
  value: number
  date?: string
}

export interface AppointmentChartData {
  month: string
  appointments: number
  revenue: number
}

// Filter types
export interface DoctorFilter {
  status?: keyof DoctorStatus
  specialty?: string
  experience?: string
  location?: string
  search?: string
}

export interface PatientFilter {
  dateRange?: string
  search?: string
  appointmentStatus?: AppointmentStatus
}

export interface PaymentFilter {
  dateRange?: string
  paymentStatus?: string
  paymentMethod?: string
  search?: string
}
