import {useState} from 'react';
import service from '../api/service';

export default () => {
  const [deleteResponse, setDeleteResponse] = useState();

  const deleteProduct = async (product) => {
    // const response = await service.delete('/product', {
    //   data: product,
    // });
    try {
      const response = {};
      setTimeout(() => {
        setDeleteResponse(response);
      }, 1500);
    } catch (error) {}
  };

  return [deleteProduct, deleteResponse];
};
