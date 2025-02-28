import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeLeaveAndPermissionRequest,
  getLeaveAndPermissionRequest,
  getProfileDetails,
  getTeamMembersDetails,
} from "../../../Redux/Action/commonAction";
import HistoryCard from "../Employee/HistoryCard";
import Images from "../../../Utils/Image";

const ManagerHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    employeeNotificationDetails,
    token,
    teamMembersDetails,
    managerNotificationDetails,
    notificationTrigger,
  } = useSelector((state) => state.commonState);

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
        dispatch(getTeamMembersDetails);
        dispatch(getLeaveAndPermissionRequest);
      }
    }, [dispatch, notificationTrigger])
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.HomeContainer}
          onPress={() => navigation.navigate("Request Form")}
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

        <View style={styles.homeCardContainer}>
          <TouchableOpacity
            style={styles.homeCardMember}
            onPress={() => navigation.navigate("My Teams")}
          >
            <Text style={styles.cardHeading}>Team Members</Text>
            <Text style={styles.cardValue}>
              {teamMembersDetails?.length < 10
                ? `0${teamMembersDetails.length}`
                : teamMembersDetails.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeCardRequest}
            onPress={() => navigation.navigate("Requests")}
          >
            <Text style={styles.cardHeading}>New Requests</Text>
            <Text style={styles.cardValue}>
              {managerNotificationDetails?.length < 10
                ? `0${managerNotificationDetails.length}`
                : managerNotificationDetails.length}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.homeHistory}>
          <View style={styles.HistoryBox}>
            <Text style={styles.historyText}>History</Text>
            <Text
              style={styles.viewText}
              onPress={() => navigation.navigate("History")}
            >
              View all
            </Text>
          </View>

          <View style={styles.historyCardContainer}>
            {employeeNotificationDetails.length > 0 ? (
              employeeNotificationDetails
                .slice(0, 2)
                .map((item) => <HistoryCard key={item._id} item={item} />)
            ) : (
              <View style={styles.NodataContainer}>
                <Text style={styles.noDataText}>No Data Found</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManagerHome;

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
  HomeContainer: {
    marginBottom: 20,
  },
  homeImageBox: {
    height: 200,
    backgroundColor: "#000",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  homeImgText: {
    width: "60%",
    justifyContent: "space-evenly",
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
  homeCardContainer: {
    height: 100,
    width: "100%",
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  homeCardMember: {
    flex: 1,
    height: "100%",
    padding: 10,
    gap: 15,
    backgroundColor: "#47A592",
    borderRadius: 10,
  },
  homeCardRequest: {
    flex: 1,
    height: "100%",
    padding: 10,
    gap: 15,
    backgroundColor: "#E2911E",
    borderRadius: 10,
  },

  homeHistory: {
    width: "100%",
    display: "flex",
  },
  HistoryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
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
  cardValue: {
    color: "#1C1C1C",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardHeading: {
    color: "#3A3A3A",
    fontSize: 16,
    fontWeight: "500",
  },
});
