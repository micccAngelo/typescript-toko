import BaseURL from './Base URL/BaseURL';

const DeleteProduct = async (id: number): Promise<void> => {
    try {
        const response = await BaseURL.delete(`/products/${id}`);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
  };
  
export default DeleteProduct;
