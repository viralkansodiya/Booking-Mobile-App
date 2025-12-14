import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = () => {
    console.log("Signup Data:", {
      firstName,
      lastName,
      email,
      phone,
    });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        {/* First Name */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Phone */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Signup Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Link href="/login" style={styles.loginLink}> Login</Link>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2F7"
  },
  card: { 
    width: "85%", 
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    elevation: 5
  },
  title: { 
    fontSize: 22, 
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center" 
  },
  input: { 
    height: 45,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff"
  },
  button: { 
    backgroundColor: "#1F74F2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10 
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18
  },
  loginText: {
    fontSize: 14,
    color: "#555"
  },
  loginLink: {
    fontSize: 14,
    color: "#1F74F2",
    fontWeight: "600"
  }
});
