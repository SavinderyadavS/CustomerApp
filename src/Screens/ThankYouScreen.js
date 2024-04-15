import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ThankYouScreen = ({ navigation }) => {
  const tickAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(tickAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.navigate('MyOrders'); // Navigate to MyOrders page after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup the timeout to prevent memory leaks

  }, [tickAnimation, navigation]);

  const rotateInterpolate = tickAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <FontAwesome name="check-circle" size={150} color="green" />
      </Animated.View>
      <Text style={styles.thankYouText}>Thank you for your Order!</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default ThankYouScreen;
