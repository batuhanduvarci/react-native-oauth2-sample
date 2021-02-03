import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform
} from 'react-native';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/button/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import faker from 'faker';
import useUpdateProduct from '../../hooks/useUpdateProduct';

const UpdateProductScreen = ({modalData, setModalVisibility}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [updateProduct, updateResponse] = useUpdateProduct();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const product = modalData.product;

  const showImagePicker = () => {
    launchImageLibrary('photo', (response) => {
      if (!response.didCancel) {
        setUpdatedProduct({...updatedProduct, photo: response});
      } else {
        setUpdatedProduct({...updatedProduct, photo: faker.image.imageUrl()});
      }
    });
  };

  const codeTextHandler = (value) => {
    setUpdatedProduct({...updatedProduct, code: value});
  };

  const nameTextHandler = (value) => {
    setUpdatedProduct({...updatedProduct, name: value});
  };

  const priceTextHandler = (value) => {
    setUpdatedProduct({...updatedProduct, price: value});
  };

  const update = () => {
    var currentTime = new Date();
    const promise = new Promise((resolve) => {
      setUpdatedProduct({
        ...updatedProduct,
        lastUpdated: currentTime.toUTCString(),
      });
      resolve();
    });

    promise
      .then((response) => {
        updateProduct(updatedProduct);
        setIsUpdateLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (modalData.product) {
      setUpdatedProduct(modalData.product);
    }
  }, [modalData.isVisible]);

  useEffect(() => {
    console.log('Updated product => ', updateResponse);
    setIsUpdateLoading(false);
  }, [updateResponse]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalData.isVisible}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView contentContainerStyle={{flex: Platform.OS == "ios" ? 1 : null}}>
            <View style={styles.containerStyle}>
              {isUpdateLoading ? (
                <ActivityIndicator size="large" color="deepskyblue" />
              ) : (
                <>
                  <View style={styles.headerContainerStyle}>
                    <TouchableOpacity
                      style={styles.headerButtonStyle}
                      onPress={() => {
                        setModalVisibility(false);
                      }}>
                      <MaterialCommunityIcons
                        name="arrow-left"
                        color={'black'}
                        size={24}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.headerTextStyle}>Update Product</Text>
                    </View>
                  </View>
                  <View style={styles.bodyContainerStyle}>
                    {product ? (
                      <>
                        <View style={styles.imageContainerStyle}>
                          {isLoading ? (
                            <View style={styles.imageIndicatorStyle}>
                              <ActivityIndicator color="deepskyblue" />
                            </View>
                          ) : null}
                          {updatedProduct &&
                          updatedProduct.photo.uri != null ? (
                            <Image
                              style={styles.imageStyle}
                              source={{
                                uri: updatedProduct.photo.uri,
                              }}
                              onLoadEnd={() => setIsLoading(false)}
                            />
                          ) : product.photo != null ? (
                            <Image
                              style={styles.imageStyle}
                              source={{
                                uri: product.photo,
                              }}
                              onLoadEnd={() => setIsLoading(false)}
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
                          placeholder={product.id}
                          isEnabled={false}
                        />
                        <CustomTextInput
                          placeholder={
                            updatedProduct ? updatedProduct.code : product.code
                          }
                          updateAction={codeTextHandler}
                        />
                        <CustomTextInput
                          placeholder={
                            updatedProduct ? updatedProduct.name : product.name
                          }
                          updateAction={nameTextHandler}
                        />
                        <CustomTextInput
                          placeholder={
                            updatedProduct
                              ? updatedProduct.price
                              : product.price
                          }
                          updateAction={priceTextHandler}
                          inputType="numeric"
                        />
                        <CustomTextInput
                          placeholder={
                            updatedProduct
                              ? updatedProduct.lastUpdated
                              : product.lastUpdated
                          }
                          isEnabled={false}
                        />
                        <CustomButton
                          buttonText="Update"
                          buttonStyle={styles.buttonStyle}
                          buttonAction={update}
                        />
                      </>
                    ) : null}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  headerContainerStyle: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  headerButtonStyle: {position: 'absolute', start: 0, marginLeft: 8},
  headerTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
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

export default UpdateProductScreen;
