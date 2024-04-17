


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";

function SignUp({ navigation, route }) {
    const { uid ,formattedPhoneNumber} = route.params;
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [floor, setFloor] = useState('');

  
    const saveDetails = async () => {
        console.log(formattedPhoneNumber ,"jj") 
        console.log(uid)
        try {
            await firestore().collection('users').doc(uid).set({
                name,
                age,
                floor,
                mobileNumber:formattedPhoneNumber,
            });

            navigation.navigate('Main'); // Move to main screen
        } catch (error) {
            console.log("Failed to save:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Age:</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Floor:</Text>
            <TextInput
                style={styles.input}
                value={floor}
                onChangeText={setFloor}
                placeholder="Enter your floor"
            />

            <TouchableOpacity style={styles.button} onPress={saveDetails}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default SignUp;
