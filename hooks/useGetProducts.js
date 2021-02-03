import {useEffect, useState} from 'react';
import service from '../api/service';
import {generateProductData} from '../utils/MockDataUtils';

export default () => {
  const [products, setProducts] = useState();

  const getProducts = async (productId) => {
    //const response = await service.get(`/product/${productId}`, {});
    try {
      const response = generateProductData(10);
      setTimeout(() => {
        setProducts(response);
      }, 1500);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return [getProducts, products, setProducts];
};
