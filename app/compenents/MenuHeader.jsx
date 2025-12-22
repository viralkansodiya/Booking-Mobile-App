import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuHeader({ title, onMenuPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menu}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#1F74F2",
    flexDirection: "row",
    alignItems: "center",
  },
  menu: {
    fontSize: 26,
    color: "#fff",
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
