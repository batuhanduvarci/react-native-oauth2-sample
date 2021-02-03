import React, {useState} from 'react';
import {StyleSheet, TextInput, Platform} from 'react-native';

const CustomTextInput = ({
  placeholder,
  updateUserData,
  updateAction,
  isEnabled,
  inputType,
}) => {
  const [borderColor, setBorderColor] = useState('lightgray');

  return (
    <TextInput
      style={[styles.textInputStyle, {borderColor: borderColor}]}
      placeholder={placeholder}
      numberOfLines={1}
      autoCapitalize="none"
      autoCompleteType="off"
      autoCorrect={Platform.OS == 'ios' ? 'false' : null}
      keyboardType={inputType ? inputType : 'default'}
      secureTextEntry={placeholder == 'Password' ? true : false}
      onFocus={(e) => {
        setBorderColor('darkgray');
      }}
      onBlur={() => {
        setBorderColor('lightgray');
      }}
      onChangeText={(text) => {
        updateUserData ? updateUserData(text, placeholder) : updateAction(text);
      }}
      editable={isEnabled == undefined ? true : isEnabled}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 32,
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});

export default CustomTextInput;
