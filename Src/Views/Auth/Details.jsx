import { View, Text, StatusBar,StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Images from '../../Utils/Image'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const Details = () => {
  const navigation=useNavigation()
  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <View style={styles.container}>
      <View style={styles.DetailsImageContainer}>
        <View style={styles.ImageBox}>
          <Image source={Images.DetailImage} resizeMode='contain' style={styles.image} />
        </View>
      </View>
      <View style={styles.DetailsTextContainer}>
        <View style={styles.DetailsTextBox}>
          <Text style={styles.Detailstext}> Plan Your Time Off</Text>
          <Text style={styles.DetailsSubtext}>Request leave in just a few taps and stay updated.</Text>
        </View>
        <View style={styles.DetailsTextBtn}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Get Started</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  )
}

export default Details

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
        width: "100%",
        display:"flex"  
    },
    DetailsImageContainer:{
      flex:1,
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },
    DetailsTextContainer:{
      flex:1,
      backgroundColor:"#000",
      borderTopLeftRadius:35,
      borderTopRightRadius:35,
      display:"flex",
      alignItems:"center"

    },
    ImageBox:{
      height:400,
      width:"80%"
    },
    image:{
      height:"100%",
      width:"100%"
    },
    DetailsTextBox:{
      height:"70%",
      width:"80%",
     display:"flex",
     justifyContent:"center",
     alignItems:"center"
    },
    DetailsTextBtn:{
       height:"30%",
       width:"100%",
       display:"flex",
       justifyContent:"end",
       alignItems:"flex-end"
    },
    button:{
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#fff",
      padding:10,
      marginEnd:30,
      borderRadius:8
    },
    Detailstext:{
      color:"#fff",
      fontSize:24,
      fontWeight:"800",
      marginBottom:15
    },
    DetailsSubtext:{
      color:"#fff",
      fontSize:20,
      fontWeight:"400",
      textAlign:"center"
    },
    btnText:{
      fontSize:16,
      fontWeight:"bold",
      marginEnd:5
    }
})