import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "./context/FavoritesContext";

const detailPath = {
  people: "/people/",
  planet: "/planet/",
  vehicle: "/vehicle/",
};

function CharacterCards({ items, itemType, imagesMap = {} }) {
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  if (!items || items.length === 0) {
    return <p>No hay {itemType} cargados.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {items.map((item) => {
        const existingFav = favorites.find(
          (f) => f.item_type === itemType && f.item_id === item.id,
        );
        const imageUrl = imagesMap[item.name];

        return (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
            }}
          >
            <Link
              to={`${detailPath[itemType]}${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#222",
                    borderRadius: "6px",
                    color: "#888",
                  }}
                >
                  Sin imagen
                </div>
              )}
              <h3>{item.name}</h3>

              {itemType === "people" && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    marginBottom: "8px",
                  }}
                >
                  <p>Gender: {item.gender || "n/a"}</p>
                  <p>Hair Color: {item.hair_color || "n/a"}</p>
                  <p>Eye Color: {item.eye_color || "n/a"}</p>
                </div>
              )}

              {itemType === "planet" && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    marginBottom: "8px",
                  }}
                >
                  <p>Climate: {item.climate || "n/a"}</p>
                  <p>Terrain: {item.terrain || "n/a"}</p>
                </div>
              )}

              {itemType === "vehicle" && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    marginBottom: "8px",
                  }}
                >
                  <p>Model: {item.model || "n/a"}</p>
                  <p>Manufacturer: {item.manufacturer || "n/a"}</p>
                </div>
              )}
            </Link>

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
      })}
    </div>
  );
}

export default CharacterCards;
