import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mx-7 sm:mx-12 md:mx-20 lg:mx-30 ">
      <nav className="pt-10">
        <h1 className="mb-6 text-3xl font-bold">Create Flashcard</h1>

        <ul className="flex gap-14 mx-1 text-gray-500">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2.5 text-lg font-semibold ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                }`
              }
            >
              Create New
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myflashcard"
              className={({ isActive }) =>
                `py-2.5 text-lg font-semibold ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600"
                    : "hover:text-red-600"
                }`
              }
            >
              My Flashcard
            </NavLink>
          </li>
        </ul>

        <hr className="my-2 border-gray-400" />
      </nav>
    </div>
  );
};

export default Navbar;
