import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { leaveAndPermissionRequest } from "../../../Redux/Action/commonAction";


const RequestForm = () => {
  const dispatch = useDispatch();



  const [managerId, setManagerId] = useState("");
  const [request, setRequest] = useState("");
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(1);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [comments, setComments] = useState("");
  const [isCustom, setIsCustom] = useState(false); 

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const AddToTime = (time) => {
    const newTime = new Date(time);
    newTime.setHours(newTime.getHours() + 1);
    setToTime(newTime);
    return;
  };

  const handleFromTimeChange = (event, selectedTime) => {
    setShowFromTimePicker(false);
    if (selectedTime) {
      setFromTime(selectedTime);
      AddToTime(selectedTime);
    }
  };

  const resetInputvalues = () => {
    setManagerId("");
    setRequest("");
    setComments("");
    setIsCustom(false)
  };

  // const handlePermissionSubmit = (type) => {
  //   switch (type) {
  //     case "permission": {
  //       if (
  //         !managerId ||
  //         !request ||
  //         !date ||
  //         !fromTime ||
  //         !toTime ||
  //         !comments
  //       ) {
  //         alert("Please fill All the fields");
  //       } else {
  //         const requestDetails = {
  //           request,
  //           date: date.toDateString(),
  //           fromTime: fromTime.toLocaleTimeString(),
  //           toTime: toTime.toLocaleTimeString(),
  //           comments,
  //         };
  //         const payload={managerId,requestDetails}
  //         dispatch(leaveAndPermissionRequest(payload))
  //         resetInputvalues();
  //       }
  //       break;
  //     }

  //     case "leave": {
  //       if (!managerId || !request || !date || !comments || !days) {
  //         alert("Please fill All the fields");
  //       } else {
  //         const requestDetails = {
  //           request,
  //           date: date.toDateString(),
  //           comments,
  //           days
  //         };
  //         const payload={managerId,requestDetails}
  //         dispatch(leaveAndPermissionRequest(payload))
  //         resetInputvalues();
  //       }
  //       break;
  //     }

  //     default:
  //       alert("Please select request type");
  //       break;
  //   }
  // };

  const handlePermissionSubmit = (type) => {
    if (!managerId || !request || !date || !comments) {
      alert("Please fill all the fields");
      return;
    }

    let requestDetails = {
      request,
      date: date.toDateString(),
      comments,
    };

    if (type === "Permission") {
      if (!fromTime || !toTime) {
        alert("Please fill all the fields");
        return;
      }
      requestDetails = {
        ...requestDetails,
        fromTime: fromTime.toLocaleTimeString(),
        toTime: toTime.toLocaleTimeString(),
      };
    } else if (type === "Leave") {
      if (!days) {
        alert("Please fill all the fields");
        return;
      }
      requestDetails = { ...requestDetails, days };
    } else {
      alert("Please select request type");
      return;
    }

    const payload = { managerId, requestDetails };
    dispatch(leaveAndPermissionRequest(payload));
    resetInputvalues();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        {/* <Text style={styles.formHeadText}>REQUEST FORM</Text> */}
        <Text style={styles.label}>To</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={managerId}
            onValueChange={(itemValue) => setManagerId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Manager" value="" />
            <Picker.Item label="Mr.AnguSiva" value="67beb4dc9e623e519ee87f7d" />
            <Picker.Item label="Mr.SivaKumar" value="67bec4dcb29fe1c8c4eb9ab8" />
            <Picker.Item label="Ms.Punitha Murugesan" value="67c0146affaacb0b46476cdd" />
          </Picker>
        </View>

        <Text style={styles.label}>Request Type</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={request}
          onValueChange={(itemValue) => setRequest(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Request" value="" />
          <Picker.Item label="Leave" value="Leave" />
          <Picker.Item label="Permission" value="Permission" />
        </Picker>
        </View>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.inputNew} onPress={() => setShowDatePicker(true)}>
          {date ? date.toDateString() : "Select Date"}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* {request === "leave" && (
          <>
            <Text style={styles.label}>No of days</Text>
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={days}
              onValueChange={(itemValue) => setDays(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select days" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
            </View>
          </>
        )} */}

        {request === "Leave" && (
  <>
    <Text style={styles.label}>No of days</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={days}
        onValueChange={(itemValue) => {
          if (itemValue === "custom") {
            setDays(""); 
            setIsCustom(true); 
          } else {
            setDays(itemValue);
            setIsCustom(false);
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select days" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="Custom" value="custom" />
      </Picker>
    </View>

    {isCustom && (
      <TextInput
        style={styles.customInput}
        placeholder="Enter no. of days"
        keyboardType="numeric"
        value={days}
        onChangeText={(text) => setDays(text)}
      />
    )}
  </>
        )}


        {request === "Permission" && (
          <>
            <Text style={styles.label}>From</Text>
            <Text
              style={styles.inputNew}
              onPress={() => setShowFromTimePicker(true)}
            >
              {fromTime ? fromTime.toLocaleTimeString() : "Select Time"}
            </Text>
            {showFromTimePicker && (
              <DateTimePicker
                value={fromTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={handleFromTimeChange}
              />
            )}

            <Text style={styles.label}>To</Text>
            <Text style={styles.inputNew}>
              {toTime ? toTime.toLocaleTimeString() : "Select Time"}
            </Text>
          </>
        )}

        <Text style={styles.label}>Comments</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={8}
          placeholder="Enter your comments"
          value={comments}
          onChangeText={(text) => setComments(text)}
        />

        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => {
            handlePermissionSubmit(request);
          }}
        >
          <View style={styles.SubmitBtn}>
            <Text style={styles.btntext}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RequestForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E3E3",
    padding: 8,
  },
  formCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },

  formHeadText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 5, 
    overflow: "hidden", 
    marginBottom: 10, 
  },
  picker: {
    color: "#000", 
    backgroundColor: "#fff", 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  inputNew: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 15,
    marginBottom: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  SubmitBtn: {
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
  backButton: {
    // marginTop: 20,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  customInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  }
  
});
