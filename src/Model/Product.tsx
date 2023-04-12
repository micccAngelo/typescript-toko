export default class Product {
    id?: number;
    title: string;
    price: number;
    brand: string;
    stock: number;
    rating: number;
    description: string;
    category: string;
    thumbnail : string;
    images: string[];

    constructor (api:any) {
        this.id = api?.id
        this.title =  api.title
        this.price = api.price
        this.thumbnail = api.thumbnail
        this.brand = api.brand
        this.stock = api.stock
        this.rating = api.rating
        this.description = api.description
        this.category = api.category
        this.images = api.images
    }
}