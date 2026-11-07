import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServiceVariant } from "../types";

export interface ICartItem {
    serviceId: string;
    slug?: string;
    title: string;
    photo: string;
    categoryName?: string;
    variant: IServiceVariant;
    quantity: number;
}

export interface CartState {
    items: ICartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            { payload }: PayloadAction<Omit<ICartItem, "quantity"> & { quantity?: number }>
        ) => {
            const qtyToAdd = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;
            const existingIndex = state.items.findIndex(
                (item) =>
                    item.serviceId === payload.serviceId &&
                    item.variant.id === payload.variant.id
            );

            if (existingIndex > -1) {
                state.items[existingIndex].quantity += qtyToAdd;
                // Keep latest metadata synced
                state.items[existingIndex].title = payload.title;
                state.items[existingIndex].photo = payload.photo;
                state.items[existingIndex].variant = payload.variant;
                if (payload.slug) state.items[existingIndex].slug = payload.slug;
                if (payload.categoryName) state.items[existingIndex].categoryName = payload.categoryName;
            } else {
                state.items.push({
                    serviceId: payload.serviceId,
                    slug: payload.slug,
                    title: payload.title,
                    photo: payload.photo,
                    categoryName: payload.categoryName,
                    variant: payload.variant,
                    quantity: qtyToAdd,
                });
            }
        },

        removeFromCart: (
            state,
            { payload }: PayloadAction<{ serviceId: string; variantId: string }>
        ) => {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.serviceId === payload.serviceId &&
                        item.variant.id === payload.variantId
                    )
            );
        },

        updateCartQuantity: (
            state,
            {
                payload,
            }: PayloadAction<{ serviceId: string; variantId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (i) =>
                    i.serviceId === payload.serviceId &&
                    i.variant.id === payload.variantId
            );
            if (!item) return;

            if (payload.quantity <= 0) {
                state.items = state.items.filter(
                    (i) =>
                        !(
                            i.serviceId === payload.serviceId &&
                            i.variant.id === payload.variantId
                        )
                );
            } else {
                item.quantity = payload.quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
