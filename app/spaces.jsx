import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import MenuHeader from "./compenents/MenuHeader";
import Sidebar from "./compenents/Sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";


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

  const fetchPlans = useCallback(async () => {
    if (!type || !PLAN_TYPE_MAP[type]) return;

    try {
      setLoading(true);

      const BASE_URL = await AsyncStorage.getItem("BASE_URL");
      if (!BASE_URL) {
        console.warn("BASE_URL not found in storage");
        return;
      }

      const category = PLAN_TYPE_MAP[type];

      const response = await fetch(
        `${BASE_URL}/api/method/booking_app.booking_app.doctype.booking_plan.booking_plan.get_booking_plan?category=${encodeURIComponent(
          category
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      const plansFromApi = Array.isArray(result?.message)
        ? result.message
        : [];

      setPlans(plansFromApi);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const getTitle = () => PLAN_TYPE_MAP[type] || "Available Spaces";

  return (
    <View style={{ flex: 1 }}>
      <MenuHeader title="Booking Plans" onMenuPress={() => setShowMenu(true)} />
      <Sidebar visible={showMenu} onClose={() => setShowMenu(false)} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.title}>{getTitle()}</Text>

        {loading && (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}

        {!loading && plans.length === 0 && (
          <Text style={styles.emptyText}>No plans available</Text>
        )}

        {!loading &&
          plans.map((plan) => (
          <Pressable
            key={plan.name}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/plan-view",
                params: {
                  plan: plan.plan_name,
                },
              })
            }
          >
          <Text style={styles.planName}>{plan.plan_name}</Text>

          <Text style={styles.planInfo}>
            Duration: {plan.duration_unit}
          </Text>

          {plan.per_month_rate > 0 && (
            <Text style={styles.price}>
              ₹ {plan.per_month_rate} / month
            </Text>
          )}

          <Text style={styles.seat}>
            Seats: {plan.no_of_seat}
          </Text>
        </Pressable>
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
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
  },
});
