import BaseURL from './Base URL/BaseURL';

interface Product {
    id: number;
    title: string;
    price: number;
    brand: string;
    stock: number;
    description: string;
    category: string;
    images: string[];
}

const Search = async (query: string): Promise<Array<Product>> => {
    try {
        const response = await BaseURL.get(`/products/search?${query}`);
        console.log(response.data.products);
        console.log(response);
        console.log(query);
        return Promise.resolve(response.data.products);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};
  
export default Search;