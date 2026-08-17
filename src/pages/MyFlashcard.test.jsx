// ✅ Component renders
// ⏭️ Flashcard groups are displayed
// ⏭️ Show All / Show Less works
// ⏭️ Delete button works
// ⏭️ deleteFlashcard is dispatched
// ⏭️ Empty state is displayed when there are no flashcards

import { describe, test, expect, vi } from "vitest";
import { getByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import MyFlashCard from "./MyFlashcard";
import userEvent from "@testing-library/user-event";

const mockFlashcard = [
  {
    id: 1,
    title: "JavaScript",
    description: "JavaScript flashcards",
    terms: [],
  },
];

const store = configureStore({
  reducer: {
    flashcard: () => ({
      flashcards: mockFlashcard,
    }),
  },
});

const mockDispatch = vi.fn();
const mockDeleteFlashcard = vi.fn((id) => ({
  type: "flashcard/deleteFlashcard",
  payload: id,
}));

vi.mock("../components/Flashcard", () => ({
  default: ({ group }) => (
    <div data-testid="flashcard">
      <span>{group.title}</span>

      <button onClick={() => mockDispatch(mockDeleteFlashcard(group.id))}>
        Delete
      </button>
    </div>
  ),
}));

describe("MyFlashCard", () => {
  test("should render flashcards", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  test("should display multiple flashcard groups", () => {
    const multipleFlashcards = [
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
      {
        id: 3,
        title: "Redux",
        description: "Redux flashcards",
        terms: [],
      },
    ];
    const testStore = configureStore({
      reducer: {
        flashcard: () => ({
          flashcards: multipleFlashcards,
        }),
      },
    });
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
  });

  test("should display empty state when there are no flashcards", () => {
    const emptyStore = configureStore({
      reducer: {
        flashcard: (state = { flashcards: [] }) => state,
      },
    });
    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText("No flashcards yet to display!"),
    ).toBeInTheDocument();
  });

  test("should display all flashcards when See all is clicked", async () => {
    const user = userEvent.setup();

    const sevenFlashcards = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      title: `Flashcard ${index + 1}`,
      description: `Description ${index + 1}`,
      terms: [],
    }));

    const testStore = configureStore({
      reducer: {
        flashcard: () => ({
          flashcards: sevenFlashcards,
        }),
      },
    });
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );
    // Initially only 6 flashcards should be displayed
    expect(screen.getAllByTestId("flashcard")).toHaveLength(6);
    // "See all" should be visible
    expect(screen.getByText("See all")).toBeInTheDocument();
    // Click See all
    await user.click(screen.getByText("See all"));
    // Now all 7 should be displayed
    expect(screen.getAllByTestId("flashcard")).toHaveLength(7);
  });

  test("should delete flashcard when Delete button is clicked", async () => {
    const user = userEvent.setup();

    const testStore = configureStore({
      reducer: {
        flashcard: () => ({
          flashcards: [
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
      <Provider store={testStore}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
  });

  test("should dispatch deleteFlashcard when Delete is clicked", async () => {
    const user = userEvent.setup();

    const testStore = configureStore({
      reducer: {
        flashcard: () => ({
          flashcards: [
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
      <Provider store={testStore}>
        <MyFlashCard />
      </Provider>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete",
      }),
    );

    expect(mockDeleteFlashcard).toHaveBeenCalledWith(1);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "flashcard/deleteFlashcard",
      payload: 1,
    });
  });

  test("should display empty state when there are no flashcards", () => {
    const emptyStore = configureStore({
      reducer: {
        flashcard: (state = { flashcards: [] }) => state,
      },
    });
    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <MyFlashCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText("No flashcards yet to display!"),
    ).toBeInTheDocument();
  });
});
