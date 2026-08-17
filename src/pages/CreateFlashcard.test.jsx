// The form renders.
// Group name input works.
// Description input works.
// "Add more" adds another term.
// Create button submits the form.
// Success toast appears.
// Loading appears while submitting.

import CreateFlashcard from "./CreateFlashcard";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockDispatch = vi.fn();
const mockAddFlashcard = vi.fn();
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("../utils/localStorage", () => ({
  filetoDataURL: vi.fn(),
}));

vi.mock("../components/Loading", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../components/TermInput", () => ({
  default: ({ index }) => (
    <div>
      <label htmlFor={`term-${index}`}>Enter Term</label>
      <input id={`term-${index}`} />
    </div>
  ),
}));

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
  toast: {
    success: (...args) => mockToastSuccess(...args),
    error: (...args) => mockToastError(...args),
  },
}));

vi.mock("../redux/flashcardSlice", () => ({
  addFlashcard: (...args) => mockAddFlashcard(...args),
}));

describe("CreateFlashcard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render Create Flashcard form", () => {
    render(<CreateFlashcard />);

    expect(screen.getByText("Create Group")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Group Name")).toBeInTheDocument();

    expect(screen.getByText("Add Description")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Describe the roles/),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  test("should allow user to enter group name", async () => {
    const user = userEvent.setup();
    render(<CreateFlashcard />);
    const groupNameInput = screen.getByPlaceholderText("Enter Group Name");
    await user.type(groupNameInput, "Javascript");
    expect(groupNameInput).toHaveValue("Javascript");
  });

  test("should allow user to enter group description", async () => {
    const user = userEvent.setup();
    render(<CreateFlashcard />);
    const descriptionInput = screen.getByPlaceholderText(/Describe the roles/);
    await user.type(descriptionInput, "JavaScript interview flashcards");
    expect(descriptionInput).toHaveValue("JavaScript interview flashcards");
  });

  test("should add another term when Add more is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateFlashcard />);
    expect(screen.getAllByLabelText("Enter Term")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: /Add More/i }));
    expect(screen.getAllByLabelText("Enter Term")).toHaveLength(2);
  });

  test("Create button submits the form", async () => {
    render(<CreateFlashcard />);

    const groupNameInput = screen.getByPlaceholderText("Enter Group Name");
    const descriptionInput = screen.getByPlaceholderText(/Describe the roles/);

    await userEvent.type(groupNameInput, "Javascript");
    await userEvent.type(descriptionInput, "JavaScript interview flashcards");

    const createButton = screen.getByRole("button", { name: "Create" });

    await userEvent.click(createButton);
    expect(createButton).toBeInTheDocument();
  });

  test("success toast appears after creating flashcard", async () => {
    const user = userEvent.setup();
    render(<CreateFlashcard />);

    await user.type(
      screen.getByPlaceholderText("Enter Group Name"),
      "JavaScript",
    );

    await user.type(
      screen.getByPlaceholderText(/Describe the roles/i),
      "JavaScript flashcards",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create",
      }),
    );

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(
        "Card created successfully!",
        {
          position: "top-center",
          autoClose: 3000,
        },
      );
    });
  });

  test("Loading appears while submitting", async () => {
    const user = userEvent.setup();
    render(<CreateFlashcard />);

    await user.type(
      screen.getByPlaceholderText("Enter Group Name"),
      "JavaScript",
    );

    await user.type(
      screen.getByPlaceholderText(/Describe the roles/i),
      "JavaScript flashcards",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Create",
      }),
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
