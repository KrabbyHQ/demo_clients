import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockChats } from '../../(routes)/(chat)/mocks';

// ----------------------------------------------------------------
// Interfaces based on schema.sql
// ----------------------------------------------------------------

export interface Room {
  id: number | string;
  room_name?: string;
  is_group: boolean;
  created_by?: number;
  co_member?: number;
  co_members: number[];
  room_profile_image?: string;
  bookmarked_by: number[];
  archived_by: number[];
  pinned_by: number[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface ChatHomeState {
  isLoading: boolean;
  error: string | null;
  chats: Room[];
}

const initialState: ChatHomeState = {
  isLoading: false,
  error: null,
  chats: mockChats.map((chat) => ({
    id: parseInt(chat.id),
    room_name: chat.name,
    is_group: false,
    co_members: [],
    bookmarked_by: [],
    archived_by: [],
    pinned_by: [],
    is_public: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
};

const chatHomeSlice = createSlice({
  name: 'chatHome',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Room>) => {
      state.chats.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addChat, setLoading, setError } = chatHomeSlice.actions;

export default chatHomeSlice.reducer;
