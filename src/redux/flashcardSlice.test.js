import reducer, { addFlashcard, deleteFlashcard } from "./flashcardSlice";
import {
  getFlashcards,
  saveFlashcards,
  removeFlashcards,
} from "../utils/localStorage";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../utils/localStorage", () => ({
  getFlashcards: vi.fn(() => []),
  saveFlashcards: vi.fn(),
  removeFlashcards: vi.fn((id) => [
    {
      id: 2,
      title: "React",
    },
  ]),
}));

describe("flashcardSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.flashcards).toEqual([]);
  });

  test("should add a flashcard", () => {
    const initialState = {
      flashcards: [],
    };
    const newcard = {
      id: 1,
      title: "JavaScript",
      description: "JavaScript flashcards",
      terms: [],
    };
    const state = reducer(initialState, addFlashcard(newcard));
    expect(state.flashcards).toHaveLength(1);
    expect(state.flashcards[0]).toEqual(newcard);
  });

  test("should save flashcards when adding a flashcard", () => {
    const initialState = {
      flashcards: [],
    };
    const newcard = {
      id: 1,
      title: "JavaScript",
      description: "JavaScript flashcards",
      terms: [],
    };
    let savedFlashcards;

    saveFlashcards.mockImplementation((flashcards) => {
      savedFlashcards = JSON.parse(JSON.stringify(flashcards));
    });
    reducer(initialState, addFlashcard(newcard));
    expect(savedFlashcards).toEqual([newcard]);
  });

  test("should delete a flashcard", () => {
    const initialState = {
      flashcards: [
        {
          id: 1,
          title: "JavaScript",
        },
        {
          id: 2,
          title: "React",
        },
      ],
    };
    const state = reducer(initialState, deleteFlashcard(1));
    expect(removeFlashcards).toHaveBeenCalledWith(1);
    expect(state.flashcards).toEqual([
      {
        id: 2,
        title: "React",
      },
    ]);
  });
});
