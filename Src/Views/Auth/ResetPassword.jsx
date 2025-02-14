import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LogoImg from "../../../assets/adraLogo.png";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.LoginContainer}>
        <View>
          <Image source={LogoImg} />
        </View>
        <View style={styles.LoginBox}>
          <View style={styles.Login}>
            <View>
              <View style={styles.resendBox}>
                <TouchableOpacity>
                  <Text>Enter OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Resend OTP</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.OtpContainer}>
                <TextInput style={styles.Otpinput} placeholder="0" />
                <TextInput style={styles.Otpinput} placeholder="0" />
                <TextInput style={styles.Otpinput} placeholder="0" />
                <TextInput style={styles.Otpinput} placeholder="0" />
                <TextInput style={styles.Otpinput} placeholder="0" />
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.forgetpwdText}>Click to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View style={styles.RegisterBtn}>
                <Text style={styles.btntext}>Reset Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E3E3",
    width: "100%",
    paddingHorizontal: 10,
  },
  LoginContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  LoginBox: {
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
  OtpContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  Otpinput: {
    flex: 1,
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#777",
    borderRadius: 7,
    height: "100%",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },

  RegisterBtn: {
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
  resendBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
