import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Flashcard from "../components/Flashcard";

const MyFlashCard = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const myFlashcard = useSelector((state) => state.flashcard.flashcards);
  const displayFlashcards = showAll ? myFlashcard : myFlashcard.slice(0, 6);

  return (
    <>
      {myFlashcard.length > 0 ? (
        <div className="pt-2 sm:pt-3 mx-7 sm:mx-12 md:mx-20 lg:mx-30">
          <div className="w-full flex justify-start flex-wrap lg:gap-6 gap-6">
            {displayFlashcards.map((group) => (
              // Card
              <Flashcard key={group.id} group={group} />
            ))}
          </div>

          {myFlashcard.length > 6 && !showAll && (
            <div className="text-red-600  font-semibold w-full flex justify-end text-lg">
              <p
                className="cursor-pointer hover:underline active:scale-95 mr-14"
                onClick={() => setShowAll(true)}
              >
                See all
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 w-full flex flex-col items-center gap-6">
          <h2 className="font-semibold text-xl">
            No flashcards yet to display!
          </h2>
          <button className="border-2 border-red-600 font-semibold text-red-600 rounded-lg px-5 py-2 active:scale-95">
            <Link to="/">Create Flashcard</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default MyFlashCard;
