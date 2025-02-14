import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../Redux/Action/commonAction';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { token, profileDetails } = useSelector((state) => state.commonState);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getProfileDetails(token));
    }, [dispatch, token])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileDetails?.employeeName}</Text>
        <Text style={styles.profileAge}>{profileDetails?.personalDetails?.empRole}</Text>

        <TouchableOpacity
          style={styles.matchButton}
          onPress={() => {
            navigation.navigate('RequestForm');
          }}>
          <Text style={styles.matchButtonText}>Permission/Leave Request</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Employee Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profileDetails?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>D.O.B</Text>
          <Text style={styles.infoValue}>{profileDetails?.personalDetails?.birthDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{profileDetails?.personalDetails?.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Joined</Text>
          <Text style={styles.infoValue}>{profileDetails?.personalDetails?.joinedDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Blood Group</Text>
          <Text style={styles.infoValue}>{profileDetails?.personalDetails?.bloodGroup}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{profileDetails?.personalDetails?.address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E4E3E3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileAge: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  matchButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '90%',
    marginTop: 10,
  },
  matchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
    flex: 1,
  },
  infoValue: {
    flex: 3,
    fontSize: 16,
  },
});

export default ProfileScreen;
