import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mx-7 sm:mx-12 md:mx-20 lg:mx-30 ">
      <nav className="pt-10">
        <h1 className="mb-6 text-3xl font-bold">Create Flashcard</h1>

        <ul className="flex gap-14 mx-1 text-gray-500">
          <li>
            <Link
              to="/"
              className="py-2.5 text-lg font-semibold hover:text-red-600 focus:text-red-600 focus:border-b-2 focus:border-red-600"
            >
              Create New
            </Link>
          </li>
          <li>
            <Link
              to="/myflashcard"
              className="py-2.5 text-lg font-semibold hover:text-red-600 focus:text-red-600  focus:border-b-2 focus:border-red-600"
            >
              My Flashcard
            </Link>
          </li>
        </ul>

        <hr className="my-2 border-gray-400" />
      </nav>
    </div>
  );
};

export default Navbar;
