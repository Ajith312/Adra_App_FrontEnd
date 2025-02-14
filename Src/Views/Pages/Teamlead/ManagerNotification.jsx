
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeRequestStatus, getLeaveAndPermissionRequest } from "../../../Redux/Action/commonAction";


const ManagerNotification = () => {
  const dispatch = useDispatch()
  const {token,managerNotificationDetails}=useSelector((state)=>state.commonState)

  useFocusEffect(
    useCallback(()=>{
      dispatch(getLeaveAndPermissionRequest(token))
     
    },[managerNotificationDetails])
  )

  const handleRequestSubmit = (value)=>{
      dispatch(changeRequestStatus(token,value))
  }



  const renderData = ({ item }) => (
    
    <View style={styles.card}>
      <Image source="" style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item?.employeeDetails?.employeeName}</Text>
        <Text style={styles.details}>{item?.employeeDetails?.empRole}</Text>
        <Text style={styles.details}>{item.requestDetails?.request}</Text>
        <Text style={styles.details}>Date: {item.requestDetails?.date}</Text>
        <Text style={item.requestDetails.fromTime ? styles.details : styles.timeHide}>
          Time: {item.requestDetails?.fromTime} to {item.requestDetails?.toTime} 
        </Text>
        <Text style={styles.details}>CL Balance:{item?.employeeDetails?.casualLeave} </Text>
        <Text style={styles.details}>
          Permission Balance: {item?.employeeDetails?.permission}
        </Text>
        <Text style={styles.details}>Leave Taken:{item?.employeeDetails?.leaveDays} </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{handleRequestSubmit({id:item._id,acceptedStatus:"approved"})}}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={()=>{handleRequestSubmit({id:item._id,acceptedStatus:"rejected"})}}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
    {managerNotificationDetails?.length > 0 ? (
      <FlatList
        data={managerNotificationDetails}
        renderItem={renderData}
        keyExtractor={(item) => item._id}
      />
    ) : (
      <View style={styles.NodataContainer}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 10, backgroundColor: "#E4E3E3" },
  card: {
   flexDirection:"row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  image: { 
    width: 80, 
    height: "100%", 
    backgroundColor:"#adb2ba"
   },

  info: { 
    marginLeft: 10, 
    flex: 1 
  },
  name: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  details: { 
    fontSize: 14, 
    marginVertical: 3, 
    color: "#666" 
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: { 
    backgroundColor: "#2ECC71", 
    padding: 10,
     borderRadius: 5 
    },
  rejectButton: { 
    backgroundColor: "#e74c3c", 
    padding: 10, 
    borderRadius: 5 },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" },
  rejectText: { 
    color: "#fff", 
    fontWeight: "bold" },
  timeHide:{
    display:"none"
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






export default ManagerNotification