import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';

import {Modal} from '../Modal';
import Icon from 'react-native-vector-icons/Feather';

export class ExchangeDroid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOne: 'TRY',
      currentTwo: 'USD',
      value: '1',
      modal: false,
      modalFor: 0,
      data: null,
    };
  }

  componentDidMount = () => {
    this._getData(this.state.currentOne);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState != this.state) {
      if (prevState.currentOne != this.state.currentOne) {
        this._getData(this.state.currentOne);
      }
    }
  };

  _onSelectCurrentOne = () => {};

  _setState = state => {
    this.setState({...state});
  };

  _getData = baseCurrency => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then(async res => {
        if (res.ok) {
          const response = await res.json();
          this.setState({data: response});
        } else {
          console.log('HATA, then else');
        }
      })
      .catch(err => {
        console.log('HATA, catch');
      });
  };

  render() {
    const {currentOne, currentTwo, modal, modalFor, value, data} = this.state;

    return (
      <>
        <View style={Styles.content}>
          <Text style={Styles.title}>{'Exchange'}</Text>
        </View>
        <View style={Styles.flexItem}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.setState({modal: true, modalFor: 0});
            }}
            style={Styles.currencyIcon}>
            <Text style={Styles.currencyText}>{currentOne}</Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
            }}>
            <TextInput
              onChangeText={text => this.setState({value: text})}
              value={value}
              style={Styles.textarea}
              keyboardType="numeric"
            />
            {parseInt(this.state.value) > 1 && (
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontFamily: 'SFUIDisplay-Light',
                }}>
                {'1 ' +
                  currentOne +
                  ' = ' +
                  data.rates[currentTwo] +
                  ' ' +
                  currentTwo}
              </Text>
            )}
          </View>
        </View>
        <View style={Styles.flexItem}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.setState({currentOne: currentTwo, currentTwo: currentOne});
            }}
            style={Styles.exchangeIcon}>
            <Icon name="refresh-cw" color="rgba(46, 150, 150, 0.6)" size={28} />
          </TouchableOpacity>
          <TextInput
            value="0.00"
            style={[Styles.textarea, {opacity: 0}]}
            editable={false}
          />
        </View>
        <View style={Styles.flexItem}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.setState({modal: true, modalFor: 1});
            }}
            style={Styles.currencyIcon}>
            <Text style={Styles.currencyText}>{currentTwo}</Text>
          </TouchableOpacity>
          <TextInput
            editable={false}
            value={
              data
                ? (data.rates[currentTwo] * parseFloat(value || '1'))
                    .toString()
                    .substr(0, 8)
                : '-'
            }
            style={[Styles.textarea, {borderBottomWidth: 0}]}
            keyboardType="numeric"
          />
        </View>
        {modal && (
          <Modal
            modalFor={modalFor}
            state={this.state}
            setModalState={this._setState}
          />
        )}
      </>
    );
  }
}

export const Styles = StyleSheet.create({
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: 'SFUIDisplay-Thin',
    color: 'white',
    marginBottom: 30,
  },
  flexItem: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyIcon: {
    zIndex: 1,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  currencyText: {
    fontSize: 22,
    fontFamily: 'SFUIDisplay-Light',
    color: '#2e9696',
    fontWeight: '100',
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
    fontFamily: 'SFUIDisplay-Thin',
    color: 'white',
    padding: 5,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
