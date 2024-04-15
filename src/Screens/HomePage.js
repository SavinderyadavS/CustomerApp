import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your screen content goes here */}
      <Text>Hello, this is the main content!</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.header }>
              <Text style={styles.appName}>Paani WaLa</Text>
              <Text style={styles.subheading}>Pure With Love</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width:265,
    height:63,
    backgroundColor:'orange',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3aa8c1', // Customize the color
  },
  subheading: {
    fontSize: 14,
    color: '#3aa8c1', // Customize the color
  },
});

export default App;
