/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { createSlice } from '@reduxjs/toolkit';

/*----------------------------------------------------------------------------*/
/* newProductSlice                                                            */
/*----------------------------------------------------------------------------*/

let initialState = {
  image: { value: '', invalid: null, invalidText: '' },
  status: { value: 'uploading' },
};

export const newProductSlice = createSlice({
  name: 'createProduct',
  initialState: { ...initialState },
  reducers: {
    setData: (state, { payload }) => {
      state[payload.target].value = payload.value;
    },
    setProductValidation: (state, { payload }) => {
      state[payload.target].invalid = payload.invalid;
      state[payload.target].invalidText = payload.invalidText;
    },
    addNewProduct: (state, { payload }) => {
      state.products.push(payload);
    },
    reset: (state, { payload }) => {
      return { ...initialState };
    },
  },
});

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export const { addNewProduct, reset, setData, setProductValidation } =
  newProductSlice.actions;

export const setAllProduct = (state) => state.createProduct;

export default newProductSlice.reducer;
