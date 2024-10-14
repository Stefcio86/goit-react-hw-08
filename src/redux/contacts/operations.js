import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const newContact = {
        name,
        number: JSON.stringify(number),
      };
      const response = await axios.post(`/contacts`, newContact);
      toast.success("Contact added!");
      return response.data;
    } catch (e) {
      toast.error("Failed to add contact.");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      toast.error("Contact deleted!");
      return response.data, { id: contactId };
    } catch (e) {
      toast.error("Failed to add contact.");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const editContact = createAsyncThunk(
    "contacts/editContact",
    async ({ id, name, number }, thunkAPI) => {
      try {
        const response = await axios.patch(`/contacts/${id}`, { name, number });
        toast.success("Contact updated successfully!");
        return response.data;
      } catch (e) {
        toast.error("Failed to update contact.");
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
