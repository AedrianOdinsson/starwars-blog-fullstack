import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import CharacterCards from "./CharacterCards";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/people")
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <h1>StarWars People (desde tu API local)</h1>

      <CharacterCards people={people} />
    </div>
  );
}

export default App;
