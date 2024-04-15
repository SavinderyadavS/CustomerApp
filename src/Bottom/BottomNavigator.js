import React from 'react';
import {Image,Text,View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import { createStackNavigator } from '@react-navigation/stack';
import MyOrders from '../MyOrders';


const Bottom = createBottomTabNavigator(); 
const Stack = createStackNavigator();

const BottomNavigator=()=>
{
return( 
  
<Bottom.Navigator>
 <Bottom.Screen
        name="Home"
        component={Screen1}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../images/Home1.jpg')}
              style={{
                width: 35,
                height: 30,
                //tintColor: tabInfo.focused ? '' : '',
              }}
            />
          ),
        }}
      />
 <Bottom.Screen
        name="My Orders"
        component={MyOrders}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../images/Kart1.png')}
              style={{
                width: 35,
                height: 30,
               // tintColor: tabInfo.focused ? '' : '',
              }}
            />
          ),
        }}
      />
 <Bottom.Screen
        name="Account"
        component={Screen3}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../images/Account1.png')}
              style={{
                width: 30,
                height: 30,
               // tintColor: tabInfo.focused ? '' : '',
              }}
            />
          ),
        }}
      />
</Bottom.Navigator>

);

};

export default BottomNavigator;