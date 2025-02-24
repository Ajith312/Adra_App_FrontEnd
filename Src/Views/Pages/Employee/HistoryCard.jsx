import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import React from "react";

const HistoryCard = ({ item }) => {
  return (
    <TouchableOpacity style={[
        styles.card,
        {
            borderLeftColor:
            item?.acceptedStatus === "approved"
              ? "#1EAA7E"
              : item?.acceptedStatus === "rejected"
              ? "#C84848"
              : item?.acceptedStatus === "pending"
              ? "#E2911E"
              : "#E2911E",
        },
      ]}>
      <View style={styles.permissionBox}>
        <Text style={styles.typeText}>{item?.requestDetails?.request}</Text>
        <Text
          style={[
            styles.statusText,
            {
              color:
                item?.acceptedStatus === "approved"
                  ? "#1EAA7E"
                  : item?.acceptedStatus === "rejected"
                  ? "#C84848"
                  : item?.acceptedStatus === "pending"
                  ? "#E2911E"
                  : "#E2911E",
            },
          ]}
        >
          {item?.acceptedStatus}
        </Text>
      </View>
      <View style={styles.timeBox}>
        <Text>{item?.requestDetails?.date}</Text>
      </View>
      <Text>
        {item?.requestDetails?.request == "permission" ? (
          <Text>
            {item?.requestDetails?.fromTime} to {item?.requestDetails?.toTime}
          </Text>
        ) : (
          <Text>{item?.requestDetails?.days}Days</Text>
        )}
      </Text>
      <Text>{item?.requestDetails?.comments}</Text>
    </TouchableOpacity>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderLeftWidth: 5,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  permissionBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeBox: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusText: {
    fontSize: 14,
    // color: "#E2911E",
    fontWeight: "500",
  },
});
