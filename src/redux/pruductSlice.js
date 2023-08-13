import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  allProducts: [],
  category: [],
  filterProducts: [],
  productsInCard: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return {
        ...state,
        allProducts: action.payload.flat(),
      };
    },
    setCategory: (state, action) => {
      return {
        ...state,
        category: action.payload.map((item) => item.rname),
      };
    },
    setProductFilters: (state, action) => {
      return {
        ...state,
        filterProducts: [...action.payload].flat(),
      };
    },
    setDeleteProductFromCard: (state, action) => {
      const { productId } = action.payload;
      return (state = {
        ...state,
        productsInCard: [
          ...state.productsInCard.filter((item) => item.gid !== productId),
        ],
      });
    },
    setUpdateProductCard: (state, action) => {
      const { productId, quantity, totalAmount } = action.payload;
      return (state = {
        ...state,
        productsInCard: [
          ...state.productsInCard.map((item) =>
            item.gid === productId
              ? { ...item, quantity: quantity, totalAmount: totalAmount }
              : item
          ),
        ],
      });
    },
    setProductToCard: (state, action) => {
      return (state = {
        ...state,
        productsInCard: [...state.productsInCard, action.payload],
      });
    },
  },
});

export const {
  setProduct,
  setProductFilters,
  setCategory,
  setProductToCard,
  setDeleteProductFromCard,
  setUpdateProductCard,
} = productsSlice.actions;
export default productsSlice.reducer;
