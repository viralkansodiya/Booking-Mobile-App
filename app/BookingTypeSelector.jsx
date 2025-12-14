import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function BookingTypeSelector({
  value,
  onChange,
  seats = [],
  rooms = [],
  baseURL,
  loadingSeats,
  loadingRooms
}) {

    return (
    <>
      <Text style={styles.sectionTitle}>Select Type</Text>

      {/* TYPE BUTTONS */}
      <View style={styles.optionRow}>
        <TouchableOpacity
          style={[
            styles.optionBtn,
            value === "seat" && styles.activeOption
          ]}
          onPress={() => onChange("seat")}
        >
          <Text
            style={[
              styles.optionText,
              value === "seat" && styles.activeText
            ]}
          >
            Seat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionBtn,
            value === "room" && styles.activeOption
          ]}
          onPress={() => onChange("room")}
        >
          <Text
            style={[
              styles.optionText,
              value === "room" && styles.activeText
            ]}
          >
            Meeting Room
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEATS */}
      {value === "seat" && (
        <View style={styles.grid}>
          {loadingSeats && <Text>Loading seats...</Text>}

          {!loadingSeats && seats.length === 0 && (
            <Text>No seats available</Text>
          )}

          {!loadingSeats &&
            seats.map((item, index) => (
              <TouchableOpacity key={index} style={styles.box}>
                <Text style={styles.boxText}>{item}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}

      {/* ROOMS */}
      {value === "room" && (
        <View style={styles.roomList}>
          {loadingRooms && <Text>Loading rooms...</Text>}

          {!loadingRooms && rooms.length === 0 && (
            <Text>No rooms available</Text>
          )}

          {!loadingRooms &&
            rooms.map((room, index) => {
              const imageUrl = room.image
                ? `${baseURL}${room.image}`
                : null;

              return (
                <TouchableOpacity key={index} style={styles.roomCard}>
                  {imageUrl && (
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.roomImage}
                      resizeMode="cover"
                    />
                  )}

                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>
                      {room.room_name}
                    </Text>
                    <Text>📍 {room.location}</Text>
                    <Text>👥 Capacity: {room.capacity}</Text>
                    <Text style={styles.roomRate}>
                      ₹ {room.rate_per_hour} / hour
                    </Text>
                    {room.description && (
                      <Text style={styles.roomDesc}>
                        {room.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600"
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionBtn: {
    width: "40%",
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center"
  },
  activeOption: {
    backgroundColor: "#1F74F2",
    borderColor: "#1F74F2"
  },
  optionText: {
    fontWeight: "600",
    color: "#000"
  },
  activeText: {
    color: "#fff"
  },
  grid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  box: {
    width: "30%",
    height: 80,
    backgroundColor: "#1F74F2",
    margin: "1.5%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  roomBox: {
    width: "48%",
    height: 100,
    backgroundColor: "#2A9D8F",
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  roomList: {
  marginTop: 20,
  width: "100%"
},
roomCard: {
  backgroundColor: "#fff",
  borderRadius: 14,
  marginBottom: 15,
  overflow: "hidden",
  elevation: 3
},
roomImage: {
  width: "100%",
  height: 160,
  backgroundColor: "#eee"
},
roomInfo: {
  padding: 14
},
roomName: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 6
},
roomText: {
  fontSize: 14,
  color: "#555",
  marginBottom: 4
},
roomRate: {
  marginTop: 6,
  fontSize: 16,
  fontWeight: "700",
  color: "#1F74F2"
},
roomDesc: {
  marginTop: 6,
  fontSize: 13,
  color: "#666"
}

});
