import { useContext } from "react";
import { FavoritesContext } from "./context/FavoritesContext";

function CharacterCards({ people }) {
  const { addFavorite } = useContext(FavoritesContext);

  if (!people || people.length === 0) {
    return <p>No hay personajes cargados.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {people.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "200px",
            borderRadius: "8px",
          }}
        >
          <h3>{p.name}</h3>
          <button onClick={() => addFavorite("people", p.id)}>
            ❤️ Add Favorite
          </button>
        </div>
      ))}
    </div>
  );
}

export default CharacterCards;
