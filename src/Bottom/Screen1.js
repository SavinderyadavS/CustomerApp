import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';

import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const ProductSlider = () => {

  const navigation = useNavigation();

  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState({});

  const products = [
    { id: 0, name: '20 Liter Water', image: require('../images/can.jpg'), price: 15.0, maxQuantity: 5 },
    { id: 1, name: '5 Liter Dispenser', image: require('../images/dispenser.jpg'), price: 49.0, maxQuantity: 2 },
    // Add more products as needed
  ];

  useEffect(() => {
    if (cart[products[currentIndex].id] !== undefined) {
      setQuantity(cart[products[currentIndex].id]);
    } else {
      setQuantity(0);
    }
  }, [currentIndex, cart]);

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const goToCart = () => {
    // Navigate to CartPage
    navigation.navigate('CartPage',{cart});
  };

  const increaseQuantity = () => {
    if (quantity < products[currentIndex].maxQuantity) {
      setQuantity(quantity + 1);
    } else {
      alert("For Bulk Orders please contact us at +91 9065455407");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const itemTotal = () => {
    return (products[currentIndex].price * quantity).toFixed(2);
  };

  const addToCart = () => {
    const updatedCart = { ...cart };
    updatedCart[products[currentIndex].id] = quantity;
    setCart(updatedCart);
    console.log('Product added to cart:', products[currentIndex].name);
  };

  

  

  const renderPagination = () => (
    <View style={styles.pagination}>
      <Text style={styles.productName}>{products[currentIndex].name}</Text>
      <Text style={styles.priceText}>
        ₹{products[currentIndex].price.toFixed(2)}
      </Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemTotalContainer}>
        <Text style={styles.itemTotalText}>Item Total: ₹{itemTotal()}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartContainer}>
        <View style={styles.cartBox}>
          <Text style={styles.cartHeading}>Items in Cart</Text>
          <Text style={styles.cartLabelText}>
            20 Liter Water: {cart[0] || 0} Empty Dispenser: {cart[1] || 0}
          </Text>
          <TouchableOpacity style={styles.goToCartButton} onPress={goToCart}>
            <Text style={styles.goToCartButtonText}>Go To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.deliveryContainer}>
        {/* <Text style={styles.deliveryText}>* Get Free Door Step Delivery in Minutes</Text>
        <Text style={styles.deliveryAtText}>Only @PaaniWaLa</Text> */}
      </View>
    </View>
  );

  return (
  
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Branding Container */}
      <LinearGradient
        colors={['#3aa8c1', 'skyblue']} // Gradient colors
        style={styles.brandContainer}
      >
        <Text style={styles.brandText}>VarDaRa </Text>
        {/* Gold Coins Icon */}
        <View style={styles.coinsContainer}>
       
          <Text style={styles.coinsText}>100 Reward Coins</Text> 
          {/* fetch the coins value from the database */}
        </View>
      </LinearGradient>

      <View style={styles.carouselContainer}>
      <Swiper
  style={styles.carousel}
  showsButtons={false}
  autoplay={true}
  autoplayTimeout={3} // Change this value to a higher value, e.g., 3000 (3 seconds)
  //dotStyle={styles.paginationDot}
  //activeDotStyle={styles.activePaginationDot}
>
  <View style={styles.carouselSlide}>
    <Image
      source={require('../images/cc1.jpg')}
      style={styles.carouselImage} 
    />
  </View>
  <View style={styles.carouselSlide}>
    <Image
      source={require('../images/cc2.jpg')}
      style={styles.carouselImage} 
    />
  </View>
  <View style={styles.carouselSlide}>
    <Image
      source={require('../images/cc3.jpg')}
      style={styles.carouselImage} 
    />
  </View>
</Swiper>

      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.swiper}
          loop={false}
          showsButtons={true}
          onIndexChanged={handleIndexChanged}
          renderPagination={renderPagination}
        >
          {products.map((product, index) => (
            <View key={index} style={styles.slide}>
              <Image source={product.image} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
    </ScrollView>

  );
};    

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    paddingVertical: 10, // Adjust as needed
    borderRadius: 0, // Adjust as needed
    flexDirection: 'row', // Added to align icon and text horizontally
    width:'100%',
    height:'8%',
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Text color
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Adjust as needed for spacing
  },
  coinsText: {
    color: 'gold',
    marginLeft: 5, // Adjust as needed for spacing
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  swiperContainer: {
    flex: 1,
  },
  swiper: {
    height: 300,
    //marginTop: 0,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginLeft: 10,
  },
  itemTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  itemTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#3aa8c1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartContainer: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cartBox: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
  },
  cartHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cartLabelText: {
    fontSize: 16,
    alignSelf: 'center',
  },
  goToCartButton: {
    backgroundColor: '#3aa8c1',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 12,
  },
  goToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deliveryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  deliveryText: {
    fontSize: 16,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  deliveryAtText: {
    fontSize: 20,
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: '#3aa8c1',
  },
  carouselContainer: {
    height: responsiveHeight(30),
    marginBottom: 0,
  },
  carousel: {
   // flex: 1,
  },
  carouselSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselSlide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: responsiveWidth(95),
    height: responsiveHeight(20),
    resizeMode: 'cover',
    marginTop: 15 ,
    borderRadius: 20,
  },
  carouselImage1: {
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    resizeMode: 'cover',
    marginTop: 40,
    borderRadius: 20,
  },
});

export default ProductSlider;