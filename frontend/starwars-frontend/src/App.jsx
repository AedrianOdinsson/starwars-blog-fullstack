import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:id" element={<Detail itemType="people" />} />
        <Route path="/planet/:id" element={<Detail itemType="planet" />} />
        <Route path="/vehicle/:id" element={<Detail itemType="vehicle" />} />
      </Routes>
    </div>
  );
}

export default App;
