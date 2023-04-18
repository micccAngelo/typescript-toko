import BaseURL from './Base URL/BaseURL';
import Product from '../Model/Product';

const GetAllProduct = async (): Promise<Array<Product>> => {
    try {
        const response = await BaseURL.get('/products');
        const apiProducts = response.data.products;
        const products = apiProducts.map((apiProduct: Product) => new Product(apiProduct));
        return Promise.resolve(products);
    } catch (error) {
        console.log(error);
        return Promise.reject('Failed to fetch products from server');
    }
};

export default GetAllProduct;
