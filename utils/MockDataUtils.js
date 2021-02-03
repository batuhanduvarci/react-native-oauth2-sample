import faker from 'faker';

export const generateProductData = (itemCount) => {
  var dataArr = [];
  var tempObject = {};
  for (let index = 0; index < itemCount; index++) {
    tempObject = {
      id: faker.random.uuid(),
      code: faker.random.alphaNumeric(7),
      name: faker.commerce.productName(),
      photo: `${faker.image.imageUrl()}?random=${Date.now()}`,
      price: faker.commerce.price(),
      lastUpdated: faker.date.past().toDateString(),
    };
    dataArr.push(tempObject);
  }
  return dataArr;
};
