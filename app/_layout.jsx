import { Stack, router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const baseURL = await AsyncStorage.getItem("BASE_URL");
      const userId = await AsyncStorage.getItem("USER_ID");

      // Public routes
      if (pathname === "/login" || pathname === "/signup") {
        setChecking(false);
        return;
      }

      if (!baseURL || !userId) {
        router.replace("/login");
        return;
      }

      const response = await fetch(
        `${baseURL}/api/method/frappe.auth.get_logged_user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.message && data.message !== "Guest") {
        setChecking(false);
      } else {
        await AsyncStorage.removeItem("USER_ID");
        router.replace("/login");
      }

    } catch (err) {
      await AsyncStorage.removeItem("USER_ID");
      router.replace("/login");
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
