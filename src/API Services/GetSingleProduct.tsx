import BaseURL from './Base URL/BaseURL';
import Product from '../Model/Product';

const GetSingleProduct = async (id: number): Promise<Product> => {
    try {
        const response = await BaseURL.get(`/products/${id}`);
        const apiProduct = response.data;
        const productResponse = new Product(apiProduct);
        return Promise.resolve(productResponse);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};
  
export default GetSingleProduct;
