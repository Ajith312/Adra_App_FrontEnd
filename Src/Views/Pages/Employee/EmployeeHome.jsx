import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import HistoryCard from "./HistoryCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeLeaveAndPermissionRequest,
  getProfileDetails,
} from "../../../Redux/Action/commonAction";


const EmployeeHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { employeeNotificationDetails, token, } = useSelector(
    (state) => state.commonState
  );

  useEffect(() => {
    if (!token) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Details" }],
      });
    }
  }, [token, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        dispatch(getEmployeeLeaveAndPermissionRequest);
        dispatch(getProfileDetails);
       
      }
    }, [dispatch, token])
  );

  

  const renderData = ({ item }) => <HistoryCard item={item} />;
  return (
    <View style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.HomeContainer}
          onPress={() => {
            navigation.navigate("Request Form");
          }}
        >
          <View style={styles.homeImageBox}>
            <View style={styles.homeImgText}>
              <Text style={styles.TextHead}>Time-Off Made Easy</Text>
              <Text style={styles.subText}>
                Request leave or permission hassle-free!
              </Text>
              <Feather name="arrow-right-circle" size={30} color="white" />
            </View>
            <View style={styles.homeImg}></View>
            <Image
              source={require("../../../../assets/banner.png")}
              style={styles.bannerImg}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.homeHistory}>
          <View style={styles.HistoryBox}>
            <Text style={styles.historyText}>History</Text>
            <Text
              style={styles.viewText}
              onPress={() => {
                navigation.navigate("History");
              }}
            >
              View all
            </Text>
          </View>
          <View style={styles.historyCardContainer}>
            {employeeNotificationDetails.length > 0 ? (
              <FlatList
                data={employeeNotificationDetails.slice(0, 2)}
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
        </View>
      </View>
    </View>
  );
};

export default EmployeeHome;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    width: "100%",
    padding: 15,
  },
  HomeContainer: {},
  homeImageBox: {
    height: 200,
    backgroundColor: "#000",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  homeImgText: {
    width: "60%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  homeImg: {
    width: "40%",
  },
  TextHead: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#A0A0A0",
  },
  bannerImg: {
    width: 200,
    height: 250,
    position: "absolute",
    top: 15,
    right: -20,
  },
  homeHistory: {
    width: "100%",
    marginTop: 50,
  },
  HistoryBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3C86F4",
  },
  historyCardContainer: {
    marginTop: 10,
    gap: 10,
  },
  NodataContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
  },
});
