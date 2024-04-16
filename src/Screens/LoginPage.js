import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage'; //login state 

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation } from '@react-navigation/native';

const LoginPage = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');

   

    // const checkAuth = async () => {  
    //     try {
    //         const authToken = await AsyncStorage.getItem('authToken');
    //         return authToken !== null;
    //     } catch (error) {
    //         console.error('Error occurred while checking authentication:', error);
    //         return false;
    //     }
    // };

    //     useEffect(() => {
    //         checkAuth().then((authenticated) => {
    //             if (authenticated) {
    //                 navigation.navigate('Main');
    //             } else {
    //                 console.log('user not logged in ')
    //             }
    //         });
    //     }, []);
    


            

        

    const handleLogin = async () => {
        try {
            // Here you can add further validation for the mobile number if needed
            // For simplicity, let's assume the number is valid
            // Then navigate to the OTP page and pass mobileNumber as a parameter
            const formattedPhoneNumber = `+91${mobileNumber}`;
            const confirmation = await signInWithPhoneNumber(formattedPhoneNumber);
            navigation.navigate('OTPPage', { formattedPhoneNumber, confirmation });
        } catch (error) {
            console.error('Error occurred during login:', error);
            // Handle error if needed
        }
    };


    async function signInWithPhoneNumber(phoneNumber) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            return confirmation;
        } catch (error) {
            console.error('Error occurred during phone number verification:', error);
            throw error; // Rethrow the error to be caught by the caller
        }
    }

    return (
        <ImageBackground source={require('../images/jjk.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Mobile Number"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={(text) => {
                            // Validate and set mobile number
                            const formattedNumber = text.replace(/[^0-9]/g, '').substring(0, 10); // Remove non-numeric characters and limit to 10 digits
                            setMobileNumber(formattedNumber);
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover" // Make the image cover the entire background area
        //width:350,
        //height:600,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    countryCode: {
        fontSize: 19,
        marginRight: 10,
        fontWeight: 'bold', // Example: Making the text bold
        color: 'black' // Example: Changing the text color to white
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'black', // Text color
        fontSize: 18 // Text size
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#3aa8c1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});

export default LoginPage;
