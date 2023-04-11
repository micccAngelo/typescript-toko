import BaseURL from './Base URL/BaseURL';

interface Product {
    id: number;
    title: string;
    price: number;
    brand: string;
    stock: number;
    description: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const AddProducts = async (values: Product): Promise<Array<Product>> => {
    try {
      const response = await BaseURL.post('/products/add', {
        "values": values,
      });
      return Promise.resolve(response.data.products);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };
  
  export default AddProducts;
  
  