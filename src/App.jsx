import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <AppRoutes/>
      </main>
    </div>
  );
};

export default App;
