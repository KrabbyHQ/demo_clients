import { createSlice } from '@reduxjs/toolkit';

// ------------------------------------------------
// Initial state for the newChatModal slice
// ------------------------------------------------

interface NewChatModalState {
  isOpen: boolean;
}

const initialState: NewChatModalState = {
  isOpen: false,
};

// ---------------------------------------------------
// Create the newChatModal slice using createSlice
// ---------------------------------------------------

const newChatModalSlice = createSlice({
  name: 'newChatModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

// -------------------------------------------------------------------
// Export the actions and reducer for use in the app
// -------------------------------------------------------------------

export const { openModal, closeModal } = newChatModalSlice.actions;

export default newChatModalSlice.reducer;
