import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import MenuHeader from "./compenents/MenuHeader"
import Sidebar from "./compenents/Sidebar";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  
  const navigateTo = (type) => {
    router.push(`/spaces?type=${type}`);
  };


  return (
    <View style={styles.container}>
      <MenuHeader title="Booking Plans" onMenuPress={() => setShowMenu(true)} />
      
      <Sidebar visible={showMenu} onClose={() => setShowMenu(false)} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FOSSERP</Text>
        <Text style={styles.headerSubTitle}>Co-Working Space</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.sectionTitle}>Book Your Space</Text>

        {/* Options Grid */}
        <View style={styles.grid}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigateTo("dedicated_office")}
          >
            <Text style={styles.cardIcon}>🏢</Text>
            <Text style={styles.cardText}>Dedicated Office</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigateTo("dedicated_desk")}
          >
            <Text style={styles.cardIcon}>🪑</Text>
            <Text style={styles.cardText}>Dedicated Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigateTo("open_desk")}
          >
            <Text style={styles.cardIcon}>💻</Text>
            <Text style={styles.cardText}>Open Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigateTo("meeting_room")}
          >
            <Text style={styles.cardIcon}>👥</Text>
            <Text style={styles.cardText}>Meeting Room</Text>
          </TouchableOpacity>

        </View>

        {/* Extra Options */}
        <Text style={styles.sectionTitle}>More</Text>

        <View style={styles.grid}>

          <TouchableOpacity
            style={styles.cardSecondary}
            onPress={() => router.push("/pricing")}
          >
            <Text style={styles.cardIcon}>💰</Text>
            <Text style={styles.cardText}>Pricing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardSecondary}
            onPress={() => router.push("/facilities")}
          >
            <Text style={styles.cardIcon}>📶</Text>
            <Text style={styles.cardText}>Facilities</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardSecondary}
            onPress={() => router.push("/my-bookings")}
          >
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardText}>My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardSecondary}
            onPress={() => router.push("/contact")}
          >
            <Text style={styles.cardIcon}>📍</Text>
            <Text style={styles.cardText}>Contact Us</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA"
  },
  header: {
    backgroundColor: "#ffea00ff",
    paddingVertical: 20,
    alignItems: "center"
  },
  headerTitle: {
    color: "#000000ff",
    fontSize: 22,
    fontWeight: "700"
  },
  headerSubTitle: {
    color: "#000000ff",
    fontSize: 14,
    marginTop: 4
  },
  content: {
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 25,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 4
  },
  cardSecondary: {
    width: "48%",
    backgroundColor: "#EEF2FF",
    paddingVertical: 22,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15
  },
  cardIcon: {
    fontSize: 30,
    marginBottom: 10
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center"
  }
});
