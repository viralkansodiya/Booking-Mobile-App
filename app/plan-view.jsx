import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlanView() {
  const { plan } = useLocalSearchParams();

  const [plan_doc, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [baseURI, setbaseuri] = useState(null);

  useEffect(() => {
    fetchPlanDetails();
  }, []);

  const fetchPlanDetails = async () => {
    try {
      const BASE_URL = await AsyncStorage.getItem("BASE_URL");
      setbaseuri(BASE_URL)
      if (!BASE_URL || !plan) return;

      const response = await fetch(
        `${BASE_URL}/api/method/booking_app.booking_app.doctype.booking_plan.booking_plan.get_plan_details?plan=${encodeURIComponent(
          plan
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
      setPlan(result?.message?.[0] || null);
    } catch (error) {
      console.error("Plan API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.center}>
        <Text>No plan found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image */}
        <Image
          source={{
            uri:
              
              `${baseURI}/${plan_doc.image}`,
          }}
          style={styles.image}
        />
 
        {/* Title */}
        <Text style={styles.title}>{plan_doc.plan_name}</Text>

        {/* Details */}
        <View style={styles.card}>
          <Detail label="Plan Type" value={plan_doc.plan_type} />
          <Detail label="Duration" value={plan_doc.duration_unit} />
          <Detail label="Seats" value={plan_doc.no_of_seat} />
          <Detail label="Status" value={plan_doc.status} />

          {plan_doc.per_day_rate > 0 && (
            <Detail label="Per Day" value={`₹ ${plan_doc.per_day_rate}`} />
          )}

          {plan_doc.per_month_rate > 0 && (
            <Detail label="Per Month" value={`₹ ${plan_doc.per_month_rate}`} />
          )}

          {plan_doc.per_year_rate > 0 && (
            <Detail label="Per Year" value={`₹ ${plan_doc.per_year_rate}`} />
          )}
        </View>
      </ScrollView>

      {/* Book Now */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            router.push({
              pathname: "/booking",
              params: {
                plan_name: plan_doc.plan_name,
              },
            })
          }
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    margin: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#666",
  },
  value: {
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom:20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  bookButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
