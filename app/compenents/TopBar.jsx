import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopBar({ title = "My App" }) {

  const handleLogout = async () => {
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

      router.replace("/");
    } catch (err) {
      console.log("Logout error:", err);
      router.replace("/");
    }
  };

  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.logout]}
          onPress={handleLogout}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop:50,
    backgroundColor: "#1F74F2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 10,
    backgroundColor: "#ffffff33",
    borderRadius: 6,
  },
  logout: {
    backgroundColor: "#ff4d4d",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
