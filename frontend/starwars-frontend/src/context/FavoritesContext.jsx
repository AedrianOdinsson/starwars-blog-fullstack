import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const res = await fetch("http://localhost:3001/users/1/favorites");
    const data = await res.json();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addFavorite = async (itemType, itemId) => {
    const res = await fetch("http://localhost:3001/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        item_type: itemType,
        item_id: itemId,
      }),
    });

    const newFav = await res.json();
    setFavorites([...favorites, newFav]);
  };

  const deleteFavorite = async (favId) => {
    await fetch(`http://localhost:3001/favorite/${favId}`, {
      method: "DELETE",
    });

    setFavorites(favorites.filter((f) => f.id !== favId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
