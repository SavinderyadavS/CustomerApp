import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactUs = () => {
  const handleIconPress = (url) => {
    Linking.openURL(url);
  };
  const handlePhonePress = (phoneNumber) => {
    Linking.openURL('tel:${phoneNumber}');
  };

  const handleEmailPress = (email) => {
    Linking.openURL('mailto:${email}');
  };

  return (
    <LinearGradient colors={['skyblue', '#FFFFFF']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.contactHeaderText}>Contact Us</Text>
        <Text style={styles.subText}>Communicate with us</Text>
        <View style={styles.contentContainer}>
          <Image source={require('../images/delivery.jpg')} style={styles.logo} />
          <Text style={styles.aPaaniwala}>PaaniWaLa</Text>
          <Text style={styles.aPurewithlove}>Pure With Love</Text>
          <Text style={styles.aMobiles}>Mobile</Text>
          <TouchableOpacity onPress={() => handlePhonePress('+919353762773')}>
            <Text style={styles.aNumber}>+91 9353762773</Text>
          </TouchableOpacity>
          <Text style={styles.aMobiles}>Email</Text>
          <TouchableOpacity onPress={() => handleEmailPress('navin3754kumar@gmail.com')}>
            <Text style={styles.aNumber}>paaniwala01@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleIconPress('https://www.internet.com')}>
          <Icon name="globe" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('https://www.instagram.com')}>
          <Icon name="instagram" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('https://www.youtube.com')}>
          <Icon name="youtube" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('https://www.facebook.com')}>
          <Icon name="facebook" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3aa8c1',
  },
  header: {
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  contactHeaderText: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: screenWidth * 0.045,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 150,
  },
  icon: {
    marginRight: 20,
  },
  logo: {
    width: 150,
    height: 150,
   // marginLeft: 130,
    marginTop: 30,
    borderRadius:10,
  },
  aPaaniwala: {
    fontWeight: 'bold',
    fontSize: 22,
    //marginLeft: 130,
  },
  aPurewithlove: {
    fontSize: 15,
    //marginLeft: 130,
  },
  aMobiles: {
    marginTop: 20,
    fontSize: screenWidth * 0.045,

    //marginLeft: 160,
  },
  aNumber: {
    //marginLeft: 130,
    fontWeight: 'bold',
    fontSize: screenWidth * 0.037,
  },
});

export default ContactUs;
