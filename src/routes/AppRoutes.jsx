import CreateFlashcard from "../pages/CreateFlashcard";
import { Route, Routes } from "react-router-dom";
import MyFlashCard from "../pages/MyFlashcard";
import FlashcardDetails from "../pages/FlashcardDetails";

const AppRoutes = () => {
  return (
    <Routes>
          <Route path="/" element={<CreateFlashcard />}></Route>
          <Route path="/myflashcard" element={<MyFlashCard />}></Route>
          <Route
            path="/flashcarddetails/:id"
            element={<FlashcardDetails />}
          ></Route>
        </Routes>
  )
}

export default AppRoutes
