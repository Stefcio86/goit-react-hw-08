import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import contactsReducer from './slices/contactsSlice';
import filtersReducer from './slices/filtersSlice';

const persistConfig = {
  key: 'root',
  storage,
  // Dodajemy te opcje, aby zezwolić na nie serializowalne wartości
  whitelist: ['contacts', 'filters'], // Reduktory do persistencji
};

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignoruj te akcje
      },
    }),
});

export const persistor = persistStore(store);
