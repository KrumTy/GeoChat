import React from 'react';
import Map from "./components/features/Map"
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
 
import { Provider } from 'react-redux'
import { store } from './state'

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar />
      <Map />
    </View>
  </Provider>
);
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
 
export default App;
