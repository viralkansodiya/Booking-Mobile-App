import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateSelector({ label, value, onSelect, backgroundColor = "#1F74F2"}) {
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.labelInline}>{label} :</Text>

        <TouchableOpacity
            style={[
                styles.inputInline,
                { backgroundColor, borderColor: backgroundColor }
            ]}
            onPress={() => setVisible(true)}
            >


            <Text style={styles.inputTextWhite}>
            {value ? value : "Select Date"}
            </Text>
        </TouchableOpacity>
      </View>


      {/* CALENDAR MODAL */}
      <Modal transparent animationType="slide" visible={visible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.navButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() =>
                    setCurrentDate(
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        1
                    )
                    )
                }
                >
                <Text style={styles.navText}>{'‹'}</Text>
                </TouchableOpacity>


              <Text style={styles.month}>
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric"
                })}
              </Text>

              <TouchableOpacity
                style={styles.navButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() =>
                    setCurrentDate(
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        1
                    )
                    )
                }
                >
                <Text style={styles.navText}>{'›'}</Text>
                </TouchableOpacity>

            </View>

            {/* Week Days */}
            <View style={styles.weekRow}>
              {WEEK_DAYS.map(day => (
                <Text key={day} style={styles.weekText}>{day}</Text>
              ))}
            </View>

            {/* Dates */}
            <View style={styles.grid}>
              {getMonthDays().map((date, index) => {
                if (!date) {
                  return <View key={index} style={styles.empty} />;
                }

                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);

                const isPast = date < todayMidnight;

                const isSelected = value === formatDate(date);
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={isPast}
                    style={[
                      styles.dateCell,
                      isSelected && styles.selected,
                      isPast && styles.disabled
                    ]}
                    onPress={() => {
                      onSelect(formatDate(date));
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isSelected && styles.selectedText
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: { marginBottom: 5 },
  label: { marginBottom: 6, fontWeight: "600", color: "#555", alignItems: "center" },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  inputText: { fontSize: 15 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end"
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
 inputTextWhite: {
  fontSize: 16,
  color: "#000000ff",
  fontWeight: "700"
},
row: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 15,
  width: "80%"
},

labelInline: {
  fontSize: 15,
  fontWeight: "700",
  color: "#333",
  marginRight: 10,
  minWidth: 110
},

inputInline: {
  flex: 1,
  height: 48,
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 12,
  justifyContent: "center"
},

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  month: { fontSize: 18, fontWeight: "700" },
  nav: { fontSize: 26, fontWeight: "700" },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  weekText: { width: "14%", textAlign: "center", fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  empty: { width: "14%", height: 40 },
  navButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  navText: {
    fontSize: 26,
    fontWeight: "700"
  },
  dateCell: {
    width: "14%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 6
  },
  dateText: { fontSize: 15 },

  selected: { backgroundColor: "#1F74F2" },
  selectedText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.3 },

  cancelBtn: { marginTop: 10, alignItems: "center" },
  cancelText: {
    color: "#1F74F2",
    fontWeight: "600",
    fontSize: 16
  }
});
