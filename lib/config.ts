export const siteConfig = {
  name: "TeleNeo",
  description:
    "Your trusted telehealth platform connecting patients with healthcare professionals",
  url: "https://teleneo.com",
  ogImage: "https://teleneo.com/og.jpg",
  links: {
    twitter: "https://twitter.com/teleneo",
    github: "https://github.com/teleneo",
  },
  contact: {
    email: "support@teleneo.com",
    phone: "+1 (555) 123-4567",
    address: "123 Health Street, Medical City, MC 12345",
  },
  company: {
    founded: "2024",
    license: "Licensed Healthcare Provider",
    registration: "REG-2024-001",
  },
}

export const navConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Find Doctors",
      href: "/search",
    },
    {
      title: "Services",
      href: "/#services",
    },
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Contact",
      href: "/#contact",
    },
  ],
}

export const servicesConfig = [
  {
    id: "consultation",
    title: "Online Consultation",
    description: "Connect with certified doctors through secure video calls",
    icon: "video",
    features: ["24/7 Availability", "Secure Platform", "Instant Reports"],
    price: "Starting from $50",
  },
  {
    id: "prescription",
    title: "Digital Prescriptions",
    description: "Get digital prescriptions delivered to your pharmacy",
    icon: "pill",
    features: ["Digital Delivery", "Pharmacy Network", "Insurance Support"],
    price: "Included in consultation",
  },
  {
    id: "specialist",
    title: "Specialist Care",
    description: "Access to specialized healthcare professionals",
    icon: "heart",
    features: ["Expert Doctors", "Advanced Diagnosis", "Follow-up Care"],
    price: "Starting from $120",
  },
  {
    id: "mental-health",
    title: "Mental Health",
    description: "Professional mental health support and counseling",
    icon: "brain",
    features: [
      "Licensed Therapists",
      "Confidential Sessions",
      "Flexible Scheduling",
    ],
    price: "Starting from $80",
  },
]

export const featuresConfig = [
  {
    title: "Secure & Private",
    description:
      "HIPAA-compliant platform ensuring your health data is protected",
    icon: "shield",
  },
  {
    title: "24/7 Access",
    description: "Connect with healthcare professionals anytime, anywhere",
    icon: "clock",
  },
  {
    title: "Licensed Doctors",
    description:
      "All our doctors are licensed and verified healthcare professionals",
    icon: "certificate",
  },
  {
    title: "Insurance Accepted",
    description: "We accept most major insurance plans for your convenience",
    icon: "credit-card",
  },
]
