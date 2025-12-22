import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Sidebar({ visible, onClose }) {
  if (!visible) return null;

  const logout = async () => {
    try {
      const baseURL = await AsyncStorage.getItem("BASE_URL");

      if (baseURL) {
        await fetch(`${baseURL}/api/method/logout`, {
          method: "GET",
          credentials: "include",
        });
      }

      await AsyncStorage.multiRemove([
        "USER_EMAIL",
        "USER_PASSWORD",
      ]);

      await AsyncStorage.setItem("LOGGED_OUT", "1");

      router.replace("/login");
    } catch (e) {
      router.replace("/");
    }
  };

  const MenuItem = ({ title, route, action }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onClose();
        action ? action() : router.push(route);
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.sidebar}>
        <Text style={styles.heading}>Menu</Text>

        <MenuItem title="Home" route="/" />
        <MenuItem title="Current Booking Plan" route="/booking" />
        <MenuItem title="Booking History" route="/about" />
        <MenuItem title="Available Plan" route="/BookingPlan" />
        <MenuItem title="New Registration" route="/signup" />
        <MenuItem title="Logout" action={logout} />
        <MenuItem title="APP Configration" route="/setup" />
      </View>

      {/* Click outside to close */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 999,
  },
  sidebar: {
    width: 260,
    backgroundColor: "#1F74F2",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff33",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
