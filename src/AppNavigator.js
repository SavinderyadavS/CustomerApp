import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashPage from './Screens/SplashPage';
import HomePage from './Screens/HomePage';
import Main from './Bottom/Main';
import ContactUs from './Screens/ContactUs';
import MyAddress from './Screens/MyAddress';
//import Child1 from './Screens/NoChild';
import EnterAddress from './Screens/EnterAddress';
import Screen3 from './Bottom/Screen3';
import CartPage from './Bottom/CartPage';
import ThankYouScreen from './Screens/ThankYouScreen';
import MyOrders from './MyOrders';
import Screen1 from '../src/Bottom/Screen1';
import BottomNavigator from './Bottom/BottomNavigator';
import OrderDetailsPage from './Screens/OrderDetailsPage';
import OTPPage from './Screens/OTPPage';
import LoginPage from './Screens/LoginPage';
import SignUp from './Screens/SignUp';

const Stack=createStackNavigator(); 
 
const AppNavigator=()=>{
return(
<NavigationContainer> 
<Stack.Navigator>
<Stack.Screen name='SplashPage' component={SplashPage} options={{headerShown:false}} />
<Stack.Screen name='LoginPage' component={LoginPage} options={{headerShown:false}} /> 
<Stack.Screen name='OTPPage' component={OTPPage} options={{headerShown:false}} /> 
<Stack.Screen name='signUpPage' component={SignUp} options={{headerShown:false}} /> 


<Stack.Screen name='Main' component={Main} options={{headerShown:false}} /> 
<Stack.Screen name='ContactUs' component={ContactUs} options={{headerShown:false}}/> 
<Stack.Screen name='MyAddress' component={MyAddress} options={{headerShown:true}}/>
<Stack.Screen name='EnterAddress' component={EnterAddress} options={{headerShown:false}}/>
<Stack.Screen name='Screen3' component={Screen3} options={{headerShown:false}}/>
<Stack.Screen name='CartPage' component={CartPage} options={{headerShown:true}}/>
<Stack.Screen name='ThankYouScreen' component={ThankYouScreen} options={{headerShown:false}}/>
<Stack.Screen name='MyOrders' component={MyOrders} options={{headerShown:false}}/>
<Stack.Screen name='BottomNavigator' component={BottomNavigator} options={{headerShown:false}}/>
<Stack.Screen name='OrderDetailsPage' component={OrderDetailsPage} options={{headerShown:false}}/>
</Stack.Navigator>
</NavigationContainer> 
);
};

export default AppNavigator;
