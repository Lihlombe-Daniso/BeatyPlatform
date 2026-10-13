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

