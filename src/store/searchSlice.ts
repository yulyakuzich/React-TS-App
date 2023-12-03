import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface FormStateSlice {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  acceptTC: boolean;
  photo: string;
  country: string;
}

const initialState: FormStateSlice = {
  name: '',
  age: 0,
  email: '',
  password: '',
  password_confirm: '',
  gender: '',
  acceptTC: false,
  photo: '',
  country: '',
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<FormStateSlice>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = formSlice.actions;
export const selectForm = (state: RootState) => state.form;
export default formSlice.reducer;
