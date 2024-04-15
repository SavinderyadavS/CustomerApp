import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SplashPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToMain = () => {
      navigation.navigate('LoginPage');
    };

    setTimeout(navigateToMain, 5000);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor:'#fff' }}>
      {/* Replace 'imagePath' with the path to your image */}
      <Image
        source={require('../images/ssd.gif')} // Update the image path accordingly
        style={{ height: responsiveHeight(110), width: responsiveWidth(100) }} // Adjust the percentage as needed
        resizeMode="contain" // Adjust the resizeMode as needed
      />
    </View>
  );
};

export default SplashPage;
