import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You need to install and import Ionicons or any other icon library you prefer
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for Rupees symbol

const CartPage = ({ navigation }) => {
  // Dummy data for demonstration
  const itemsInCart = [
    { id: 1, name: 'SudhJal (20 Litre)', price: 15, quantity: 2 },
    // Add more items as needed
  ];

  // Calculate total price
  const totalPrice = itemsInCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Function to navigate to Address page
  const goToAddressPage = () => {
    // Navigate to the address page
    navigation.navigate('EnterAddress');
  };

   

  // Placeholder function for confirmation action
  const confirmOrder = () => {
    // Placeholder action for confirming the order
    console.log("Order confirmed");
    navigation.navigate('ThankYouScreen');
  };

  // State for modal visibility
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
     {/* <View style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#444" />
        </TouchableOpacity>
  </View>*/}

      {/* Delivery Address Box */}
      <View style={styles.box}>
        <Ionicons name="location" size={24} color="#444" />
        <View>
          <Text style={styles.boxTitle}>Delivery Address</Text>
          <View style={styles.addressDetails}>
            <Text>Flat No:</Text>
            <Text>Floor:</Text>
            <Text>Street:</Text>
            <Text>Landmark:</Text>
            <Text>Area:</Text>
            <Text>Pincode:</Text>
          </View>
        </View>
        <TouchableOpacity onPress={goToAddressPage} style={styles.changeButton}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Box */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.box}>
          <FontAwesome name="rupee" size={24} color="#444" />
          <View>
            <Text style={styles.boxTitle}>Payment Method</Text>
            <Text>     Cash on Delivery</Text>
            <Text style={{ color: 'red' }}>     Other Payment Modes are not available</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bill Box */}
      <TouchableOpacity onPress={() => console.log("View Bill")}>
        <View style={styles.box}>
          <Ionicons name="receipt" size={24} color="#444" />
          <View>
            <Text style={styles.boxTitle}>Your Bill</Text>
            <View style={styles.billDetails}>
              <Text>Item Details: 2 * 20 Liter water, 1 Dispenser</Text>
              {/* Fetch the corrrect items from the previous Page*/}
              <Text>Item Total: ₹{(itemsInCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toFixed(2)}</Text>
              {itemsInCart.map((item, index) => (
                <Text key={index}>{item.name}: ₹{(item.price * item.quantity).toFixed(2)}</Text>
              ))}
              <Text>Delivery Charges: ₹0.00</Text>
              <Text>Super Coins: -₹10.00</Text>
              <Text>Total: ₹{(totalPrice - 10).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal for Payment Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You can pay via "Cash on Delivery" only</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirm Order Button */}
      <TouchableOpacity onPress={confirmOrder} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, // Padding bottom for better scrolling
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxTitle: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressDetails: {
    marginLeft: 10,
  },
  changeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#5ca85c',
    padding: 10,
    borderRadius: 5,
  },
  changeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  billDetails: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 1,
    marginTop: 10,
    marginLeft:10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartPage;
