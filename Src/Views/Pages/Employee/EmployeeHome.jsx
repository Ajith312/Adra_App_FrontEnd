
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ProfileScreen from './ProfileScreen'
import RequestForm from './RequestForm'

const EmployeeHome = () => {
  return (
    <View style={styles.container}>
   <Text>Home Page</Text>
    </View>
  )
}

export default EmployeeHome

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4E3E3",
        width: "100%",
      }

})