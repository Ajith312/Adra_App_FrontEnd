import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import React from 'react'
import { changeRequestStatus } from "../../../Redux/Action/commonAction";
import {AntDesign} from '@expo/vector-icons';
import { useDispatch } from "react-redux";

const RequestCard = ({item}) => {
    const dispatch=useDispatch()
      const handleRequestSubmit = (value)=>{
          dispatch(changeRequestStatus(value))
      }
    
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.6}>
          <View style={styles.info}>
                  <Text style={styles.name}>{item?.employeeDetails?.employeeName}</Text>
                  <Text style={styles.details}>{item?.employeeDetails?.empRole}</Text>
                  <Text style={styles.details}><Text style={styles.detailsKey}>Request: </Text>{item.requestDetails?.request}</Text>
                  <Text style={styles.details}><Text style={styles.detailsKey}>Date: </Text>{item.requestDetails?.date}</Text>
                  <Text style={item.requestDetails.fromTime ? styles.details : styles.timeHide}>
                  <Text style={styles.detailsKey}>Time: </Text> {item.requestDetails?.fromTime} to {item.requestDetails?.toTime} 
                  </Text>
                  <Text style={styles.details}><Text style={styles.detailsKey}>Comments: </Text>{item.requestDetails?.comments}</Text>
                  <Text style={styles.details}><Text style={styles.detailsKey}>CL Balance: </Text>{item?.employeeDetails?.casualLeave} </Text>
                  <Text style={styles.details}>
                  <Text style={styles.detailsKey}>Permission Balance:  </Text>{item?.employeeDetails?.permission}
                  </Text>
                  
                  <Text style={styles.details}><Text style={styles.detailsKey}>Leave Taken: </Text>{item?.employeeDetails?.leaveDays} </Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>{handleRequestSubmit({id:item._id,acceptedStatus:"Approved"})}}>
                      <AntDesign name="check" style={styles.buttonText} />
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton} onPress={()=>{handleRequestSubmit({id:item._id,acceptedStatus:"Rejected"})}}>
                      <AntDesign name="close" style={styles.rejectText} />
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
       </TouchableOpacity>
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
    color: "#666",
    fontWeight:"bold" 
  },
  detailsKey: { 
    fontSize: 14, 
    marginVertical: 3, 
    color: "#5da68f",
    fontWeight:"bold"  
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
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center" ,
    gap:3
    },
  rejectButton: { 
    flex:1,
    backgroundColor: "#E44545", 
    padding: 10, 
    borderRadius: 5,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:3
 },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold",
    textAlign:"center",
    fontSize:18
  },
  rejectText: { 
    color: "#fff", 
    fontWeight: "bold",
    textAlign:"center",
    fontSize:18
  },
});