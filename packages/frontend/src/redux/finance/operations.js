import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../global/slice';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    try {
      thunkAPI.dispatch(startLoading());
      setAuthHeader(persistedToken);
      const res = await axios.get('/finance/transactions');
      thunkAPI.dispatch(stopLoading());
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    try {
      thunkAPI.dispatch(startLoading());
      setAuthHeader(persistedToken);
      const res = await axios.get('/finance/balance');
      thunkAPI.dispatch(stopLoading());
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async (transactionData, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    try {
      thunkAPI.dispatch(startLoading());
      setAuthHeader(persistedToken);
      const res = await axios.post('/finance/transactions', transactionData);
      thunkAPI.dispatch(stopLoading());
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async (transactionId, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is missing');
    }

    try {
      thunkAPI.dispatch(startLoading());
      setAuthHeader(persistedToken);
      await axios.delete(`/finance/transactions/${transactionId}`);
      thunkAPI.dispatch(stopLoading());
      return transactionId;
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
