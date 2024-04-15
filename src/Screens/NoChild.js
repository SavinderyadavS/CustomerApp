import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import child2 from './EnterAddress';
const Child1 = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        });

        reverseGeocode(location.coords.latitude, location.coords.longitude);
      }
    };

    getLocationPermission();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      const formattedAddress = `${location[0]?.street || ''}, ${location[0]?.city || ''}, ${location[0]?.region || ''}, ${location[0]?.postalCode || ''}`;
      setAddress(formattedAddress);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleMarkerDragEnd = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  const handleContinuePress = () => {
    
    navigation.navigate('Child2');
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={userLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={userLocation}
            title="Long press & Drag me!"
            description="I am draggable"
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </MapView>
      )}

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 255)',
    padding: 10,
    alignItems: 'center',
    marginBottom:55,
  },
  addressText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  continueButton: {
    width:400, 
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
    backgroundColor: '#3aa8c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center',
  },
});

export default Child1;
