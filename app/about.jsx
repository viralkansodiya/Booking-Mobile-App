import { StyleSheet, Button, View } from 'react-native'
import React from 'react'

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          title="About Us"
          onPress={() => console.log("Clicked About Us")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonWrapper: {
    marginTop: 50,
    width: 200   // optional, gives better UI
  }
})
