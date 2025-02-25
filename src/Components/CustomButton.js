import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = props => {

  return (
    <View
      style={{
        width: '100%',
        marginTop: '2%',
      }}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          {
            backgroundColor: props.disabled
              ? 'grey'
              : '#000000',
            padding: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
            borderRadius: 5,
            marginBottom: 10,
            flexDirection: 'row',
            alignSelf: 'center',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          props.style,
        ]}>
        {props.isLoading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <ActivityIndicator size="small" color={'#ffffff'} />
          </View>
        )}
        <Text
          style={[
            {
              color: 'white',
              fontSize: 20,
            },
            props.titleStyle,
          ]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
