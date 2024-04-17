import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from "@react-native-firebase/firestore";
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import { useDispatch, useSelector } from 'react-redux';

const EnterAddress = ({ navigation }) => {
    const [houseFlatNo, setHouseFlatNo] = useState('');
    const [floor, setFloor] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [Area, setArea] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [pinCodeEntered, setPinCodeEntered] = useState(''); // State to track entered pin code
    const [loading, setLoading] = useState(false); // State to manage loading indicator

  

    const user = useSelector(state => state.user);
    const { uid } = user;
   

    
    const handleSaveDetails = async () => {

        try {
            if (!houseFlatNo || !floor || !street || !landmark || !Area || !PinCode) {
                throw new Error('Please fill in all the details correctly before saving.');
            }

            if (parseInt(floor) > 4) {
                throw new Error('Service available only up to 4 floors.');
            }

            if (PinCode !== '560032') {
                throw new Error('Sorry for the inconvenience, Service not available in your area.');
            }

            setLoading(true); // Set loading to true when saving starts

            const data = {
                houseFlatNo: houseFlatNo,
                floor: floor,
                street: street,
                landmark: landmark,
                Area: Area,
                PinCode: PinCode,
                createdAt: firestore.FieldValue.serverTimestamp() 
            };

           
            await firestore().collection('users').doc(uid).update({
                address: data
            }); 

            // Show success message and navigate back
            Alert.alert('Address Saved Successfully!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false); // Set loading to false after saving completes
        }
    };


    const validatePinCode = () => {
        if (pinCodeEntered.length === 6 && pinCodeEntered !== '560032') {
            Alert.alert('Sorry for the inconvenience, Service not available in your area.');
        }
    };

    return (
        <LinearGradient colors={['skyblue', '#FFFFFF']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Add a New Address</Text>

                <Text style={styles.orLabel}>ENTER ADDRESS DETAILS HERE</Text>
             
                <Text style={styles.pickerLabel}>House/Flat No</Text>
                <TextInput
                    style={styles.input}
                    placeholder="House/Flat No."
                    value={houseFlatNo}
                    onChangeText={setHouseFlatNo}
                    placeholderTextColor="#888"
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Floor</Text>
                    <Picker
                        selectedValue={floor}
                        onValueChange={(itemValue, itemIndex) => setFloor(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Floor" value="" />
                        <Picker.Item label="0 - Ground Floor" value="0" />
                        <Picker.Item label="1 - First Floor" value="1" />
                        <Picker.Item label="2 - Second Floor" value="2" />
                        <Picker.Item label="3 - Third Floor" value="3" />
                        <Picker.Item label="4 - Fourth Floor" value="4" />
                    </Picker>
                </View>
                <Text style={styles.pickerLabel}>Street</Text>
                <TextInput
                    style={[styles.input, { width: '100%' }]}
                    placeholder="Street"
                    value={street}
                    onChangeText={setStreet}
                    placeholderTextColor="#888"
                />
                <Text style={styles.pickerLabel}>Landmark</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Landmark Eg: Pooja Bakery"
                    value={landmark}
                    onChangeText={setLandmark}
                    placeholderTextColor="#888"
                />
                <Text style={styles.pickerLabel}>Area</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Area Eg: RT Nagar"
                    value={Area}
                    onChangeText={setArea}
                    placeholderTextColor="#888"
                />
                <Text style={styles.pickerLabel}>Pincode</Text>
                <TextInput
                    style={styles.input}
                    placeholder="PinCode Eg:560032"
                    value={PinCode}
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setPinCode(text);
                        if (text.length <= 6) {
                            setPinCodeEntered(text);
                        }
                    }}
                    onBlur={validatePinCode} // Check pin code validity onBlur
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    style={[styles.saveButton, !houseFlatNo || !floor || !street || !landmark || !Area || !PinCode ? { backgroundColor: '#ccc' } : null]}
                    onPress={handleSaveDetails}
                    disabled={!houseFlatNo || !floor || !street || !landmark || !Area || !PinCode}
                >
                    {/* Conditional rendering of the button text */}
                    {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.saveButtonText}>Save Address</Text>}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    heading: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    orLabel: {
        marginBottom: 20,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        color: '#000', // Text color
        textAlign:'center',
    },
    pickerContainer: {
        marginBottom:70,
    },
    pickerLabel: {
        color: '#888',
        marginBottom: 5,
    },
    picker: {
        height: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
        color: '#000', // Text color
        textAlign:'center',
    },
    note: {
        marginBottom: 10,
        color: '#888',
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#3aa8c1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EnterAddress;
