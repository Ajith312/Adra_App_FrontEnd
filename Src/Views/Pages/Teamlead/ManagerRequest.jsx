import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getLeaveAndPermissionRequest } from "../../../Redux/Action/commonAction";
import RequestCard from './RequestCard';

const ManagerRequest = () => {
  const dispatch = useDispatch()
  const {token,managerNotificationDetails}=useSelector((state)=>state.commonState)

  useFocusEffect(
    useCallback(()=>{
      dispatch(getLeaveAndPermissionRequest(token))
     
    },[managerNotificationDetails])
  )

  const renderData = ({ item }) => <RequestCard item={item} />
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
   
  )
}

export default ManagerRequest

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: "#E4E3E3" 
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
})