import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sidebar from "./compenents/Sidebar";
import MenuHeader from "./compenents/MenuHeader";

export default function BookingPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseURL, setBaseURL] = useState("");
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const url = await AsyncStorage.getItem("BASE_URL");
    setBaseURL(url);
    fetchPlans(url);
  };

  const fetchPlans = async (url) => {
    try {
        const response = await fetch(
        `${url}/api/method/booking_app.booking_app.doctype.booking_plan.booking_plan.get_booking_plan`,
        {
            method: "GET",
            headers: {
            Accept: "application/json",
            },
            credentials: "include", // REQUIRED for frappe session
        }
        );

        console.log("STATUS 👉", response.status);
        console.log("OK 👉", response.ok);

        const text = await response.text();
        console.log("RAW RESPONSE 👉", text);

        const data = JSON.parse(text); // safely parse
        console.log("PARSED DATA 👉", data);

        setPlans(data.message || []);
    } catch (err) {
        console.log("Plan API error", err);
    } finally {
        setLoading(false);
    }
  };  


  const getPrice = (item) => {
    if (item.duration_unit === "Day") return `₹${item.per_day_rate}/day`;
    if (item.duration_unit === "Month") return `₹${item.per_month_rate}/month`;
    if (item.duration_unit === "Year") return `₹${item.per_year_rate}/year`;
    return "N/A";
  };

  const renderItem = ({ item }) => {
    if (item.status !== "Active") return null;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: `${baseURL}${item.image}` }}
          style={styles.image}
        />

        <Text style={styles.planName}>{item.plan_name}</Text>

        <Text style={styles.meta}>
          {item.plan_type} • {item.duration_unit}
        </Text>

        <Text style={styles.price}>{getPrice(item)}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Select Plan</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1F74F2" />
        <Text>Loading plans...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1}}>
      <MenuHeader title="Booking Plans" onMenuPress={() => setShowMenu(true)} />

      <Sidebar visible={showMenu} onClose={() => setShowMenu(false)} />
      <View style={{ flex: 1, backgroundColor: "#F6F8FA" }}>

        {/* 📄 Page Content (WITH padding) */}
        <View style={styles.container}>
        <Text style={styles.title}>Choose Your Plan</Text>

        <FlatList
            data={plans}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
        />
        </View>

    </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F8FA"
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    elevation: 3
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8
  },
  planName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4
  },
  meta: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F74F2",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#1F74F2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  }
});
