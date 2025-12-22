import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MenuHeader from "./compenents/MenuHeader";
import Sidebar from "./compenents/Sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PLAN_TYPE_MAP = {
  dedicated_office: "Private Office Room",
  dedicated_desk: "Dedicated Desk",
  open_desk: "Open Desk",
  meeting_room: "Meeting Room",
};


export default function Spaces() {
  const { type } = useLocalSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type) {
      fetchPlans();
    }
  }, [type]);

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const category = PLAN_TYPE_MAP[type];
      const BASE_URL = await AsyncStorage.getItem("BASE_URL");
 
      if (!BASE_URL || !category) return;

      const response = await fetch(
        `${BASE_URL}/api/method/booking_app.booking_app.doctype.booking_plan.booking_plan.get_booking_plan?category=${category}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      const filteredPlans = (result.message || []).filter(
        (plan) => plan.plan_type === PLAN_TYPE_MAP[type]
      );

      setPlans(filteredPlans);

    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case "dedicated_desk":
        return "Dedicated Desk";
      case "open_desk":
        return "Open Desk";
      case "dedicated_office":
        return "Dedicated Office";
      case "meeting_room":
        return "Meeting Room";
      default:
        return "Available Spaces";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MenuHeader title="Booking Plans" onMenuPress={() => setShowMenu(true)} />
      <Sidebar visible={showMenu} onClose={() => setShowMenu(false)} />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{getTitle()}</Text>

        {loading && <Text>Loading plans...</Text>}

        {!loading && plans.length === 0 && (
          <Text>No plans available</Text>
        )}

        {plans.map((plan) => (
          <View key={plan.name} style={styles.card}>
            <Text style={styles.planName}>{plan.plan_name}</Text>

            <Text style={styles.planInfo}>
              Duration: {plan.duration_unit}
            </Text>

            {plan.per_day_rate > 0 && (
              <Text style={styles.price}>₹ {plan.per_day_rate} / day</Text>
            )}

            {plan.per_month_rate > 0 && (
              <Text style={styles.price}>₹ {plan.per_month_rate} / month</Text>
            )}

            <Text style={styles.seat}>
              Seats: {plan.no_of_seat}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
  },
  planInfo: {
    marginTop: 4,
    color: "#666",
  },
  price: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "500",
  },
  seat: {
    marginTop: 4,
    color: "#666",
  },
});
