import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import chatHomeReducer from './slices/chat_home_slice';
import newChatModalReducer from './slices/new_chat_modal_slice';

export const store = configureStore({
  reducer: {
    chatHome: chatHomeReducer,
    newChatModal: newChatModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
