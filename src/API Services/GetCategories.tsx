import BaseURL from './Base URL/BaseURL';

const GetCategories = async (): Promise<Array<string>> => {
    try {
        const response = await BaseURL.get('/products/categories');
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
};

export default GetCategories;
