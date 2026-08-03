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

  const { imageUrl, extract, infobox } = useWikipediaInfo(item?.name);

  if (!item) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  const existingFav = favorites.find(
    (f) => f.item_type === itemType && f.item_id === Number(id),
  );

  return (
    <div className="container mt-4" style={{ maxWidth: "1000px" }}>
      <Link to="/" className="btn btn-outline-light btn-sm mb-3">
        ← Volver
      </Link>

      <div className="card bg-dark text-white overflow-hidden">
        <div className="row g-0">
          {imageUrl && (
            <div className="col-md-5">
              <img
                src={imageUrl}
                alt={item.name}
                className="w-100 h-100"
                style={{ objectFit: "cover", minHeight: "300px" }}
              />
            </div>
          )}

          <div className={imageUrl ? "col-md-7" : "col-12"}>
            <div className="card-body">
              <h2 className="text-uppercase mb-3">{item.name}</h2>

              {extract ? (
                <p className="text-light">{extract}</p>
              ) : (
                <p className="text-secondary fst-italic">
                  Sin descripción disponible.
                </p>
              )}

              {Object.values(infobox || {}).some((v) => v) && (
                <div className="row mt-3">
                  {infobox.species && (
                    <div className="col-6 mb-2">
                      <div className="text-uppercase small text-danger">
                        Species
                      </div>
                      <div>{infobox.species}</div>
                    </div>
                  )}
                  {infobox.homeworld && (
                    <div className="col-6 mb-2">
                      <div className="text-uppercase small text-danger">
                        Homeworld
                      </div>
                      <div>{infobox.homeworld}</div>
                    </div>
                  )}
                  {infobox.affiliation && (
                    <div className="col-12 mb-2">
                      <div className="text-uppercase small text-danger">
                        Affiliation
                      </div>
                      <div>{infobox.affiliation}</div>
                    </div>
                  )}
                  {infobox.masters && (
                    <div className="col-6 mb-2">
                      <div className="text-uppercase small text-danger">
                        Master(s)
                      </div>
                      <div>{infobox.masters}</div>
                    </div>
                  )}
                  {infobox.apprentices && (
                    <div className="col-6 mb-2">
                      <div className="text-uppercase small text-danger">
                        Apprentice(s)
                      </div>
                      <div>{infobox.apprentices}</div>
                    </div>
                  )}
                  {infobox.vehicles && (
                    <div className="col-12 mb-2">
                      <div className="text-uppercase small text-danger">
                        Vehicles
                      </div>
                      <div>{infobox.vehicles}</div>
                    </div>
                  )}
                  {infobox.weapons && (
                    <div className="col-12 mb-2">
                      <div className="text-uppercase small text-danger">
                        Weapons
                      </div>
                      <div>{infobox.weapons}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-footer bg-black">
          <div className="row text-center">
            {Object.entries(item)
              .filter(([key]) => key !== "id" && key !== "name")
              .map(([key, value]) => (
                <div
                  key={key}
                  className="col-6 col-md-2 border-end border-secondary py-2"
                >
                  <div className="text-uppercase small text-danger">
                    {key.replace("_", " ")}
                  </div>
                  <div>{value ?? "Desconocido"}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="card-body">
          {existingFav ? (
            <button
              className="btn btn-danger w-100"
              onClick={() => deleteFavorite(existingFav.id)}
            >
              💔 Remove Favorite
            </button>
          ) : (
            <button
              className="btn btn-warning w-100"
              onClick={() => addFavorite(itemType, item.id)}
            >
              ❤️ Add Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
