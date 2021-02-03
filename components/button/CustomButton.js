import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({
  buttonText,
  buttonAction,
  buttonStyle,
  buttonTextStyle,
  iconSrc,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle]}
      onPress={() => buttonAction()}>
      {iconSrc ? (
        iconSrc
      ) : (
        <Text
          style={buttonTextStyle ? buttonTextStyle : styles.buttonTextStyle}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: 'deepskyblue',
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 32,
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
  },
});

export default CustomButton;
