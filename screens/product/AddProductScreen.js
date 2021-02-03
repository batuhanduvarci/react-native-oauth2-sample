import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomButton from '../../components/button/CustomButton';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import faker from 'faker';
import useCreatePhoto from '../../hooks/useCreatePhoto';
import useAddProduct from '../../hooks/useAddProduct';

const AddProductScreen = ({navigation}) => {
  const [createPhoto, createPhotoResponse] = useCreatePhoto();
  const [addProduct, addResponse] = useAddProduct();
  const [productToAdd, setProductToAdd] = useState({});
  const [isAddLoading, setIsAddLoading] = useState(false);

  const showImagePicker = () => {
    launchImageLibrary('photo', (response) => {
      if (!response.didCancel) {
        setProductToAdd({...productToAdd, photo: response});
      }
    });
  };

  const codeTextHandler = (value) => {
    setProductToAdd({...productToAdd, code: value});
  };

  const nameTextHandler = (value) => {
    setProductToAdd({...productToAdd, name: value});
  };

  const priceTextHandler = (value) => {
    setProductToAdd({...productToAdd, price: value});
  };

  const showPriceAlert = () => {
    Alert.alert(
      'Warning',
      'Price is higher than 999. Do you confirm?',
      [
        {
          text: 'Yes',
          onPress: () => add(true),
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const proceed = () => {
    if (productToAdd.price > 999) {
      showPriceAlert();
    } else {
      add();
    }
  };

  const add = (isUserConfirmed) => {
    const generatedId = faker.random.uuid();
    var currentTime = new Date();

    setIsAddLoading(true);

    setProductToAdd({
      ...productToAdd,
      id: generatedId,
      lastUpdated: currentTime.toUTCString(),
      isUserConfirmed: isUserConfirmed,
    });

    createPhoto();
  };

  useEffect(() => {
    if (productToAdd.id && productToAdd.lastUpdated && productToAdd.photo) {
      addProduct(productToAdd);
    }
  }, [productToAdd]);

  useEffect(() => {
    console.log('Photo path => ', JSON.stringify(productToAdd));
    setProductToAdd({...productToAdd, photo: {uri: createPhotoResponse}});
  }, [createPhotoResponse]);

  useEffect(() => {
    if (addResponse) {
      console.log('Added product => ', JSON.stringify(addResponse));
      setIsAddLoading(false);
    }
  }, [addResponse]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.containerStyle}>
          {isAddLoading ? (
            <ActivityIndicator size="large" color="deepskyblue" />
          ) : (
            <>
              <View style={styles.bodyContainerStyle}>
                <>
                  <View style={styles.imageContainerStyle}>
                    {productToAdd.photo ? (
                      <Image
                        style={styles.imageStyle}
                        source={{
                          uri: productToAdd.photo.uri,
                        }}
                        onLoadEnd={() => {}}
                      />
                    ) : null}
                    <TouchableOpacity
                      style={styles.imageButtonStyle}
                      onPress={() => {
                        showImagePicker();
                      }}>
                      <MaterialCommunityIcons
                        name="pencil"
                        color={'white'}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                  <CustomTextInput
                    placeholder={productToAdd.id || 'Id'}
                    isEnabled={false}
                  />
                  <CustomTextInput
                    placeholder={productToAdd.code || 'Code'}
                    updateAction={codeTextHandler}
                  />
                  <CustomTextInput
                    placeholder={productToAdd.name || 'Name'}
                    updateAction={nameTextHandler}
                  />
                  <CustomTextInput
                    placeholder={productToAdd.price || 'Price'}
                    updateAction={priceTextHandler}
                    inputType="numeric"
                  />
                  <CustomTextInput
                    placeholder={productToAdd.lastUpdated || 'Last Update'}
                    isEnabled={false}
                  />
                  <CustomButton
                    buttonText="Add"
                    buttonStyle={styles.buttonStyle}
                    buttonAction={proceed}
                  />
                </>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  bodyContainerStyle: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  imageContainerStyle: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'lightgray',
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
  imageButtonStyle: {
    position: 'absolute',
    end: 8,
    top: 8,
    marginLeft: 8,
    backgroundColor: 'deepskyblue',
    borderRadius: 4,
    padding: 4,
  },
  buttonStyle: {
    marginTop: 32,
  },
});

export default AddProductScreen;
