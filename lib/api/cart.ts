import axios from "./axios";
import { API } from "./endpoints";

export const getCart = async () => {
  try {
    const response = await axios.get(API.CART.GET);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch cart');
  }
};

export const addToCart = async (itemData: any) => {
  try {
    const response = await axios.post(API.CART.ADD, itemData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to add item to cart');
  }
};

export const updateCartItem = async (productId: string, quantity: number) => {
  try {
    const response = await axios.put(API.CART.UPDATE_ITEM(productId), { quantity });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to update cart item');
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    const response = await axios.delete(API.CART.REMOVE_ITEM(productId));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to remove item from cart');
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.delete(API.CART.CLEAR);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to clear cart');
  }
};
