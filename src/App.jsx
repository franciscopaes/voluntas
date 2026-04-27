import { useState } from "react";
import Home from "./pages/Home";
import OngRegister from "./pages/OngRegister";
import VolunteerForm from "./pages/VolunteerForm";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {page === "home" && <Home navigate={navigate} />}
      {page === "ong" && <OngRegister navigate={navigate} />}
      {page === "volunteer" && <VolunteerForm navigate={navigate} />}
    </div>
  );
}