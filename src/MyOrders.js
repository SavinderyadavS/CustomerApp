import React  from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import firestore from "@react-native-firebase/firestore"; 
import { useEffect, useState } from 'react';

const MyOrders = () => {
  const navigation = useNavigation();

  const user = useSelector(state => state.user);
  const { uid, userData } = user; 


  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Fetch orders associated with the customer's mobile number
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await firestore()
          .collection('orders')
          .where('customerId', '==', userData.mobileNumber)
          .get();

        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrder(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userData.mobileNumber]);


  const orders= order.map((order,index)=> ({
    id: order.id,
    date: order.timestamp.toDate().toLocaleDateString(), // Convert timestamp to date string
    items: order.product.map(product => product.name), // Assuming product has a name property
    total: order.totalPrice // Assuming totalPrice is the total price of the order
  }));


  // console.log(order);
  console.log(orders, 'here');


  // // Dummy data for demonstration
  // const orders = [
  //   { id: 1, date: 'April 1, 2024', items: ['Item 1', 'Item 2'], total: 25.99 },
  //   { id: 2, date: 'March 28, 2024', items: ['Item 3', 'Item 4'], total: 19.99 },
  //   { id: 3, date: 'March 2, 2024', items: ['Item 3', 'Item 4'], total: 19.99 },
  //   { id: 4, date: 'March 28, 2024', items: ['Item 3', 'Item 4'], total: 19.99 },
  //   { id: 5, date: 'March 28, 2024', items: ['Item 3', 'Item 4'], total: 19.99 },
  //   // Add more orders as needed
  // ];

  const navigateToOrderDetails = (order) => {
    navigation.navigate('OrderDetailsPage', { order });
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('BottomNavigator');
  };

  return (
    <LinearGradient colors={['#b5d8e6', '#FFFFFF']} style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <ScrollView contentContainerStyle={styles.ordersContainer}>
        {orders.map(order => (
          <TouchableOpacity key={order.id} onPress={() => navigateToOrderDetails(order)}>
            <LinearGradient colors={['#b5d8e6', '#FFFFFF']} style={styles.orderContainer}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View style={styles.itemsContainer}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.itemText}>{item}</Text>
                ))}
              </View>
              <Text style={styles.totalText}>Total: ₹{order.total.toFixed(2)}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={navigateToHomeScreen} style={styles.backButton}>
        <Text style={styles.backButtonText}>Go to Home Screen</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 25,
  },
  ordersContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000', // Black text color
  },
  itemsContainer: {
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 2,
    color: '#000', // Black text color
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000', // Black text color
  },
  backButton: {
    backgroundColor: '#3aa8c1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyOrders;
