import { useContext } from "react";
import { FavoritesContext } from "./context/FavoritesContext";

export const Navbar = () => {
  const { favorites, deleteFavorite, getItemName } =
    useContext(FavoritesContext);

  return (
    <nav>
      <h2>Star Wars</h2>

      <div className="favorites">
        <span>Favorites ({favorites.length})</span>

        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              {getItemName(fav.item_type, fav.item_id)}
              <button onClick={() => deleteFavorite(fav.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
