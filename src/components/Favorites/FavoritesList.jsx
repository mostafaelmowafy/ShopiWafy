import Spinner from "../../ui/Spinner";
import useUser from "../authentication/useUser";
import FavoritesItem from "./FavoritesItem";
import useGetFavorites from "./useGetFavorites";

function FavoritesList() {
  const { user } = useUser();
  const { id: userId } = user ?? {};
  const { data: favorites, isLoading } = useGetFavorites(userId);
  console.log(favorites);

  if (isLoading) return <Spinner />;
  return (
    <>
      {favorites.map((fav, index) => (
        <FavoritesItem key={index} fav={fav} />
      ))}
    </>
  );
}

export default FavoritesList;
