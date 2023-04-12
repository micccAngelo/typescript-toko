import BaseURL from './Base URL/BaseURL';
import Product from '../Model/Product';

const GetProductbyCategory = async (selectedCategory: string): Promise<Array<Product>> => {
    try {
        const response = await BaseURL.get(`/products/category/${selectedCategory}`);
        const apiProducts = response.data.products;
        const products: Array<Product> = apiProducts.map((apiProduct: any) => new Product(apiProduct));
        return Promise.resolve(products);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};

export default GetProductbyCategory;
