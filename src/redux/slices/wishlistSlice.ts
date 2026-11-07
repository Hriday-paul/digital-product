import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IService } from "../types";

export interface WishlistState {
    items: IService[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, { payload }: PayloadAction<IService>) => {
            const existingIndex = state.items.findIndex(
                (item) =>
                    (item.id && payload.id && item.id === payload.id) ||
                    (item.slug && payload.slug && item.slug === payload.slug)
            );

            if (existingIndex > -1) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push(payload);
            }
        },

        addToWishlist: (state, { payload }: PayloadAction<IService>) => {
            const exists = state.items.some(
                (item) =>
                    (item.id && payload.id && item.id === payload.id) ||
                    (item.slug && payload.slug && item.slug === payload.slug)
            );
            if (!exists) {
                state.items.push(payload);
            }
        },

        removeFromWishlist: (state, { payload }: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== payload && item.slug !== payload
            );
        },

        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const {
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
