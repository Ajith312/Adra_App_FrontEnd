import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Modal, TextInput } from 'react-native';
import React, { useCallback } from 'react';
import {FontAwesome6,Ionicons} from '@expo/vector-icons';
import TeamCard from './TeamCard';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getTeamMembersDetails } from '../../../Redux/Action/commonAction';
import { updateModelShow } from '../../../Redux/Slice/commonSlice';
import { Picker } from '@react-native-picker/picker';

const ManagerTeam = () => {
    
    const { token, teamMembersDetails,modalShow } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(getTeamMembersDetails(token));
        }, [dispatch, token])
    );

    const renderData = ({ item }) => <TeamCard item={item} />;

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.TeamContainer}>
                <View style={styles.AddBtn}>
                    <TouchableOpacity style={styles.AddMemberBtn} onPress={()=>dispatch(updateModelShow())}>
                        <FontAwesome6 name="add" size={18} color="white" />
                        <Text style={styles.btnText}>Add Member</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.MemberContainer}>
                    {teamMembersDetails.length > 0 ? (
                        <FlatList
                            data={teamMembersDetails}
                            renderItem={renderData}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.listContent}
                            keyboardShouldPersistTaps="handled"
                        />
                    ) : (
                        <View style={styles.NodataContainer}>
                            <Text style={styles.noDataText}>No Data Found</Text>
                        </View>
                    )}
                </View>
                <Modal 
                transparent
                visible={modalShow}
                animationType='fade'
                onRequestClose={()=>dispatch(updateModelShow())}
                >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1}>
                <View style={styles.modalContainer}>
                  <View style={styles.modelHeader}>
                    <Text style={styles.modalTextHead}>Add Member</Text>
                    <Ionicons
                      name="close"
                      size={30}
                      color="black"
                      onPress={()=>dispatch(updateModelShow())}
                    />
                  </View>
                  <View style={styles.ModalBody}>
                    <TextInput
                        style={styles.input} 
                        placeholder="Name" 
                    />
                    <TextInput
                        style={styles.input} 
                        placeholder="Email" 
                    />
                    <TextInput
                        style={styles.input} 
                        placeholder="Password" 
                    />
                     <View style={styles.pickerContainer}>
                            <Picker
                              style={styles.picker}
                            >
                              <Picker.Item label="Select Role" value="" style={styles.value} />
                              <Picker.Item label="Front-End Developer" value="Front-End Developer" />
                              <Picker.Item label="Back-end Developer" value="Back-end Developer" />
                              <Picker.Item label="UI/Ux Developer" value="UI/Ux Developer" />
                              <Picker.Item label="QA Analyst" value="QA Analyst" />
                              <Picker.Item label="Product Analyst" value="QA Analyst" />
                            </Picker>
                     </View>
                      <TouchableOpacity >
                                     <View style={styles.SubmitBtn}>
                                       <Text style={styles.submittext}>Submit</Text>
                                     </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </TouchableOpacity>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default ManagerTeam;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    TeamContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    AddBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    AddMemberBtn: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        gap: 5,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    MemberContainer: {
        flex: 1,
        marginVertical: 15,
    },
    NodataContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#9F9F9F',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
      },
      modalContainer: {
        width: "90%",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        // position: "absolute",
        // top:20,
        // left:18,
        alignSelf:"center",
        elevation: 5,
      },
      modalTextHead:{
        fontSize: 20,
        fontWeight: "bold",
      },
      modelHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      ModalBody:{
        height:300,
        marginVertical:15
      },
      input: {
        width: "100%",
        borderWidth: 1,
        marginTop: 10,
        borderColor: "#777",
        borderRadius: 7,
        height: 50,
        paddingHorizontal: 10,
        color:"#8391A1"
      },
      pickerContainer: {
        borderWidth: 1, 
        borderColor: "#777", 
        borderRadius: 5, 
        overflow: "hidden", 
        marginTop:10,
      },
      picker: {
        color: "#8391A1",
      },
      value:{
       borderBottomColor:"#E8E8E8",
       borderBottomWidth:1
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
      submittext: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
      },
});
