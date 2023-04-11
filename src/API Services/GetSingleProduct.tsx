import BaseURL from './Base URL/BaseURL';

interface Product {
    id: number;
    title: string;
    price: number;
    brand: string;
    stock: number;
    description: string;
    rating: number;
    category: string;
    images: string[];
}

const GetSingleProduct = async (id: number): Promise<Product> => {
    try {
        const response = await BaseURL.get(`/products/${id}`);
        console.log(id);
        console.log(response);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};
  
export default GetSingleProduct;
  
