import {useState} from 'react';
import service from '../api/service';
import faker from 'faker';

export default () => {
  const [createPhotoResponse, setcreatePhotoResponse] = useState();

  const createPhoto = async (data) => {
    // const response = await service.post('/product/photo', {
    //   data: product,
    // });
    try {
      const response = `${faker.image.imageUrl()}?random=${Date.now()}`;
      setTimeout(() => {
        setcreatePhotoResponse(response);
      }, 1500);
    } catch (error) {}
  };

  return [createPhoto, createPhotoResponse];
};
