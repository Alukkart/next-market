import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";


export interface CartState {
    loading: boolean
    error: boolean
    totalAmount: number
    items: CartStateItem[]

    // Получение товаров из корзины
    fetchCartItems: () => Promise<void>

    // Обновление количества товара
    updateItemQuantity: (id: number, quantity: number) => Promise<void>

    // Добавление товара в корзину
    addCartItem: (values: CreateCartItemValues) => Promise<void>

    // Удаление товара из корзины
    removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set(state => ({ loading: true, error: false, items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item)  }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
        } catch (error) {
            set({ error: true });
            console.error(error);
        } finally {
            set({ loading: false });
            set(state => ({
                loading: false,
                items: state.items.map((item) =>  ({ ...item, disabled: false }))
            }));
        }
    }
}));


