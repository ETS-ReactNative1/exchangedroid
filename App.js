/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Modal} from './src/Modal';

const APP_BACKGROUND_COLOR = '#5bdfc3';

const getCurrencies = async () => {
  const fetchData = async () =>
    fetch('https://api.exchangerate-api.com/v4/latest/TRY')
      .then(async res => {
        if (res.ok) {
          const response = await res.json();
          return response;
        } else {
          console.log('HATA, then else');
        }
      })
      .catch(err => {
        console.log('HATA, catch');
      });
};

const useFetch = url => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    (async () => {
      const res = await fetch(url, {
        signal: abortController.signal,
      });
      const data = await res.json();
      if (mounted) setData(data);
    })();
    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };
    return cleanup;
  }, [url]);
  return data;
};

const App = () => {
  const [modal, setModalState] = useState(false);
  const [modalFor, setModalFor] = useState(0);

  const [currOne, setCurrOne] = useState('TRY');
  const [currTwo, setCurrTwo] = useState('USD');

  const [currOneValue, setCurrOneValue] = useState('1');
  const [currTwoValue, setCurrTwoValue] = useState('0');

  const res = useFetch('https://api.exchangerate-api.com/v4/latest/TRY');

  useEffect(() => {
    if (res) {
      setCurrOneValue(res.rates[currOne]);
      setCurrTwoValue(res.rates[currTwo]);
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient
          colors={['#5bdfc3', '#2e9696']}
          style={styles.container}>
          {modal && (
            <Modal
              modalFor={modalFor}
              setCurrOne={setCurrOne}
              setCurrTwo={setCurrTwo}
              setModalState={setModalState}
            />
          )}
          <View style={styles.content}>
            <Text style={styles.title}>{'Exchange'}</Text>
          </View>
          <View style={styles.flexItem}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setModalFor(0);
                setModalState(true);
              }}
              style={styles.currencyIcon}>
              <Text style={styles.currencyText}>{currOne}</Text>
            </TouchableOpacity>
            <TextInput
              onChangeText={text => setCurrOneValue(text)}
              value={currOneValue}
              style={styles.textarea}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.flexItem}>
            <View style={styles.exchangeIcon}>
              <Icon
                name="refresh-cw"
                color="rgba(46, 150, 150, 0.6)"
                size={28}
              />
            </View>
            <TextInput
              value="0.00"
              style={[styles.textarea, {opacity: 0}]}
              editable={false}
            />
          </View>
          <View style={styles.flexItem}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setModalFor(1);
                setModalState(true);
              }}
              style={styles.currencyIcon}>
              <Text style={styles.currencyText}>{currTwo}</Text>
            </TouchableOpacity>
            <TextInput
              onChangeText={text => setCurrTwoValue(text)}
              value={
                res
                  ? (res.rates.USD * parseFloat(currOneValue || '0'))
                      .toString()
                      .substr(0, 8)
                  : currTwoValue
              }
              style={styles.textarea}
              keyboardType="numeric"
            />
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
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    borderColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textarea: {
    width: 200,
    fontSize: 35,
    color: 'white',
    padding: 5,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default App;
