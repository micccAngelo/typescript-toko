export interface Cart {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    quantity: number;
  }
  
  export interface CartState {
    cartItems: Cart[];
  }