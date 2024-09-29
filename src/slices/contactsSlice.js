import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66f94ef4afc569e13a986a95.mockapi.io/contacts';

const initialState = {
    items: [],
    loading: false,
    error: null,
};


export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
    const response = await axios.post(API_URL, newContact);
    return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId; 
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(contact => contact.id !== action.payload);
            });
    },
});

export default contactsSlice.reducer;
