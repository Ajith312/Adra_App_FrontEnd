import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getEmployeeLeaveAndPermissionRequest } from "../../../Redux/Action/commonAction";

const EmployeeNotification = () => {
  const { employeeNotificationDetails, token } = useSelector(
    (state) => state.commonState
  );
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getEmployeeLeaveAndPermissionRequest(token));
    }, [dispatch, token])
  );

  const renderData = ({ item }) => (
    <>
      <View style={styles.card}>
        <Image source="" style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.details}>
            Request:{item?.requestDetails?.request}
          </Text>
          <Text style={styles.details}>Date: {item?.requestDetails?.date}</Text>
          <Text style={styles.details}>
            Time: {item?.requestDetails?.fromTime} to{" "}
            {item?.requestDetails?.toTime}
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={
                item?.status == "pending" ? styles.pendingButton :
                item?.acceptedStatus === "approved"
                  ? styles.button
                  : styles.rejectButton
              }
            >
              <Text style={styles.buttonText}>
                {
                  item?.status == "pending" ? "Pending" : item?.acceptedStatus
                }
                
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.Container}>
      <View style={styles.LeaveDetails}>
        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>CL Balance</Text>
            <Text style={styles.textHead}>
              {employeeNotificationDetails[0]?.employeeDetails?.casualLeave}
            </Text>
          </View>
        </View>

        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>Leave Taken</Text>
            <Text style={styles.textHead}>
              {employeeNotificationDetails[0]?.employeeDetails?.leaveDays}
            </Text>
          </View>
        </View>

        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>Permission</Text>
            <Text style={styles.textHead}>
              {employeeNotificationDetails[0]?.employeeDetails?.permission}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.DetailsContainer}>
        {employeeNotificationDetails.length > 0 ? (
          <>
            <FlatList
              data={employeeNotificationDetails}
              renderItem={renderData}
              keyExtractor={(item) => item._id}
            />
          </>
        ) : (
          <View style={styles.NodataContainer}>
            <Text style={styles.noDataText}>No Data Found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EmployeeNotification;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  LeaveDetails: {
    height: 75,
    display: "flex",
    flexDirection: "row",
  },
  leaveCard: {
    flex: 1,
    padding: 7,
    height: "100%",
  },
  leaveBox: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: "100%",
    backgroundColor: "#adb2ba",
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    marginVertical: 3,
    color: "#666",
  },
  btnContainer: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2ECC71",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  rejectButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  pendingButton:{
    backgroundColor: "#ebeb34",
    padding: 10,
    borderRadius: 5,

  },
  rejectText: { color: "#fff", fontWeight: "bold" },

  statusBox: {
    position: "absolute",
    width: 80,
    height: 30,
    backgroundColor: "aqua",
    top: 0,
    right: 5,
  },
  statusText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  DetailsContainer: {
    flex: 1,
    padding: 10,
  },
  NodataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
});
