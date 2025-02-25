import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Textarea from 'react-native-textarea';

const DescriptionInput = props => {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 8,
      }}>
      {props.value != '' && props.label ? (
        <Text
          style={[
            {
              position: 'absolute',
              left: 10,
              top: -10,
              zIndex: 1,
              paddingHorizontal: 5,
              fontSize: 12,
              color: '#00000',
            },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      ) : null}
      <Textarea
        disabled={props.disabled}
        containerStyle={[styles.textareaContainer, {borderColor: '#00000'}]}
        style={[
          styles.textarea,
          {
            color: '#00000',
          },
        ]}
        onChangeText={props.onChange}
        defaultValue={props.value}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        placeholderTextColor={'grey'}
        underlineColorAndroid={'transparent'}
      />
    </View>
  );
};

export default DescriptionInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textareaContainer: {
    padding: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#00000',
    paddingBottom: 15,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: 14,
    minHeight: 80,
  },
});
