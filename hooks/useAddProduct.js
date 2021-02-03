import {useState} from 'react';
import service from '../api/service';

export default () => {
  const [addResponse, setAddResponse] = useState();

  const addProduct = async (product) => {
    // const response = await service.put('/product', {
    //   data: product,
    // });
    try {
      const response = product;
      setTimeout(() => {
        setAddResponse(response);
      }, 1500);
    } catch (error) {}
  };

  return [addProduct, addResponse];
};
