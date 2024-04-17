import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EnterAddress from './EnterAddress';
import firestore from "@react-native-firebase/firestore";

import { useDispatch, useSelector } from 'react-redux';


const MyAddress = () => {

  
  const navigation = useNavigation();
  const route = useRoute();
  

  const user = useSelector(state => state.user);
  const { uid, userData } = user;

  
  // Extracting addressDetails from route.params using destructuring
  // const { addressDetails } = userData.address ||route.params;

  const { address:addressDetails } = userData;

  
  console.log(addressDetails)


  // Function to handle navigation to EnterAddress screen for editing address
  const handleNavigateToInputScreen = () => {
    navigation.navigate('EnterAddress', { addressDetails, editMode: true });
  };

  // Function to handle deletion of the address
  const handleDeleteAddress = async () => {
    // Implement the logic to delete the address here
    // For demonstration, let's just navigate back to the previous screen
    await firestore().collection('users').doc(uid).update({
      address: firestore.FieldValue.delete()
  }); 

    alert('Address Deleted !');
    navigation.goBack();
  };

  // Function to handle navigation to Screen3
  const handleProceed = () => {
    navigation.navigate('Screen3');
  };

  // Check if all address details are filled
  const isAddressFilled = addressDetails && addressDetails.houseFlatNo && addressDetails.floor && addressDetails.street && addressDetails.landmark && addressDetails.Area && addressDetails.PinCode;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Address Details</Text>
      <View style={styles.addressContainer}>
        {/* Render address details if available, otherwise show message */}
        {addressDetails ? (
          <>
            <Text style={styles.addressDetailsText}>House/Flat No: {addressDetails.houseFlatNo}</Text>
            <Text style={styles.addressDetailsText}>Floor: {addressDetails.floor}</Text>
            <Text style={styles.addressDetailsText}>Street: {addressDetails.street}</Text>
            <Text style={styles.addressDetailsText}>Landmark: {addressDetails.landmark}</Text>
            <Text style={styles.addressDetailsText}>Area: {addressDetails.Area}</Text>
            <Text style={styles.addressDetailsText}>PinCode: {addressDetails.PinCode}</Text>
          </>
        ) : (
          <Text style={styles.noAddressSavedText}>No Address Saved</Text>
        )}
        {/* Render button to navigate to EnterAddress screen if no address details are filled, otherwise show "Edit Address" button */}
        {!addressDetails ? (
          <TouchableOpacity
            style={styles.inputAddressButton}
            onPress={handleNavigateToInputScreen}
          >
            <Text style={styles.inputAddressButtonText}>Add Address</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.inputAddressButton}
            onPress={handleNavigateToInputScreen}
          >
            <Text style={styles.inputAddressButtonText}>Edit Address</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Render button to delete the address if address details are filled */}
      {addressDetails && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAddress}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
      {/* Render button to proceed to Screen3 if all address details are filled */}
      <TouchableOpacity
        style={[styles.proceedButton, !isAddressFilled && { backgroundColor: '#ccc' }]}
        onPress={handleProceed}
        disabled={!isAddressFilled}
      >
        <Text style={styles.proceedButtonText}>PROCEED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addressDetailsText: {
    marginBottom: 10,
  },
  noAddressSavedText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputAddressButton: {
    backgroundColor: '#3aa8c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputAddressButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addressContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
  },
});

export default MyAddress;
