import type {
  Appointment,
  AppointmentChartData,
  Category,
  ChartData,
  DashboardStats,
  DoctorReviews,
  DoctorWithStatus,
  MedicalRecord,
  Payment,
  Prescription,
  SubCategory,
  User,
} from "@/types/telehealth"

import { AppointmentPaymentStatus, AppointmentStatus } from "@/types/telehealth"

// Mock Categories and Subcategories
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Cardiology",
    description: "Heart and cardiovascular system specialists",
    icon_url: "🫀",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    subCategories: [],
  },
  {
    id: "2",
    name: "Dermatology",
    description: "Skin, hair, and nail specialists",
    icon_url: "🧴",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    subCategories: [],
  },
  {
    id: "3",
    name: "General Medicine",
    description: "Primary care physicians",
    icon_url: "🩺",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    subCategories: [],
  },
]

export const mockSubCategories: SubCategory[] = [
  {
    id: "1",
    name: "Interventional Cardiology",
    categoryId: "1",
    category: mockCategories[0],
    price: 150.0,
    description: "Cardiac catheterization and interventions",
    icon_url: "🫀",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Clinical Dermatology",
    categoryId: "2",
    category: mockCategories[1],
    price: 100.0,
    description: "General skin condition consultations",
    icon_url: "🧴",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Family Medicine",
    categoryId: "3",
    category: mockCategories[2],
    price: 80.0,
    description: "Comprehensive primary care",
    icon_url: "🩺",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

// Mock Users
export const mockUsers: User[] = [
  // Doctors
  {
    id: "doc1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    role: "doctor",
    banned: false,
  },
  {
    id: "doc2",
    name: "Dr. Michael Chen",
    email: "michael.chen@clinic.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    role: "doctor",
    banned: false,
  },
  {
    id: "doc3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@medical.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1594824475317-2e5b924b9163?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    role: "doctor",
    banned: false,
  },
  // Patients
  {
    id: "pat1",
    name: "John Smith",
    email: "john.smith@email.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    role: "patient",
    banned: false,
  },
  {
    id: "pat2",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b66eead4?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    role: "patient",
    banned: false,
  },
  {
    id: "pat3",
    name: "David Wilson",
    email: "david.wilson@email.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    role: "patient",
    banned: false,
  },
]

// Mock Doctors with Status
export const mockDoctorsWithStatus: DoctorWithStatus[] = [
  {
    id: "doc1",
    userid: "doc1",
    user: mockUsers[0],
    licenseNumber: "MD123456",
    licenseDocument: "https://example.com/license1.pdf",
    subCategoryId: "1",
    subCategory: mockSubCategories[0],
    licenseExpiry: new Date("2025-12-31"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    education: [],
    professionalExperience: [],
    status: "APPROVED",
    approvalDate: new Date("2024-01-16"),
  },
  {
    id: "doc2",
    userid: "doc2",
    user: mockUsers[1],
    licenseNumber: "MD789012",
    licenseDocument: "https://example.com/license2.pdf",
    subCategoryId: "2",
    subCategory: mockSubCategories[1],
    licenseExpiry: new Date("2025-08-15"),
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    education: [],
    professionalExperience: [],
    status: "PENDING",
  },
  {
    id: "doc3",
    userid: "doc3",
    user: mockUsers[2],
    licenseNumber: "MD345678",
    licenseDocument: "https://example.com/license3.pdf",
    subCategoryId: "3",
    subCategory: mockSubCategories[2],
    licenseExpiry: new Date("2025-06-30"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    education: [],
    professionalExperience: [],
    status: "APPROVED",
    approvalDate: new Date("2024-02-02"),
  },
]

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    doctorId: "doc1",
    doctor: mockUsers[0],
    patientId: "pat1",
    patient: mockUsers[3],
    paymentStatus: AppointmentPaymentStatus.PAID,
    status: AppointmentStatus.COMPLETED,
    timeSlotId: "ts1",
    timeSlot: {
      id: "ts1",
      doctorId: "doc1",
      doctor: mockUsers[0],
      startTime: new Date("2024-03-15T10:00:00Z"),
      endTime: new Date("2024-03-15T10:30:00Z"),
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-10"),
    },
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-15"),
    messages: [],
    payments: [],
  },
  {
    id: "apt2",
    doctorId: "doc2",
    doctor: mockUsers[1],
    patientId: "pat2",
    patient: mockUsers[4],
    paymentStatus: AppointmentPaymentStatus.PENDING,
    status: AppointmentStatus.SCHEDULED,
    timeSlotId: "ts2",
    timeSlot: {
      id: "ts2",
      doctorId: "doc2",
      doctor: mockUsers[1],
      startTime: new Date("2024-03-20T14:00:00Z"),
      endTime: new Date("2024-03-20T14:30:00Z"),
      createdAt: new Date("2024-03-18"),
      updatedAt: new Date("2024-03-18"),
    },
    createdAt: new Date("2024-03-18"),
    updatedAt: new Date("2024-03-18"),
    messages: [],
    payments: [],
  },
]

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "pay1",
    appointmentId: "apt1",
    appointment: mockAppointments[0],
    amount: 150.0,
    doctorId: "doc1",
    doctor: mockUsers[0],
    patientId: "pat1",
    patient: mockUsers[3],
    currency: "USD",
    paymentMethod: "Credit Card",
    paymentStatus: "completed",
    transactionId: "txn_123456789",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "pay2",
    appointmentId: "apt2",
    appointment: mockAppointments[1],
    amount: 100.0,
    doctorId: "doc2",
    doctor: mockUsers[1],
    patientId: "pat2",
    patient: mockUsers[4],
    currency: "USD",
    paymentMethod: "PayPal",
    paymentStatus: "pending",
    transactionId: "txn_987654321",
    createdAt: new Date("2024-03-18"),
    updatedAt: new Date("2024-03-18"),
  },
]

// Mock Reviews
export const mockReviews: DoctorReviews[] = [
  {
    id: "rev1",
    doctorId: "doc1",
    doctor: mockUsers[0],
    patientId: "pat1",
    patient: mockUsers[3],
    rating: 5,
    comment: "Excellent consultation and very professional.",
    appointmentId: "apt1",
    appointment: mockAppointments[0],
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
]

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalDoctors: 125,
  totalPatients: 1847,
  totalServices: 23,
  totalAppointments: 892,
  pendingApprovals: 7,
  totalRevenue: 125780,
  completedAppointments: 756,
  canceledAppointments: 24,
}

// Chart Data
export const mockAppointmentChartData: AppointmentChartData[] = [
  { month: "Jan", appointments: 65, revenue: 9750 },
  { month: "Feb", appointments: 78, revenue: 11700 },
  { month: "Mar", appointments: 92, revenue: 13800 },
  { month: "Apr", appointments: 88, revenue: 13200 },
  { month: "May", appointments: 95, revenue: 14250 },
  { month: "Jun", appointments: 102, revenue: 15300 },
]

export const mockPaymentChartData: ChartData[] = [
  { name: "Completed", value: 756 },
  { name: "Pending", value: 112 },
  { name: "Failed", value: 24 },
]

// Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "pat1",
    patient: mockUsers[3],
    description: "Routine checkup - blood pressure slightly elevated",
    document: "https://example.com/medical-record-1.pdf",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    files: [],
  },
]

// Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: "pres1",
    appointmentId: "apt1",
    appointment: mockAppointments[0],
    medicines: "Lisinopril 10mg, Metformin 500mg",
    notes: "Take with food. Monitor blood pressure daily.",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    medicine: [
      {
        id: "med1",
        name: "Lisinopril",
        quantity: "30",
        unit: "tablets",
        dosage: "10mg",
        time: "Morning",
        prescriptionId: "pres1",
        frequency: "Once daily",
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
      },
    ],
  },
]
