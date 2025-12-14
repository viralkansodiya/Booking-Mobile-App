import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // -----------------------------------
  // ON PAGE LOAD
  // -----------------------------------
  useEffect(() => {
    loadSavedCredentials();
    checkSession();
  }, []);

  // -----------------------------------
  // LOAD USER ID & PASSWORD
  // -----------------------------------
  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("USER_ID");
      const savedPassword = await AsyncStorage.getItem("USER_PASSWORD");

      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);

    } catch (error) {
      console.log("Error loading credentials:", error);
    }
  };

  // -----------------------------------
  // CHECK ACTIVE SESSION
  // -----------------------------------
  

  const checkSession = async () => {
    try {
      const loggedOut = await AsyncStorage.getItem("LOGGED_OUT");

      // 🚫 User explicitly logged out → skip auto login
      if (loggedOut === "1") {
        return;
      }

      const baseURL = await AsyncStorage.getItem("BASE_URL");
      if (!baseURL) return;

      const response = await fetch(
        `${baseURL}/api/method/frappe.auth.get_logged_user`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Session check:", data);

      if (data.message && data.message !== "Guest") {
        router.replace("/booking");
      }

    } catch (error) {
      console.log("Session error:", error);
    }
  };


  const logout = async () => {
    const baseURL = await AsyncStorage.getItem("BASE_URL");

    await fetch(`${baseURL}/api/method/logout`, {
      method: "GET",
      credentials: "include",
    });

    await AsyncStorage.multiRemove([
      "USER_EMAIL",
      "USER_PASSWORD"
    ]);

    await AsyncStorage.setItem("LOGGED_OUT", "1");

    router.replace("/login");
  };



  // -----------------------------------
  // LOGIN API CALL
  // -----------------------------------
  const handleLogin = async () => {
    try {
      const baseURL = await AsyncStorage.getItem("BASE_URL");

      if (!baseURL) {
        Alert.alert("Error", "Base URL not found. Please complete setup first.");
        return;
      }

      const response = await fetch(`${baseURL}/api/method/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          usr: email,
          pwd: password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.message === "Logged In") {
        await AsyncStorage.removeItem("LOGGED_OUT");
        await AsyncStorage.setItem("USER_EMAIL", email);
        router.replace("/booking");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid login details");
      }

    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.signupLink}> Sign Up</Link>
        </View>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { width: "85%", padding: 20, backgroundColor: "#fff", borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 15 },
  button: { backgroundColor: "#1F74F2", padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  signupContainer: { flexDirection: "row", justifyContent: "center", marginTop: 18 },
  signupText: { color: "#555" },
  signupLink: { color: "#1F74F2", fontWeight: "600" }
});
