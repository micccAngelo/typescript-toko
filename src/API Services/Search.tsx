import BaseURL from './Base URL/BaseURL';
import Product from '../Model/Product';

const Search = async (query: string): Promise<Array<Product>> => {
    try {
        const response = await BaseURL.get(`/products/search?${query}`);
        const apiProducts = response.data.products;
        const products = apiProducts.map((apiProduct: any) => new Product(apiProduct));
        return Promise.resolve(products);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};

export default Search;
