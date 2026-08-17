import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShareModel from "../components/ShareModel";

const FlashcardDetails = ({ group }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(0);

  // Get flashcard groups from Redux
  const flashcardGroups = useSelector((state) => state.flashcard.flashcards);

  // Find the group according to URL id
  const currentGroup =
    group || flashcardGroups?.find((item) => String(item.id) === String(id));

  // If group is not found
  if (!currentGroup) {
    return (
      <div className="pt-10 flex justify-center">
        <p className="text-gray-500">Flashcard group not found.</p>
      </div>
    );
  }

  const cards = currentGroup.terms || [];
  const currentCard = cards[selectedCard];

  const handlePrevious = () => {
    if (selectedCard > 0) {
      setSelectedCard(selectedCard - 1);
    }
  };

  const handleNext = () => {
    if (selectedCard < cards.length - 1) {
      setSelectedCard(selectedCard + 1);
    }
  };

  return (
    <div className="pt-2 sm:pt-5 mx-7 sm:mx-12 md:mx-20 lg:mx-30 flex flex-col gap-8 ">
      <div className="h-20 w-full flex gap-5 justify-start items-start lg:mb-0 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-red-600 cursor-pointer pt-1"
        >
          <MdArrowBack size={28} />
        </button>
        <div className="mb-3">
          <h1 className="text-xl font-bold">{currentGroup.title}</h1>
          <p className="w-full text-gray-600 mt-1.5 py-1 overflow-hidden lg:line-clamp-2 line-clamp-4">
            {currentGroup.description}
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="h-96 w-full flex gap-8 flex-col lg:flex-row">
        {/* Left side buttons */}
        <div className="h-4/5 lg:w-1/5 w-full bg-white shadow-lg rounded-lg border-2 border-gray-200 overflow-hidden flex flex-col">
          <h3 className="text-gray-500 border-b-2 border-gray-300 p-3 mx-5 font-semibold shrink-0">
            Flashcards
          </h3>
          <div className="flex flex-col gap-5 px-7 py-3 text-lg overflow-y-auto min-h-0">
            {cards.map((card, index) => (
              <h2
                key={card.cardid || index}
                onClick={() => setSelectedCard(index)}
                className={`cursor-pointer ${selectedCard === index ? "font-semibold" : "font-normal"}`}
              >
                {card.term || `card ${index + 1}`}
              </h2>
            ))}
          </div>
        </div>

        {/* Middle side buttons */}
        <div className="h-full lg:w-2/4">
          <div className="h-80 w-full bg-white shadow-lg rounded-lg border-2 border-gray-200 lg:flex lg:flex-row lg:p-7 p-3 lg:py-10 gap-6">
            {currentCard?.image ? (
              <img
                src={currentCard.image}
                alt={currentCard.term || "Flashcard"}
                className="lg:h-52 md:h-32 lg:w-1/2 w-3/5 lg:pt-2 pt-1 object-cover rounded-lg"
              />
            ) : (
              <div className="h-52 w-1/2 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">No image</p>
              </div>
            )}
            <p className="text-justify text-gray-600 pt-3 lg:p-0 p-2 overflow-hidden lg:line-clamp-10 line-clamp-6">
              {currentCard?.definition || "No definition available."}
            </p>
          </div>
          {/* Navigation */}
          <div className="h-5 w-80 mx-auto mt-4 py-3 flex justify-evenly text-gray-600 text-lg">
            <button
              onClick={handlePrevious}
              className="cursor-pointer active:scale-95"
            >
              <MdChevronLeft size={30} />
            </button>
            <p className="font-semibold">
              {selectedCard + 1}/{cards.length}
            </p>
            <button
              onClick={handleNext}
              className="cursor-pointer active:scale-95"
            >
              <MdChevronRight size={30} />
            </button>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="h-1/2 lg:w-1/4 w-full rounded-lg flex flex-col gap-4 font-semibold">
          <ShareModel currentGroup={currentGroup} currentCard={currentCard} />
        </div>
      </div>
    </div>
  );
};

export default FlashcardDetails;
