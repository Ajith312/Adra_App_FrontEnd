import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import React from "react";
import LogoImg from "../../../assets/adraLogo.png";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();

  return (

    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <View style={styles.container}>
      <View style={styles.fgPWdContainer}>
        <View>
          <Image source={LogoImg} />
        </View>
        <View style={styles.fgBox}>
          <View>
            <TextInput style={styles.input} placeholder="Email" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.forgetpwdText}>Login Page</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            >
              <View style={styles.FgBtn}>
                <Text style={styles.btntext}>Forgot Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View></>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E3E3",
    width: "100%",
    paddingHorizontal: 10,
  },
  fgPWdContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fgBox: {
    padding: 15,
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#777",
    borderRadius: 7,
    height: 50,
    paddingHorizontal: 10,
  },
  FgBtn: {
    marginVertical: 20,
    width: "100%",
    height: 50,
    borderRadius: 7,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  forgetpwdText: {
    alignSelf: "flex-end",
    marginTop: 10,
    fontWeight: "bold",
  },
});
