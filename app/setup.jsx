import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "../assets/logo.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

export default function Setup() {
  const [webUrl, setWebUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load saved data when page opens
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedURL = await AsyncStorage.getItem("BASE_URL");
        const savedUser = await AsyncStorage.getItem("USER_ID");
        const savedPassword = await AsyncStorage.getItem("USER_PASSWORD");

        if (savedURL) setWebUrl(savedURL);
        if (savedUser) setUserId(savedUser);
        if (savedPassword) setPassword(savedPassword);

        if (savedURL && savedUser && savedPassword) {
          setIsSaved(true);
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Save all data
  const saveSetupData = async () => {
    try {
      await AsyncStorage.multiSet([
        ["BASE_URL", webUrl],
        ["USER_ID", userId],
        ["USER_PASSWORD", password]
      ]);

      console.log("Setup data saved!");
      setIsSaved(true);
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image source={Icon} style={styles.logo} />

      {/* Heading */}
      <Text style={styles.heading}>Book Your Place</Text>

      {/* Form */}
      <View style={styles.card}>

        <TextInput
          placeholder="Web URL"
          style={styles.input}
          value={webUrl}
          onChangeText={(text) => {
            setWebUrl(text);
            setIsSaved(false);
          }}
        />

        <TextInput
          placeholder="User ID"
          style={styles.input}
          value={userId}
          onChangeText={(text) => {
            setUserId(text);
            setIsSaved(false);
          }}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setIsSaved(false);
          }}
        />

        {!isSaved ? (
          <TouchableOpacity style={styles.button} onPress={saveSetupData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <Link href="/login" style={styles.loginLink}>
            Go to Login →
          </Link>
        )}
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#EEF2F7"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain"
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    color: "#1F1F1F"
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    elevation: 5
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 15
  },
  button: {
    backgroundColor: "#1F74F2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600"
  },
  loginLink: {
    fontSize: 16,
    marginTop: 10,
    color: "#1F74F2",
    textAlign: "center",
    fontWeight: "600"
  }
});
