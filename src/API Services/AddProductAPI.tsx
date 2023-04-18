import BaseURL from './Base URL/BaseURL';
import Product from '../Model/Product';

const AddProducts = async (values: Product): Promise<Product> => {
  try {
      console.log('values:', values);
      const response = await BaseURL.post('/products/add', values,);
      const apiProduct = response.data;
      console.log('apiProduct:', apiProduct);
      const productResponse = new Product(apiProduct);
      return Promise.resolve(productResponse);
  } catch (error) {
      console.log(error);
      return Promise.reject('Failed to add product');
  }
};


export default AddProducts;
