import { Service, Review, FAQItem, ClinicInfo } from './types';

export const CLINIC_INFO: ClinicInfo = {
  name: "SINGLA CLINIC",
  address: "1366, Opp. to OPS Vidyamandir School, Sector 9, Ambala, Haryana 134003",
  phone: "083072 03664",
  rating: 4.7,
  reviewsCount: "51+"
};

export const SERVICES: Service[] = [
  {
    id: 'skin',
    title: 'Skin Care',
    description: 'Expert dermatological consultations for all skin types and conditions.',
    icon: 'Sparkles'
  },
  {
    id: 'eye',
    title: 'Eye Care',
    description: 'Comprehensive vision tests and specialized treatments for eye health.',
    icon: 'Eye'
  },
  {
    id: 'obs-gyn',
    title: 'Obstetrics & Gynaecology',
    description: 'Personalized maternal care and women\'s health services.',
    icon: 'Baby'
  }
];

export const REVIEWS: Review[] = [
  { id: '1', name: "Patient 1", rating: 5, text: "Great experience. Professional consultation." },
  { id: '2', name: "Patient 2", rating: 5, text: "Helpful staff and clean environment." },
  { id: '3', name: "Patient 3", rating: 4, text: "Wait time was minimal, doctor was very kind." }
];

export const FAQS: FAQItem[] = [
  {
    question: "What are clinic timings?",
    answer: "Our timings vary by department. Please call [Phone Number] or book an appointment to confirm the best time for your visit."
  },
  {
    question: "Do appointments help reduce waiting time?",
    answer: "Yes, pre-booked appointments are prioritized to ensure minimal waiting time for our patients."
  },
  {
    question: "Can patients walk in directly?",
    answer: "We accept walk-ins; however, we highly recommend booking in advance to ensure availability."
  }
];

export const DOCTOR_PLACEHOLDER = {
  name: "[Doctor Name]",
  qualification: "[Qualification]",
  experience: "[Years of Experience]",
  fee: "[Consultation Fee]",
  timings: "[Clinic Timings]"
};
