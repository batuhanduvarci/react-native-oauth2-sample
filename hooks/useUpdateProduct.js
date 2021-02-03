import {useState} from 'react';
import service from '../api/service';

export default () => {
  const [updateResponse, setUpdateResponse] = useState();

  const updateProduct = async (product) => {
    // const response = await service.put('/product', {
    //   data: product,
    // });
    try {
      const response = product;
      setTimeout(() => {
        setUpdateResponse(response);
      }, 1500);
    } catch (error) {}
  };

  return [updateProduct, updateResponse];
};
