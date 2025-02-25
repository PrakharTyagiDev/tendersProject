import React from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const CustomInput = props => {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'center',
        marginBottom: 5,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        returnKeyType={'done'}
        disabled={props.disabled}
        editable={props.editable}
        secureTextEntry={props.secure}
        mode="outlined"
        outlineStyle={props.outlineStyle}
        style={[
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
          props.style,
        ]}
        theme={{
          colors: {
            primary: '#000000',
          },
        }}
        outlineColor={'#000000'}
        textColor={'#000000'}
        value={props.value}
        placeholder={props.placeholder}
        label={
          props.label && (
            <Text
              style={[
                {
                  fontSize: 15,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
                props.labelStyle,
              ]}>
              {props.label}
            </Text>
          )
        }
        placeholderTextColor={'grey'}
        onChangeText={props.onChange}
        keyboardType={props.keyboard}
        maxLength={props.maxLength == undefined ? 100 : props.maxLength}
        multiline={props.multiline == undefined ? true : props.multiline}
        error={props.invalid}
        onBlur={props.onBlur}
      />
      {props.invalid && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
          }}>
          {props.invalidText}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
