import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import React from "react";

const HistoryCard = ({ item }) => {
  return (
    <TouchableOpacity style={[
        styles.card,
        {
            borderLeftColor:
            item?.acceptedStatus === "Approved"
              ? "#1EAA7E"
              : item?.acceptedStatus === "Rejected"
              ? "#C84848"
              : item?.acceptedStatus === "Pending"
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
                item?.acceptedStatus === "Approved"
                  ? "#1EAA7E"
                  : item?.acceptedStatus === "Rejected"
                  ? "#C84848"
                  : item?.acceptedStatus === "Pending"
                  ? "#E2911E"
                  : "#E2911E",
            },
          ]}
        >
          {item?.acceptedStatus}
        </Text>
      </View>
      <View style={styles.timeBox}>
        <Text><Text style={styles.detailsKey}>Date: </Text>{item?.requestDetails?.date}</Text>
      </View>
      <Text>
        {item?.requestDetails?.request == "Permission" ? (
          <Text>
            <Text style={styles.detailsKey}>Time: </Text>{item?.requestDetails?.fromTime} to {item?.requestDetails?.toTime}
          </Text>
        ) : (
          <Text><Text style={styles.detailsKey}>Days: </Text>{item?.requestDetails?.days} Days</Text>
        )}
      </Text>
      <Text><Text style={styles.detailsKey}>Comments: </Text>{item?.requestDetails?.comments}</Text>
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
    fontSize: 18,
    fontWeight: "700",
  },
  statusText: {
    fontSize: 16,
    // color: "#E2911E",
    fontWeight: "700",
  },
  detailsKey: { 
    fontSize: 14, 
    marginVertical: 3, 
    color: "#3b8287",
    fontWeight:"bold"  
  },
});
