import ContactUs from '../Screens/ContactUs';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';


const Stack = createStackNavigator();


const AccountSection = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigation = useNavigation();
  const[userdata,setUserData]=useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { uid, userData } = user;

  const [name,setName]=useState(userData?.name||'');
  const [age,setAge]=useState(userData?.age||'');
  const [phone,setPhone]=useState(userData?.mobileNumber||'');

  // console.log(name);



// console.log(userData,"hereee",uid)

  const handleRate = () => {
    const packageName = 'https://play.google.com/store/apps/details?id=com.water.reminder.tracker&hl=en_IN&gl=US';
    Linking.openURL('market://details?id=${packageName}&hl=en&action=writeReview');
  };

 

  // useEffect(()=>{
  //    const loadData = async ()=>{

  //     try{
  //       const userDocument = await firestore()
  //       .collection('users')
  //       .doc(user.uid)
  //       .get();

  //       setUserData(userDocument)
  //       // console.log("from here")
  //       // console.log(userDocument)
  //     }catch(error){
  //       console.log("uerData not found ")
  //     }
  //    }

  //    loadData();
     
  // },[])


  const handleShare = () => {
    Linking.openURL('whatsapp://send?text=Hello%20from%20my%20app!');
  };

  const handlePrivacyPolicy = () => {
    const privacyPolicyUrl = 'https://example.com/privacy-policy';
    Linking.openURL(privacyPolicyUrl);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    
    setShowLogoutModal(false);
    // if (showLogoutModal) {
    //   navigation.navigate('Screen1');
    // }
      try {
          await auth().signOut();
          navigation.navigate('LoginPage');
      } catch (error) {
          console.error('Error occurred during logout:', error);
      }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleMyAddress = () => {
    navigation.navigate('MyAddress');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  return (
    <LinearGradient colors={['skyblue', '#FFFFFF']} style={styles.container}>
      <View style={styles.staticSection}>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.aAccount}> Account</Text>
          <Text style={styles.bmanage}>  Manage your account</Text>
        </TouchableOpacity>
        <Image source={require('../images/delivery.jpg')} style={styles.logo} />
        <Text style={{ textAlign: 'center' }}>{name}</Text>
        <Text style={{ textAlign: 'center' }}>{phone}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollstyles} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.sectionItem} onPress={() => handleMyAddress()}>
          <Text style={styles.sectionText}>  Address</Text>
          <Text style={styles.sectionSubtext}>  Manage your address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem} onPress={() => handleContactUs()}>
          <Text style={styles.sectionText}>  ContactUs</Text>
          <Text style={styles.sectionSubtext}>  Communicate With</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem} onPress={handleShare}>
          <Text style={styles.sectionText}>  Share</Text>
          <Text style={styles.sectionSubtext}>  Tell to your friend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem} onPress={handleRate}>
          <Text style={styles.sectionText}>  Rate</Text>
          <Text style={styles.sectionSubtext}>  How satisfied you are with us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem} onPress={handlePrivacyPolicy}>
          <Text style={styles.sectionText}>  Privacy Policy</Text>
          <Text style={styles.sectionSubtext}>  Our commitment to privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem} onPress={handleLogout}>
          <Text style={styles.sectionText}>  Log Out</Text>
          <Text style={styles.sectionSubtext}>  Exit from the section</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Log Out</Text>
            <Text style={styles.modalsubtext}>Are you sure you to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancelLogout}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.yesButton]} onPress={handleConfirmLogout}>
                <Text style={styles.buttonText}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionItem: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#888',
  },
  aAccount: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  bmanage: {
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 150,
    borderRadius: 50,
  },
  modalContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalsubtext: {
    fontSize: 12,
    marginBottom: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  scrollstyles: {
    //flex:1,
  },
  cancelButton: {
    backgroundColor: '#0000ff',
  },
  yesButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AccountSection;
