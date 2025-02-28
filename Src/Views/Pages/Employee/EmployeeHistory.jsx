import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import HistoryCard from "./HistoryCard";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeaveAndPermissionRequest } from "../../../Redux/Action/commonAction";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { updateFilteredData } from "../../../Redux/Slice/commonSlice";

const EmployeeHistory = () => {
  const dispatch = useDispatch();
  const { employeeNotificationDetails, profileDetails, filteredData } =
    useSelector((state) => state.commonState);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(getEmployeeLeaveAndPermissionRequest);
    }, [dispatch])
  );

  useEffect(() => {
    dispatch(updateFilteredData(employeeNotificationDetails || []))
  }, [employeeNotificationDetails]);
  

  const handleFilterHistory = (value) => {
    if (value === "all") {
      dispatch(updateFilteredData(employeeNotificationDetails));
    } else {
      const filteredDetails = employeeNotificationDetails.filter(
        (item) => item.acceptedStatus === value
      );
      dispatch(updateFilteredData(filteredDetails));
    }
    setModalVisible(false);
  };

  const renderData = ({ item }) => <HistoryCard item={item} />;

  return (
    <View style={styles.historyContainer}>
      <View style={styles.LeaveDetails}>
        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>CL Balance</Text>
            <Text style={styles.textdata}>{profileDetails?.casualLeave}</Text>
          </View>
        </View>

        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>Leave Taken</Text>
            <Text style={styles.textdata}>{profileDetails?.leaveDays}</Text>
          </View>
        </View>

        <View style={styles.leaveCard}>
          <View style={styles.leaveBox}>
            <Text style={styles.textHead}>Permission</Text>
            <Text style={styles.textdata}>{profileDetails?.permission}</Text>
          </View>
        </View>
      </View>

      <View style={styles.historyCardContainer}>
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ marginBottom: 15 }}
          />
        ) : (
          <View style={styles.NodataContainer}>
            <Text style={styles.noDataText}>No Data Found</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.filterIconBox}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="filter-outline" size={32} color="black" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1}>
          <View style={styles.modalContainer}>
            <View style={styles.modelHeader}>
              <Text style={styles.modalTextHead}>Filter</Text>
              <Ionicons
                name="close"
                size={30}
                color="black"
                onPress={() => setModalVisible(false)}
              />
            </View>

            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => handleFilterHistory("all")}
            >
              <Text style={styles.modalText}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                handleFilterHistory("Approved");
              }}
            >
              <Text style={styles.modalText}>Approved</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                handleFilterHistory("Pending");
              }}
            >
              <Text style={styles.modalText}>Pending</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                handleFilterHistory("Rejected");
              }}
            >
              <Text style={styles.modalText}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default EmployeeHistory;

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  LeaveDetails: {
    height: 75,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textHead: {
    fontSize: 14,
    color: "#9F9F9F",
  },
  textdata: {
    fontSize: 18,
    fontWeight: "bold",
  },
  historyCardContainer: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  NodataContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#9F9F9F",
  },
  filterIconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#F2F2F2",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    width: 200,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 130,
    right: 20,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#989898",
  },
  modalTextHead: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modelHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
});
