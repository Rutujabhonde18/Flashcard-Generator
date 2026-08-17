import { useDispatch } from "react-redux";
import { deleteFlashcard } from "../redux/flashcardSlice";
import { Link } from "react-router-dom";
import { MdDeleteOutline, MdArrowRightAlt } from "react-icons/md";

const Flashcard = ({ group }) => {
  const dispatch = useDispatch();
  return (
    <div
      key={group.id}
      className="h-56 lg:w-4/13 bg-white w-full border-2 border-gray-200 rounded-lg p-4 mb-2 flex flex-col justify-between"
    >
      <div className="w-full flex gap-8">
        <div className="w-16 h-16 border-2 border-gray-200 rounded-full overflow-hidden">
          <img
            src={group.image}
            alt={group.title}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-bold">{group.title}</h3>
          <p className="text-xs text-gray-600 font-semibold">
            {group.terms.length} Cards
          </p>
        </div>
      </div>
      <p className="text-gray-600 pt-3 overflow-hidden line-clamp-3">
        {group.description}{" "}
      </p>
      <div className="text-red-600 w-full flex justify-between">
        <button className="font-semibold active:scale-95 cursor-pointer pt-2">
          <Link className="flex gap-5" to={`/flashcarddetails/${group.id}`}>
            View Cards <MdArrowRightAlt size={28} />
          </Link>
        </button>
        <button
          className="cursor-pointer active:scale-110 hover:scale-105"
          onClick={() => dispatch(deleteFlashcard(group.id))}
        >
          <MdDeleteOutline className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
