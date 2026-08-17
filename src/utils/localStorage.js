const STORAGE_KEY = "flashcards";

export const getFlashcards = () => {
  try {
    const flashcards = localStorage.getItem(STORAGE_KEY);
    return flashcards ? JSON.parse(flashcards) : [];
  } catch (error) {
    console.error("Error occurred while fetching flashcards:", error);
    return [];
  }
};

export const saveFlashcards = (flashcards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch (error) {
    console.error("Error occurred while saving flashcards:", error);
  }
};

export const removeFlashcards = (id) => {
  const flashcards = getFlashcards();
  const updatedFlashcards = flashcards.filter(
    (flashcard) => flashcard.id !== id,
  );
  saveFlashcards(updatedFlashcards);
  return updatedFlashcards;
};

export const filetoDataURL = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};
