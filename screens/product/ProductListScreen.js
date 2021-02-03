import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ProductItem from './ProductItem';
import useGetProducts from '../../hooks/useGetProducts';
import useDeleteProduct from '../../hooks/useDeleteProduct';
import UpdateProductScreen from './UpdateProductScreen';

const ProductListScreen = ({navigation}) => {
  const [getProducts, products] = useGetProducts();
  const [deleteProduct, deleteResponse] = useDeleteProduct();
  const [refresh, setRefresh] = useState(false);
  const [modalData, setModalData] = useState({isVisible: false, product: null});

  const deleteProductAction = async (product) => {
    deleteProduct(product, products)
      .then(() => {
        getProducts();
      })
      .then(() => {
        setRefresh(true);
      });
  };

  const showUpdateProductModal = (product) => {
    setModalData({isVisible: true, product: product});
  };

  const setModalVisibility = (isVisible) => {
    setModalData({...modalData, isVisible: isVisible});
  };

  const renderItem = ({item}) => (
    <ProductItem
      item={item}
      upperButtonAction={showUpdateProductModal}
      lowerButtonAction={deleteProductAction}
    />
  );

  useEffect(() => {
    if (deleteResponse) {
      console.log('Deleted product =>', JSON.stringify(deleteResponse));
    }
  }, [deleteResponse]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.containerStyle}>
          {products !== undefined ? (
            <FlatList
              data={products}
              renderItem={renderItem}
              extraData={refresh}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <ActivityIndicator size="large" color="deepskyblue" />
          )}
        </View>
        <UpdateProductScreen
          modalData={modalData}
          setModalVisibility={setModalVisibility}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: 'white'},
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ProductListScreen;
