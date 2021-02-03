import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductItem = ({item, upperButtonAction, lowerButtonAction}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <View style={styles.containerStyle}>
        <View style={styles.imageContainerStyle}>
          {isLoading ? (
            <View style={styles.imageIndicatorStyle}>
              <ActivityIndicator color="deepskyblue" />
            </View>
          ) : null}
          <Image
            style={styles.imageStyle}
            source={{uri: item.photo}}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.mainTextStyle}>{item.code}</Text>
          <Text style={styles.subTextStyle}>{item.name}</Text>
          <Text style={styles.subTextStyle}>{item.price}</Text>
          <Text style={[styles.subTextStyle, {color: 'gray'}]}>
            {item.lastUpdated}
          </Text>
        </View>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            onPress={() => upperButtonAction(item)}
            style={styles.buttonStyle}>
            <MaterialCommunityIcons name="pencil" color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => lowerButtonAction(item)}
            style={[styles.buttonStyle, {backgroundColor: 'red'}]}>
            <MaterialCommunityIcons name="delete" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 8,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 4,
  },
  imageContainerStyle: {
    width: 100,
    height: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
  },
  textContainerStyle: {
    flex: 4,
    flexDirection: 'column',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  mainTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  subTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    backgroundColor: 'deepskyblue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default ProductItem;
