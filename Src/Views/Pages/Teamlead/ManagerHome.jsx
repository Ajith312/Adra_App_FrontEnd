import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ManagerHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Home Page</Text>
    </View>
  )
}

export default ManagerHome

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:24,
    fontWeight:"bold",
    color:"red"
  }
})