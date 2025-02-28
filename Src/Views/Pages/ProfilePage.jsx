import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import Images from "../../Utils/Image";
import { useSelector } from "react-redux";
import {MaterialCommunityIcons,AntDesign,Fontisto,FontAwesome5,Ionicons} from '@expo/vector-icons';

const ProfilePage = () => {
  const { profileDetails } = useSelector((state) => state.commonState);


  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.profileCard}>
          <View style={styles.profile}>
            <View style={styles.profileImg}>
              <Image
                source={{
                  uri:profileDetails.imageUrl || "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"
                }}
                style={styles.profileImage}
              />
              
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileName}>
                {profileDetails?.employeeName}
              </Text>
              <Text style={styles.profileRole}>
                {profileDetails?.personalDetails?.empRole}
              </Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Full Name</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <Image
                  source={Images.nameIcon}
                  resizeMode="contain"
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.ProfileContent}>
                {profileDetails?.employeeName}
              </Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Email Address</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <MaterialCommunityIcons name="email-check-outline" size={24} color="#A2A2A7"  style={styles.Icon} />
              </View>
              <Text style={styles.ProfileContent}>{profileDetails?.email}</Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Joined Date</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <AntDesign name="calendar" size={24} color="#A2A2A7"  style={styles.Icon} />
              </View>
              <Text style={styles.ProfileContent}>
                {profileDetails?.personalDetails?.joinedDate}
              </Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Blood Group</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <Fontisto name="blood-drop" size={24} color="#A2A2A7" style={styles.Icon} />
              </View>
              <Text style={styles.ProfileContent}>
                {profileDetails?.personalDetails?.bloodGroup}
              </Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Birth Date</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <FontAwesome5 name="calendar-check" size={24} color="#A2A2A7"  style={styles.Icon}/>
              </View>
              <Text style={styles.ProfileContent}>
                {profileDetails?.personalDetails?.birthDate}
              </Text>
            </View>
          </View>
          <View style={styles.ProfileForm}>
            <Text style={styles.ProfileLabel}>Address</Text>
            <View style={styles.ProfileText}>
              <View style={styles.ProfileIcon}>
                <Ionicons name="home-outline" size={24} color="#A2A2A7" style={styles.Icon} />
              </View>
              <Text style={styles.ProfileContentAddress}>
                {profileDetails?.personalDetails?.address}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  profileCard: {
    borderRadius: 15,
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 2,
    borderColor: "black",
    paddingBottom: 20,
  },
  profile: {
    height: 120,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  profileImg: {
    flex: 1,
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  profileText: {
    flex: 2,
    height: "100%",
    marginLeft: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 50,
    position:"relative"
  },
  profileName: {
    fontSize: 19,
    fontWeight: "500",
    color: "#1E1E2D",
  },
  profileRole: {
    fontSize: 16,
    fontWeight: "400",
    color: "#7E848D",
  },
  ProfileForm: {
    display: "flex",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 5,
    // backgroundColor:"#fff"
  },
  ProfileLabel: {
    fontSize: 18,
    color: "#A2A2A7",
    fontWeight: "500",
  },
  ProfileText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ProfileIcon: {
    width: 30,
    height: 30,
    marginBottom: 0,
    alignSelf: "center",
    marginStart:5
  },
  ProfileContent: {
    fontSize: 17,
    fontWeight: "500",
  },
  ProfileContentAddress: {
    fontSize: 15,
    fontWeight: "500",
    flexWrap: "wrap",
     maxWidth: "92%"
  },
  Icon: {
    width: "100%",
    height: "100%",
  },
  editicon:{
    position:"absolute",
    bottom:5,
    right:25
  }
});
