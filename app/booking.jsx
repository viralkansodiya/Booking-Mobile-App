import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateSelector from './date-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingTypeSelector from "./booking-type-selector";
import Sidebar from "./compenents/Sidebar";
import MenuHeader from "./compenents/MenuHeader";


export default function Booking() {
  const [selectedOption, setSelectedOption] = useState("seat");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [baseURL, setBaseURL] = useState("");
  const [showMenu, setShowMenu] = useState(false);



  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const baseURL = await AsyncStorage.getItem("BASE_URL");

      const response = await fetch(
        `${baseURL}/api/method/booking_app.booking_app.doctype.booking.booking.get_meeting_rooms`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include", 
        }
      );
      console.log(data)
      const data = await response.json();
      setRooms(data.message || []);
    } catch (err) {
      console.log("Room API error", err);
    } finally {
      setLoadingRooms(false);
    }
  };  

  const fetchSeats = async () => {
    try {
      setLoadingSeats(true);

      const baseURL = await AsyncStorage.getItem("BASE_URL");

      const response = await fetch(
        `${baseURL}/api/method/booking_app.booking_app.doctype.booking.booking.get_all_seats`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include", // important for frappe session
        }
      );

      const data = await response.json();

      console.log("API DATA 👉", data);

      // Frappe returns data inside "message"
      setSeats(data.message || []);

    } catch (error) {
      console.log("Seat API error:", error);
    } finally {
      setLoadingSeats(false);
    }
  };
  
  // 3️⃣ useEffect (HERE 👇)
  useEffect(() => {
    if (selectedOption === "seat") fetchSeats();
    if (selectedOption === "room") fetchRooms();
    AsyncStorage.getItem("BASE_URL").then(url => {
      setBaseURL(url);
    });
  }, [selectedOption]);

  return (
      <View style={{ flex: 1 }}>
      <MenuHeader title="Booking Plans" onMenuPress={() => setShowMenu(true)} />

      <Sidebar visible={showMenu} onClose={() => setShowMenu(false)} />
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Book Your Place</Text>
      <DateSelector
        label="From Date"
        value={fromDate}
        backgroundColor="#ffe900"
        onSelect={(selectedDate) => {
          setFromDate(selectedDate);
          setToDate(null);          // reset to-date if from-date changes
          setSelectedOption(null);  // reset selection
        }}
      />

      {fromDate && (
        <DateSelector
          label="To Date"
          value={toDate}
          backgroundColor="#ffe900"
          onSelect={(selectedDate) => {
            setToDate(selectedDate);
            setSelectedOption(null);
          }}
        />
      )}
      {/* Dropdown */}
      {fromDate && toDate && (
        <BookingTypeSelector
          value={selectedOption}
          onChange={setSelectedOption}
          seats={seats}
          rooms={rooms}
          baseURL={baseURL}   // ✅ pass once
          loadingSeats={loadingSeats}
          loadingRooms={loadingRooms}
        />

      )}

    </View>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20
  },
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
    marginHorizontal:20,
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
    color: "#000000ff"
  },
  pickerContainer: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 20,
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
    alignItems: "center",
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
    fontWeight: "600",
  }
});