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
    <div className="d-flex flex-wrap gap-3">
      {items.map((item) => {
        const existingFav = favorites.find(
          (f) => f.item_type === itemType && f.item_id === item.id,
        );
        const imageUrl = imagesMap[item.name];

        return (
          <div
            className="card bg-dark text-white"
            style={{ width: "220px" }}
            key={item.id}
          >
            <Link
              to={`${detailPath[itemType]}${item.id}`}
              className="text-decoration-none text-white"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary"
                  style={{ height: "180px" }}
                >
                  Sin imagen
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                {itemType === "people" && (
                  <ul className="list-unstyled small mb-0">
                    <li>Gender: {item.gender || "n/a"}</li>
                    <li>Hair Color: {item.hair_color || "n/a"}</li>
                    <li>Eye Color: {item.eye_color || "n/a"}</li>
                  </ul>
                )}

                {itemType === "planet" && (
                  <ul className="list-unstyled small mb-0">
                    <li>Climate: {item.climate || "n/a"}</li>
                    <li>Terrain: {item.terrain || "n/a"}</li>
                  </ul>
                )}

                {itemType === "vehicle" && (
                  <ul className="list-unstyled small mb-0">
                    <li>Model: {item.model || "n/a"}</li>
                    <li>Manufacturer: {item.manufacturer || "n/a"}</li>
                  </ul>
                )}
              </div>
            </Link>

            <div className="card-footer">
              {existingFav ? (
                <button
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={() => deleteFavorite(existingFav.id)}
                >
                  💔 Remove Favorite
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning btn-sm w-100"
                  onClick={() => addFavorite(itemType, item.id)}
                >
                  ❤️ Add Favorite
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterCards;
