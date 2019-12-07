import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
export const HEIGHT = Dimensions.get('window').height;

const list = ['TRY', 'EUR', 'USD'];

export const Modal = ({state, setModalState}) => {
  return (
    <View
      style={{
        zIndex: 2,
        position: 'absolute',
        width: '100%',
        height: HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '80%',
          height: '70%',
          backgroundColor: 'white',
          borderRadius: 5,
        }}>
        <ScrollView>
          {list.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() => {
                  setModalState({
                    currentOne: state.modalFor == 0 ? item : state.currentOne,
                    currentTwo: state.modalFor == 1 ? item : state.currentTwo,
                    modal: false,
                  });
                }}
                style={{
                  width: '100%',
                  paddingVertical: 20,
                  paddingHorizontal: 30,
                  borderBottomWidth: 1,
                  borderColor: '#2e9696',
                }}>
                <Text style={{fontSize: 20}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setModalState({modal: false})}
          activeOpacity={0.6}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: '#5bdfc3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="x" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
