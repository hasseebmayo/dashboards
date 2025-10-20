export const mockQueries = [
  {
    id: "q1",
    name: "John Smith",
    email: "john.smith@email.com",
    subject: "Unable to book appointment",
    message:
      "I'm having trouble booking an appointment with Dr. Johnson. The system shows an error.",
    category: "technical" as const,
    priority: "high" as const,
    status: "new" as const,
    createdAt: new Date("2024-03-15T10:30:00Z"),
    updatedAt: new Date("2024-03-15T10:30:00Z"),
  },
  {
    id: "q2",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    subject: "Payment not processed",
    message:
      "My payment was deducted but the appointment is still showing as unpaid.",
    category: "billing" as const,
    priority: "urgent" as const,
    status: "open" as const,
    createdAt: new Date("2024-03-14T14:20:00Z"),
    updatedAt: new Date("2024-03-14T15:45:00Z"),
  },
  {
    id: "q3",
    name: "David Wilson",
    email: "david.wilson@email.com",
    subject: "Question about prescription",
    message:
      "I need clarification about the dosage mentioned in my prescription.",
    category: "medical" as const,
    priority: "medium" as const,
    status: "pending" as const,
    createdAt: new Date("2024-03-13T09:15:00Z"),
    updatedAt: new Date("2024-03-14T11:30:00Z"),
  },
  {
    id: "q4",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "How to update profile",
    message:
      "I need help updating my profile information and adding medical history.",
    category: "general" as const,
    priority: "low" as const,
    status: "resolved" as const,
    createdAt: new Date("2024-03-12T16:45:00Z"),
    updatedAt: new Date("2024-03-13T08:20:00Z"),
  },
]
