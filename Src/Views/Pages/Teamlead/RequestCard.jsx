import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import React from 'react'
import { changeRequestStatus } from "../../../Redux/Action/commonAction";
import { useDispatch, useSelector } from "react-redux";

const RequestCard = ({item}) => {
    const dispatch=useDispatch()
    const {token} = useSelector((state) => state.commonState)

      const handleRequestSubmit = (value)=>{
          dispatch(changeRequestStatus(token,value))
      }
    
  return (
    <View style={styles.card}>
          <View style={styles.info}>
                  <Text style={styles.name}>{item?.employeeDetails?.employeeName}</Text>
                  <Text style={styles.details}>{item?.employeeDetails?.empRole}</Text>
                  <Text style={styles.details}>{item.requestDetails?.request} Request</Text>
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
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton} onPress={()=>{handleRequestSubmit({id:item._id,acceptedStatus:"rejected"})}}>
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
       </View>
  )
}

export default RequestCard

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 15,
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
  info: { 
    padding:10,
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
  timeHide:{
    display:"none"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    gap:10
  },
  button: { 
    flex:1,
    backgroundColor: "#37A457", 
    padding: 10,
     borderRadius: 5,
     textAlign:"center" 
    },
  rejectButton: { 
    flex:1,
    backgroundColor: "#E44545", 
    padding: 10, 
    borderRadius: 5,
    textAlign:"center" 
 },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" },
  rejectText: { 
    color: "#fff", 
    fontWeight: "bold" },
});