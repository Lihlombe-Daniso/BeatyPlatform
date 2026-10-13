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

//Types of Category

type Category =
  | "Nails"
  | "Makeup"
  | "Wigs"
  | "Weaves"
  | "Hair"
  | "Lashes";