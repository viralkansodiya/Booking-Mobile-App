import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import Icon from "../assets/logo.png";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.img} />

      {/* Navigation to Login Page */}
      <Link href="/login" style={styles.link}>
        Go to Login
      </Link>
      
      <Link href="/setup" style={styles.link}>
        Setup with Webserver
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  img: {
    width: "50%",
    height: "50%"
  },
  link: {
    marginTop: 20,
    fontSize: 18,
    color: "blue"
  }
});
