import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';

const LoginScreen = ({navigation}) => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const submitData = async () => {
    if (contact == 'Admin') {
      navigation.replace('AdminScreen');
    } else if (contact == 'bid') {
      navigation.replace('BidsManagement');
    } else {
      navigation.replace('UserScreen');
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text style={[styles.mainHeading]}>{'Login'}</Text>
        <View
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <CustomInput
            editable={true}
            value={contact}
            placeholder={'Username'}
            multiline={false}
            onChange={text => {
              setContact(text);
            }}
          />
          <CustomInput
            editable={true}
            value={password}
            placeholder={'Password'}
            onChange={text => {
              setPassword(text);
            }}
            secure={true}
            multiline={false}
          />
        </View>

        <View style={{marginTop: 10, width: '70%'}}>
          <CustomButton
            disabled={contact == '' || password == ''}
            title={'Login'}
            onPress={() => {
              submitData();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
