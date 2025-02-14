import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import LogoImg from "../../../assets/adraLogo.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginCredentials,handleLogin } from "../../Redux/Action/commonAction"; 

const Login = () => {
  const navigation = useNavigation();
  const {email,password,token,role}=useSelector((state)=>state.commonState)
  const dispatch = useDispatch()

  const handleTextChange = (field, value) => {
    const payload={field,value}
    dispatch(handleLoginCredentials(payload));
  };

  const handleLoginSubmit = () => {
    if(!email || !password){
      alert('please fill all the fields')
    }else{
      const payload = { email, password };
      dispatch(handleLogin(payload, navigation)); 
    }
   
};

  useEffect(()=>{
    if(token){
     if(role=="developer"){
      navigation.navigate('EMPLOYEE')
     }else if(role=='teamlead'){
      navigation.navigate('TEAMLEAD')
     }
    }
  },[token,role])

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.LoginContainer}>
          <View>
            <Image source={LogoImg} />
          </View>
          <View style={styles.LoginBox}>

            <View style={styles.Login}>

              <TextInput 
              style={styles.input} 
              placeholder="Email" 
              value={email}
              onChangeText={(text) => handleTextChange("email", text)}/>

              {/* Password Input */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={(text) => handleTextChange("password", text)}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text style={styles.forgetpwdText}>Forgot Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "100%" }}
               onPress={handleLoginSubmit}
              >
                <View style={styles.RegisterBtn}>
                  <Text style={styles.btntext}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

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
});
