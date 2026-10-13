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

  // Search and filter section

   const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesSearch =
        professional.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        professional.city
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        professional.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        professional.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [professionals, search, selectedCategory]);

  // Booking creation and management section

   const startBooking = (professional: Professional) => {
    setSelectedProfessional(professional);
    setSelectedService(professional.category);
    setAppointmentDate("");
    setHouseCall(false);
    setCustomerAddress("");
    setCustomerName("");
    setCustomerPhone("");
    setScreen("Bookings");
  };

  const submitBooking = () => {
    if (!selectedProfessional) {
      Alert.alert(
        "Choose a professional",
        "Please select a professional before booking."
      );
      return;
    }

    if (!customerName.trim()) {
      Alert.alert("Missing name", "Enter your name.");
      return;
    }

    if (!customerPhone.trim()) {
      Alert.alert("Missing phone", "Enter your phone number.");
      return;
    }

    if (!appointmentDate.trim()) {
      Alert.alert(
        "Missing appointment date",
        "Enter your preferred appointment date and time."
      );
      return;
    }

    if (
      houseCall &&
      !selectedProfessional.houseCalls
    ) {
      Alert.alert(
        "Unavailable",
        "This professional does not offer house calls."
      );
      return;
    }

    if (houseCall && !customerAddress.trim()) {
      Alert.alert(
        "Missing address",
        "Enter the address for your house-call request."
      );
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      professional: selectedProfessional.name,
      service: selectedService,
      date: appointmentDate,
      servicePrice: selectedProfessional.price,
      houseCallFee: houseCall
        ? selectedProfessional.houseCallFee
        : 0,
      houseCall,
      status: "Pending",
    };

    setBookings((previous) => [
      ...previous,
      newBooking,
    ]);

    setActiveBooking(newBooking);

    setSelectedProfessional(null);

    Alert.alert(
      "Booking request created",
      "Your request has been added to this app's temporary booking list. It has not been sent to the professional yet.",
      [
        {
          text: "View bookings",
          onPress: () => setScreen("Bookings"),
        },
      ]
    );
  };

  // Booking management functions for confirming, completing, and cancelling bookings

   const updateBookingStatus = (
    bookingId: string,
    status: BookingStatus
  ) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status }
          : booking
      )
    );
  };

  // UI rendering functions for different screens

  // Buttons

   const Button = ({
    title,
    onPress,
    secondary = false,
  }: {
    title: string;
    onPress: () => void;
    secondary?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
      ]}

         ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          secondary && styles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const SectionTitle = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {subtitle ? (
        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );

  const ProfessionalCard = ({
    professional,
  }: {
    professional: Professional;
  }) => (
    <View style={styles.professionalCard}>
      <View style={styles.professionalTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {professional.name.charAt(0)}
          </Text>
        </View>

        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>
            {professional.name}
          </Text>

          <Text style={styles.mutedText}>
            {professional.category} · {professional.city}
          </Text>

          <Text style={styles.rating}>
            ★ {professional.rating} ({professional.reviews} reviews)
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {professional.description}
      </Text>

      <View style={styles.priceRow}>
        <View>
          <Text style={styles.mutedText}>
            Starting price
          </Text>

          <Text style={styles.price}>
            R{professional.price.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text style={styles.mutedText}>
            House calls
          </Text>

          <Text style={styles.houseCallText}>
            {professional.houseCalls
              ? `Available · R${professional.houseCallFee}`
              : "Not available"}
          </Text>
        </View>
      </View>

      <Button
        title="Book appointment"
        onPress={() => startBooking(professional)}
      />
    </View>
  );

  // Home Screen

   const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>
          YOUR BEAUTY, YOUR WAY
        </Text>

        <Text style={styles.heroTitle}>
          Your beauty.
          {"\n"}
          Your people.
          {"\n"}
          Your glow.
        </Text>

        <Text style={styles.heroDescription}>
          Discover beauty professionals, book appointments
          and shop beauty products in one place.
        </Text>

        <Button
          title="Explore beauty services →"
          onPress={() => setScreen("Discover")}
        />

        <Text style={styles.heroNote}>
          Beauty services and products, all in one place.
        </Text>
      </View>

      <View style={styles.content}>
        <SectionTitle
          title="Explore categories"
          subtitle="Find the service you need."
        />

        <View style={styles.categoryGrid}>
          {[
            { name: "Nails", icon: "💅" },
            { name: "Makeup", icon: "💄" },
            { name: "Wigs", icon: "👩🏽" },
            { name: "Weaves", icon: "✨" },
            { name: "Hair", icon: "💇🏽‍♀️" },
            { name: "Lashes", icon: "👁️" },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.categoryCard}
              onPress={() => {
                setSelectedCategory(item.name);
                setScreen("Discover");
              }}
            >
              <Text style={styles.categoryIcon}>
                {item.icon}
              </Text>

              <Text style={styles.categoryName}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionTitle
          title="Featured professionals"
          subtitle="Discover beauty talent."
        />

        {professionals.slice(0, 3).map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
          />
        ))}

        <Button
          title="See all professionals"
          secondary
          onPress={() => setScreen("Discover")}
        />

        <SectionTitle
          title="Beauty marketplace"
          subtitle="Discover products from beauty sellers."
        />

        {products.slice(0, 2).map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productIcon}>
              <Text style={{ fontSize: 30 }}>✨</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.professionalName}>
                {product.name}
              </Text>

              <Text style={styles.mutedText}>
                {product.seller}
              </Text>

              <Text style={styles.price}>
                R{product.price.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <Button
          title="Shop all products"
          secondary
          onPress={() => setScreen("Products")}
        />

        <View style={styles.joinCard}>
          <Text style={styles.joinTitle}>
            Are you a beauty professional?
          </Text>

          <Text style={styles.description}>
            Showcase your work, manage booking requests
            and grow your business.
          </Text>

          <Button
            title="Professional dashboard"
            onPress={() => setScreen("Dashboard")}
          />
        </View>
      </View>
    </ScrollView>
  );

  // Discovery Screen

  const renderDiscover = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <SectionTitle
          title="Find your beauty professional"
          subtitle="Search by name, city or service."
        />

        <TextInput
          style={styles.input}
          placeholder="Search professionals or locations..."
          placeholderTextColor="#958692"
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 15 }}
        >
          {[
            "All",
            "Nails",
            "Makeup",
            "Wigs",
            "Weaves",
            "Hair",
            "Lashes",
          ].map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.filterChip,
                selectedCategory === category &&
                  styles.activeFilterChip,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category &&
                    styles.activeFilterText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.mutedText}>
          {filteredProfessionals.length} professionals found
        </Text>

        {filteredProfessionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
          />
        ))}

        {filteredProfessionals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40 }}>🔎</Text>

            <Text style={styles.professionalName}>
              No professionals found
            </Text>

            <Text style={styles.mutedText}>
              Try another search or category.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );


  // Bookings Screen

  const renderBookings = () => (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {selectedProfessional ? (
          <>
            <SectionTitle
              title="Book an appointment"
              subtitle={`Booking with ${selectedProfessional.name}`}
            />

            <View style={styles.formCard}>
              <Text style={styles.label}>Your name</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={customerName}
                onChangeText={setCustomerName}
              />

              <Text style={styles.label}>Phone number</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={customerPhone}
                onChangeText={setCustomerPhone}
              />

              <Text style={styles.label}>Service</Text>

              <TextInput
                style={styles.input}
                value={selectedService}
                onChangeText={setSelectedService}
                placeholder="Enter the service"
              />

              <Text style={styles.label}>
                Appointment date and time
              </Text>

              <TextInput
                style={styles.input}
                value={appointmentDate}
                onChangeText={setAppointmentDate}
                placeholder="e.g. 25 October, 14:00"
              />

              <View style={styles.divider} />

              <Text style={styles.label}>
                Appointment location
              </Text>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setHouseCall(false)}
              >
                <Text style={styles.optionText}>
                  🏢 Visit the professional
                </Text>

                <Text style={styles.optionText}>
                  {houseCall ? "○" : "●"}
                </Text>
              </TouchableOpacity>

              {selectedProfessional.houseCalls && (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setHouseCall(true)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.optionText}>
                      🏡 Request a house call
                    </Text>

                    <Text style={styles.mutedText}>
                      Additional fee: R
                      {selectedProfessional.houseCallFee.toFixed(2)}
                    </Text>
                  </View>

                  <Text style={styles.optionText}>
                    {houseCall ? "●" : "○"}
                  </Text>
                </TouchableOpacity>
              )}

              {houseCall && (
                <>
                  <Text style={styles.label}>
                    Appointment address
                  </Text>

                  <TextInput
                    style={[styles.input, { minHeight: 80 }]}
                    placeholder="Enter your address"
                    multiline
                    value={customerAddress}
                    onChangeText={setCustomerAddress}
                  />
                </>
              )}

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>
                  Booking summary
                </Text>

                <View style={styles.summaryRow}>
                  <Text style={styles.mutedText}>
                    Service price
                  </Text>

                  <Text style={styles.summaryValue}>
                    R{selectedProfessional.price.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.mutedText}>
                    House-call fee
                  </Text>

                  <Text style={styles.summaryValue}>
                    R
                    {(houseCall
                      ? selectedProfessional.houseCallFee
                      : 0
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTitle}>
                    Total
                  </Text>

                  <Text style={styles.totalPrice}>
                    R
                    {(
                      selectedProfessional.price +
                      (houseCall
                        ? selectedProfessional.houseCallFee
                        : 0)
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>

              <Button
                title="Submit booking request"
                onPress={submitBooking}
              />

              <Button
                title="Cancel"
                secondary
                onPress={() => {
                  setSelectedProfessional(null);
                  setScreen("Discover");
                }}
              />
            </View>
          </>
        ) : (
          <>
            <SectionTitle
              title="My bookings"
              subtitle="Manage your appointment requests."
            />

            {bookings.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={{ fontSize: 45 }}>📅</Text>

                <Text style={styles.professionalName}>
                  No bookings yet
                </Text>

                <Text style={styles.mutedText}>
                  Your appointment requests will appear here.
                </Text>

                <Button
                  title="Find a professional"
                  onPress={() => setScreen("Discover")}
                />
              </View>
            ) : (
              bookings.map((booking) => (
                <View key={booking.id} style={styles.bookingCard}>
                  <Text style={styles.professionalName}>
                    {booking.professional}
                  </Text>

                  <Text style={styles.mutedText}>
                    {booking.service}
                  </Text>

                  <Text style={styles.description}>
                    📅 {booking.date}
                  </Text>

                  <Text style={styles.description}>
                    {booking.houseCall
                      ? "🏡 House call"
                      : "🏢 Visit professional"}
                  </Text>

                  <Text style={styles.price}>
                    R
                    {(
                      booking.servicePrice +
                      booking.houseCallFee
                    ).toFixed(2)}
                  </Text>

                  <Text style={styles.status}>
                    Status: {booking.status}
                  </Text>

                  {booking.status === "Pending" && (
                    <Button
                      title="Cancel request"
                      secondary
                      onPress={() =>
                        Alert.alert(
                          "Cancel booking?",
                          "Cancel this booking request?",
                          [
                            {
                              text: "Keep booking",
                              style: "cancel",
                            },
                            {
                              text: "Cancel booking",
                              style: "destructive",
                              onPress: () =>
                                updateBookingStatus(
                                  booking.id,
                                  "Cancelled"
                                ),
                            },
                          ]
                        )
                      }
                    />
                  )}
                </View>
              ))
            )}
          </>
        )}
      </View>
    </ScrollView>
  );

  // Products Screen

  const renderProducts = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <SectionTitle
          title="Beauty marketplace"
          subtitle="Explore products from beauty sellers."
        />

        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productIcon}>
              <Text style={{ fontSize: 35 }}>🛍️</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.professionalName}>
                {product.name}
              </Text>

              <Text style={styles.description}>
                {product.description}
              </Text>

              <Text style={styles.mutedText}>
                Sold by {product.seller}
              </Text>

              <Text style={styles.price}>
                R{product.price.toFixed(2)}
              </Text>

              <Button
                title="View product"
                onPress={() =>
                  Alert.alert(
                    product.name,
                    `${product.description}\n\nPrice: R${product.price.toFixed(2)}\n\nThis is a sample product. Real checkout will be added when the database and payment system are connected.`
                  )
                }
              />
            </View>
          </View>
        ))}

        <View style={styles.joinCard}>
          <Text style={styles.joinTitle}>
            Sell your beauty products
          </Text>

          <Text style={styles.description}>
            Wig sellers and beauty suppliers can use the
            marketplace to reach more customers.
          </Text>

          <Button
            title="Open professional dashboard"
            onPress={() => setScreen("Dashboard")}
          />
        </View>
      </View>
    </ScrollView>
  );

  // Dashboard Screen

   const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

  const completedCommission = completedBookings.reduce(
    (total, booking) =>
      total + calculateCommission(booking.servicePrice),
    0
  );

  const renderDashboard = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <SectionTitle
          title="Professional dashboard"
          subtitle="Manage bookings and monitor activity."
        />

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {bookings.length}
            </Text>

            <Text style={styles.mutedText}>
              Total bookings
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {pendingBookings.length}
            </Text>

            <Text style={styles.mutedText}>
              Pending
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {completedBookings.length}
            </Text>

            <Text style={styles.mutedText}>
              Completed
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              R{completedCommission.toFixed(2)}
            </Text>

            <Text style={styles.mutedText}>
              Example platform commission
            </Text>
          </View>
        </View>

        <View style={styles.joinCard}>
          <Text style={styles.joinTitle}>
            Platform commission
          </Text>

          <Text style={styles.description}>
            The prototype calculates 5% of the service price
            on completed bookings. House-call fees are
            excluded from the commission calculation.
          </Text>

          <Text style={styles.mutedText}>
            Commission is only calculated for completed
            bookings in this dashboard.
          </Text>
        </View>

        <SectionTitle
          title="Booking management"
          subtitle="Review customer requests."
        />

        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.mutedText}>
              No booking requests to manage yet.
            </Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Text style={styles.professionalName}>
                {booking.professional}
              </Text>

              <Text style={styles.description}>
                {booking.service} · {booking.date}
              </Text>

              <Text style={styles.price}>
                R
                {(
                  booking.servicePrice +
                  booking.houseCallFee
                ).toFixed(2)}
              </Text>

              <Text style={styles.status}>
                {booking.status}
              </Text>

              {booking.status === "Pending" && (
                <View style={styles.actionRow}>
                  <View style={{ flex: 1 }}>
                    <Button
                      title="Confirm"
                      onPress={() =>
                        updateBookingStatus(
                          booking.id,
                          "Confirmed"
                        )
                      }
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Button
                      title="Decline"
                      secondary
                      onPress={() =>
                        updateBookingStatus(
                          booking.id,
                          "Cancelled"
                        )
                      }
                    />
                  </View>
                </View>
              )}

              {booking.status === "Confirmed" && (
                <Button
                  title="Mark completed"
                  onPress={() =>
                    updateBookingStatus(
                      booking.id,
                      "Completed"
                    )
                  }
                />
              )}
            </View>
          ))
        )}

        <SectionTitle
          title="Business tools"
          subtitle="Tools to help grow a beauty business."
        />

        {[
          {
            icon: "💅",
            title: "Services and prices",
            description: "Manage your beauty service menu.",
          },
          {
            icon: "📆",
            title: "Availability",
            description: "Set your working days and hours.",
          },
          {
            icon: "🏡",
            title: "House calls",
            description: "Set travel options and fees.",
          },
          {
            icon: "🛍️",
            title: "Product listings",
            description: "Prepare product listings and stock.",
          },
        ].map((feature) => (
          <View key={feature.title} style={styles.toolCard}>
            <Text style={styles.toolIcon}>
              {feature.icon}
            </Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.professionalName}>
                {feature.title}
              </Text>

              <Text style={styles.mutedText}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}

        <Text style={styles.smallNote}>
          Demo dashboard: customers and professionals currently
          share the same temporary booking list. Real accounts
          and role-based access must be implemented before launch.
        </Text>
      </View>
    </ScrollView>