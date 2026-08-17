// Test 1 → Component renders correctly
// Test 2 → Flashcard terms displayed
// Test 3 → Selecting term changes card
// Test 4 → Next works
// Test 5 → Previous works
// Test 6 → Invalid group

import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import FlashcardDetails from "./FlashcardDetails";

vi.mock("../components/ShareModel", () => ({
  default: () => <div>Share Model</div>,
}));

const mockFlashcards = [
  {
    id: 1,
    title: "JavaScript",
    description: "JavaScript interview flashcards",
    terms: [
      {
        cardid: 1,
        term: "Closure",
        definition: "A function with access to its outer scope.",
        image: "",
      },
    ],
  },
];

const store = configureStore({
  reducer: {
    flashcard: () => ({
      flashcards: mockFlashcards,
    }),
  },
});

describe("FlashcardDetails", () => {
  test("should render flashcard details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/flashcard/1"]}>
          <Routes>
            <Route path="/flashcard/:id" element={<FlashcardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  test("should display Flashcard group not found when ID does not exist", () => {
    const store = configureStore({
      reducer: {
        flashcard: () => ({
          flashcard: [
            {
              id: 1,
              title: "JavaScript",
              description: "JavaScript flashcards",
              terms: [],
            },
          ],
        }),
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/flashcard/1"]}>
          <Routes>
            <Route path="/flashcard/:id" element={<FlashcardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Flashcard group not found.")).toBeInTheDocument();
  });

  test("should display the correct flashcard group based on URL ID", () => {
    const store = configureStore({
      reducer: {
        flashcard: () => ({
          flashcards: [
            {
              id: 1,
              title: "JavaScript",
              description: "JavaScript flashcards",
              terms: [],
            },
            {
              id: 2,
              title: "React",
              description: "React flashcards",
              terms: [],
            },
          ],
        }),
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/flashcard/2"]}>
          <Routes>
            <Route path="/flashcard/:id" element={<FlashcardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("React flashcards")).toBeInTheDocument();
  });
});
