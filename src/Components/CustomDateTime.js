import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CustomDateTime = props => {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'center',
        marginVertical: 5,
      }}>
      <Text
        style={{
          backgroundColor: 'transparent',
          zIndex: 1,
          fontSize: 14,
          color: 'black',
          marginBottom: 5,
          marginLeft: 5,
        }}>
        {props.label}
      </Text>
      <TouchableOpacity
        onPress={props.onClick}
        disabled={props.disabled}
        style={[
          {
            width: '100%',
          },
        ]}>
        <View
          style={[
            {
              height: 50,
              paddingHorizontal: 10,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: '#000000',
                  width: '100%',
              justifyContent:"center"
            },
          ]}>
          {props.value != '' && props.value ? (
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
              }}>
              {props.value.toString()}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                color: '#3a3b3a' ,
              }}>
              {props.placeholder}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDateTime;
