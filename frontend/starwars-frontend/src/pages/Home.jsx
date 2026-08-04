import { useEffect, useState, useRef, useContext } from "react";
import CharacterCards from "../components/CharacterCards";
import fetchImagesForNames from "../services/useWikipediaImagesBatch";
import { FavoritesContext } from "../context/FavoritesContext";

function Home() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const hasFetched = useRef(false);
  const { registerItems } = useContext(FavoritesContext);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    Promise.all([
      fetch("http://localhost:3001/people").then((res) => res.json()),
      fetch("http://localhost:3001/planets").then((res) => res.json()),
      fetch("http://localhost:3001/vehicles").then((res) => res.json()),
    ])
      .then(([peopleData, planetsData, vehiclesData]) => {
        setPeople(peopleData);
        setPlanets(planetsData);
        setVehicles(vehiclesData);

        registerItems("people", peopleData);
        registerItems("planet", planetsData);
        registerItems("vehicle", vehiclesData);

        const allNames = [
          ...peopleData.map((p) => p.name),
          ...planetsData.map((p) => p.name),
          ...vehiclesData.map((v) => v.name),
        ];

        fetchImagesForNames(allNames).then(setImagesMap);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, [registerItems]);

  return (
    <>
      <h1>People</h1>
      <CharacterCards items={people} itemType="people" imagesMap={imagesMap} />

      <h1>Planets</h1>
      <CharacterCards items={planets} itemType="planet" imagesMap={imagesMap} />

      <h1>Vehicles</h1>
      <CharacterCards
        items={vehicles}
        itemType="vehicle"
        imagesMap={imagesMap}
      />
    </>
  );
}

export default Home;
