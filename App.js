//   import React from 'react';
// import {Image,View,Text} from 'react-native';
// import AppNavigator from './src/AppNavigator';

// import { Provider } from 'react-redux';

// import { store } from './src/Store/store';

// const App=()=>{
// return(
//   <Provider store={store}>
//        <AppNavigator />
//     </Provider>
// ); 

// };

// export default App;


// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Store/store'; 
import AppNavigator from './src/AppNavigator'; 

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
