import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [fullName, setFullName] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`.trim());
  }, [firstName, lastName]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRegistrationDate(today);
  }, []);

  const validateForm = () => {
    if (!firstName.trim()) {
      Alert.alert("Validation Error", "First Name is required");
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert("Validation Error", "Last Name is required");
      return false;
    }
    if (!emailId.trim()) {
      Alert.alert("Validation Error", "Email ID is required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(emailId)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return false;
    }
    if (!phoneNo.trim()) {
      Alert.alert("Validation Error", "Phone Number is required");
      return false;
    }
    if (phoneNo.length !== 10) {
      Alert.alert("Validation Error", "Phone Number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateForm()) return;

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      company_name: companyName.trim() || null,
      gstin: gstin.trim() || null,
      email_id: emailId.trim(),
      phone_no: phoneNo.trim(),
    };

    console.log("Signup Payload:", payload);

    // 🔗 Call Frappe API here
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Company Name (Optional)" value={companyName} onChangeText={setCompanyName} />
        <TextInput style={styles.input} placeholder="GSTIN (Optional)" value={gstin} onChangeText={setGstin} autoCapitalize="characters" />
        <TextInput style={styles.input} placeholder="Email ID" value={emailId} onChangeText={setEmailId} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Phone Number" value={phoneNo} onChangeText={setPhoneNo} keyboardType="phone-pad" maxLength={10} />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Link href="/login" style={styles.loginLink}> Login</Link>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create(
  { 
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEF2F7"},
    card: { width: "85%", backgroundColor: "#fff", padding: 25, borderRadius: 12, elevation: 5},
    title: { fontSize: 22, fontWeight: "600", marginBottom: 20, textAlign: "center"},
    input: { height: 45, borderWidth: 1, borderColor: "#DADADA", borderRadius: 8, paddingHorizontal: 12, marginBottom: 15, backgroundColor: "#fff"},
    button: { backgroundColor: "#1F74F2", paddingVertical: 12, borderRadius: 8, marginTop: 10},
    buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600"},
    loginContainer: { flexDirection: "row", justifyContent: "center", marginTop: 18},
    loginText: { fontSize: 14, color: "#555"},
    loginLink: { fontSize: 14, color: "#1F74F2", fontWeight: "600"
  }
}
);