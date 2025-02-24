import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Images from "../../../Utils/Image";

const TeamCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.ImgContainer}>
        <View style={styles.CardImage}>
        <Image
           source={Images.prakash}
           style={styles.cardimg}
         resizeMode="contain"
         />
        </View>
        <View style={styles.CardName}>
            <Text style={styles.nameText}>{item?.employeeName}</Text>
            <Text style={styles.desginationText}>{item?.personalDetails?.empRole}</Text>
        </View>
      </View>
      <View style={styles.DetailsContainer}>
        <View style={styles.details}>
          <Text style={styles.detailsName}>Email Id :</Text>
          <Text style={styles.detailsValue}>{item?.email}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsName}>Phone Number :</Text>
          <Text style={styles.detailsValue}>{item?.phoneNumber}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsName}>Leave Taken :</Text>
          <Text style={styles.detailsValue}>{item?.leaveDays}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsName}>Permission Taken :</Text>
          <Text style={styles.detailsValue}>{item?.permission}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    marginBottom: 15,
  },
  ImgContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    gap:10
  },
  DetailsContainer: {
    height: "auto",
  },
  CardName: {
    flex: 2,
  },

  CardImage: {
    flex: 1,
    height: "100%",
    // backgroundColor:"#989898"
  },
  cardimg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  CardContent: {
    width: "55%",
    padding: 10,
    gap: 8,
  },
  detailsName: {
    color: "#A2A2A7",
    fontSize: 18,
    fontWeight: "500",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"start",
    alignItems:"center",
    gap: 8,
  },
  detailsValue: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  nameText:{
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },
  desginationText:{
    color: "#A2A2A7",
    fontSize: 18,
    fontWeight: "600",
  }
});
