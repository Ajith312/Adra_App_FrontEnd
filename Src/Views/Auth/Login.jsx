import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import LogoImg from "../../../assets/adraLogo.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoginCredentials,
  handleLogin,
  updateFcmToken,
} from "../../Redux/Action/commonAction";
import { AntDesign, Feather } from "@expo/vector-icons";
import { updateLoadingSpinner } from "../../Redux/Slice/commonSlice";

const Login = () => {
  const navigation = useNavigation();
  const { email, password, token, role, fcmToken,loading } = useSelector(
    (state) => state.commonState
  );
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 

  const handleTextChange = (field, value) => {
    const payload = { field, value };
    dispatch(handleLoginCredentials(payload));
  };

  const handleLoginSubmit = () => {
    if (!email && !password) {
      alert("Email and Password are required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else {
      dispatch(updateLoadingSpinner());
      const payload = { email, password };
      dispatch(handleLogin(payload, navigation));
      dispatch(updateFcmToken({ email, fcmToken }));
    }
  };
  

  useEffect(() => {
    if (token) {
      if (role === "developer") {
        navigation.navigate("EMPLOYEE");
      } else if (role === "teamlead") {
        navigation.navigate("TEAMLEAD");
      }
    }
  }, [token, role, navigation]);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Details")}
        >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.LoginContainer}>
          <Text style={styles.welcomeText}>Welcome! Glad to see you, </Text>
          <View>
            <Image source={LogoImg} />
          </View>
          <View style={styles.LoginBox}>
            <View style={styles.Login}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email I'D"
                value={email}
                onChangeText={(text) => handleTextChange("email", text)}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter Your Password"
                  value={password}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(text) => handleTextChange("password", text)}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgetpwdText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={handleLoginSubmit}
              >
                <View style={styles.RegisterBtn}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text style={styles.btntext}>Login</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    width: "100%",
    paddingHorizontal: 10,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  LoginContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
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
    color: "#8391A1",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 7,
    height: 50,
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#8391A1",
  },
  RegisterBtn: {
    // marginVertical: 20,
    marginTop:20,
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
    color: "#6A707C",
  },
  welcomeText: {
    color: "#263238",
    fontSize: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 40,
    width: "80%",
    paddingHorizontal: 20,
  },
});
