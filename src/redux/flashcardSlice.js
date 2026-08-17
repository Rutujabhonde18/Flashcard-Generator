import { createSlice } from "@reduxjs/toolkit";
import {getFlashcards, saveFlashcards, removeFlashcards} from "../utils/localStorage";

const initialState = {
  flashcards: getFlashcards(),
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
      saveFlashcards(state.flashcards);
    },
    deleteFlashcard: (state, action) => {
      state.flashcards = removeFlashcards(action.payload);
    },
  },
});

export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
