import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FavoritesContext } from "./context/FavoritesContext";
import { useWikipediaInfo } from "./useWikipediaInfo";

const apiPath = {
  people: "people",
  planet: "planets",
  vehicle: "vehicles",
};

function Detail({ itemType }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    fetch(`http://localhost:3001/${apiPath[itemType]}/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Error detail:", err));
  }, [itemType, id]);

  const { imageUrl, extract } = useWikipediaInfo(item?.name);
  console.log("DEBUG extract:", extract);

  if (!item) {
    return <p>Cargando...</p>;
  }

  const existingFav = favorites.find(
    (f) => f.item_type === itemType && f.item_id === Number(id),
  );

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Link to="/">← Volver</Link>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={item.name}
          style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
        />
      )}

      <h1>{item.name}</h1>

      {extract && (
        <p style={{ color: "#ccc", fontStyle: "italic" }}>{extract}</p>
      )}

      <ul>
        {Object.entries(item)
          .filter(([key]) => key !== "id" && key !== "name")
          .map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value ?? "Desconocido"}
            </li>
          ))}
      </ul>

      {existingFav ? (
        <button onClick={() => deleteFavorite(existingFav.id)}>
          💔 Remove Favorite
        </button>
      ) : (
        <button onClick={() => addFavorite(itemType, item.id)}>
          ❤️ Add Favorite
        </button>
      )}
    </div>
  );
}

export default Detail;
