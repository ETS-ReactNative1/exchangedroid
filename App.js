/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const APP_BACKGROUND_COLOR = '#5bdfc3';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient
          colors={['#5bdfc3', '#2e9696']}
          style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Exchange</Text>
          </View>
          <View style={styles.flexItem}>
            <View style={styles.currencyIcon}>
              <Text style={styles.currencyText}>TR</Text>
            </View>
            <TextInput value="0.00" style={styles.textarea} />
          </View>
          <View style={styles.flexItem}>
            <View style={styles.exchangeIcon}></View>
            <TextInput value="0.00" style={styles.textarea} />
          </View>
          <View style={styles.flexItem}>
            <View style={styles.currencyIcon}>
              <Text style={styles.currencyText}>USD</Text>
            </View>
            <TextInput value="0.00" style={styles.textarea} />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {backgroundColor: APP_BACKGROUND_COLOR},
  container: {
    height: '100%',
    backgroundColor: APP_BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 60,
    paddingTop: 20,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 35, color: 'white', marginBottom: 30},
  flexItem: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 22,
    color: 'gray',
  },
  exchangeIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.1)',
  },
  textarea: {
    width: 200,
    fontSize: 35,
    padding: 5,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default App;
