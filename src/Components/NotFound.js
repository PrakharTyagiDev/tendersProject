import React from 'react';
import { Text, View } from 'react-native';

const NotFound = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      {props.title ? (
        <Text
          style={[
            {
              fontSize: 20,
            },
          ]}>
          {props.title}
        </Text>
      ) : null}

      {props.message ? (
        <Text
          style={[
            {
              fontSize: 16,
              textAlign: 'center',
              marginTop: 20,
            },
            fontcolor,
          ]}>
          {props.message}
        </Text>
      ) : null}
    </View>
  );
};

export default NotFound;
