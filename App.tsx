import React, { useMemo, useState } from "react";

import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

// BeatyConnect App
// Beaty Services Marketplace and Booking Application

//Types of Categories of Beauty Services

type Category =
  | "Nails"
  | "Makeup"
  | "Wigs"
  | "Weaves"
  | "Hair"
  | "Lashes";

// Different screens of the application

type Screen =
  | "Home"
  | "Discover"
  | "Bookings"
  | "Products"
  | "Dashboard";

// Booking statuses

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

// Booking interface

interface Professional {
  id: string;
  name: string;
  category: Category;
  city: string;
  rating: number;
  reviews: number;
  price: number;
  houseCalls: boolean;
  houseCallFee: number;
  description: string;
}

interface BeautyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: string;
}

interface Booking {
  id: string;
  professional: string;
  service: string;
  date: string;
  servicePrice: number;
  houseCallFee: number;
  houseCall: boolean;
  status: BookingStatus;
}

// Sample data of professionals, products, and bookings

const initialProfessionals: Professional[] = [
  {
    id: "1",
    name: "Glam Nails Studio",
    category: "Nails",
    city: "Cape Town",
    rating: 4.9,
    reviews: 42,
    price: 250,
    houseCalls: true,
    houseCallFee: 80,
    description: "Professional manicures and nail art.",
  },
  {
    id: "2",
    name: "Beauty by Amahle",
    category: "Makeup",
    city: "Johannesburg",
    rating: 4.8,
    reviews: 35,
    price: 450,
    houseCalls: true,
    houseCallFee: 100,
    description: "Glam makeup for events and occasions.",
  },
  {
    id: "3",
    name: "Crown Wig Studio",
    category: "Wigs",
    city: "Cape Town",
    rating: 4.9,
    reviews: 61,
    price: 350,
    houseCalls: true,
    houseCallFee: 120,
    description: "Wig installation, styling and customisation.",
  },
  {
    id: "4",
    name: "Luxe Weave Lounge",
    category: "Weaves",
    city: "Durban",
    rating: 4.7,
    reviews: 28,
    price: 400,
    houseCalls: false,
    houseCallFee: 0,
    description: "Weave installation and hair styling.",
  },
  {
    id: "5",
    name: "Lash Paradise",
    category: "Lashes",
    city: "Pretoria",
    rating: 4.6,
    reviews: 19,
    price: 300,
    houseCalls: true,
    houseCallFee: 70,
    description: "Classic, hybrid and volume lash extensions.",
  },
  {
    id: "6",
    name: "Natural Hair Studio",
    category: "Hair",
    city: "Cape Town",
    rating: 4.8,
    reviews: 24,
    price: 280,
    houseCalls: false,
    houseCallFee: 0,
    description: "Natural hair care, styling and treatments.",
  },
];

const initialProducts: BeautyProduct[] = [
  {
    id: "1",
    name: "Straight Lace Wig",
    description: "Premium straight lace wig.",
    price: 1200,
    seller: "Crown Hair Boutique",
  },
  {
    id: "2",
    name: "Curly Human Hair Wig",
    description: "Beautiful curly hair unit.",
    price: 1500,
    seller: "Luxury Hair SA",
  },
  {
    id: "3",
    name: "Hair Installation Kit",
    description: "Essential wig installation products.",
    price: 250,
    seller: "Beauty Essentials",
  },
  {
    id: "4",
    name: "Lash Extension Kit",
    description: "Lash tools and application essentials.",
    price: 350,
    seller: "Lash Paradise",
  },
];

//  Main App Component

export default function App() {
  const [screen, setScreen] = useState<Screen>("Home");

  const [professionals] = useState<Professional[]>(
    initialProfessionals
  );

  const [products] = useState<BeautyProduct[]>(
    initialProducts
  );

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);

  const [selectedService, setSelectedService] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");

  const [houseCall, setHouseCall] = useState(false);

  const [customerAddress, setCustomerAddress] = useState("");

  const [customerName, setCustomerName] = useState("");

  const [customerPhone, setCustomerPhone] = useState("");

  const [activeBooking, setActiveBooking] =
    useState<Booking | null>(null);

  // Commission section caltulation for the app owner

   const calculateCommission = (
    servicePrice: number,
    rate = 0.05
  ) => {
    return Math.round(servicePrice * rate * 100) / 100;
  };

  