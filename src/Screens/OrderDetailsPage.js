import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OrderDetailsPage = ({ route }) => {
  const { order } = route.params;

  // Placeholder time values
  const timeOfOrder = "10:00 AM";
  const timeOfDelivery = "12:30 PM";

  return (
    <LinearGradient colors={['#3aa8c1', '#88c0d0']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Order Details</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Order ID:</Text>
          <Text style={styles.text}>{order.id}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Date of Order:</Text>
          <Text style={styles.text}>{order.date}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Time of Order:</Text>
          <Text style={styles.text}>{timeOfOrder}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Time of Delivery:</Text>
          <Text style={styles.text}>{timeOfDelivery}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Order Status:</Text>
          {/* You can display order status here */}
          <Text style={styles.text}>Delivered</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Total Order Price:</Text>
          <Text style={styles.text}>₹{order.total.toFixed(2)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  details: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

export default OrderDetailsPage;
