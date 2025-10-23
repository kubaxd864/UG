import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function FavoriteButton({ id, favorites, toggleFavorite }) {
  const isFavorite = favorites.includes(id);

  return (
    <button
      className="absolute top-5 right-5"
      onClick={() => {
        toggleFavorite(id);
      }}
    >
      <FontAwesomeIcon
        icon={isFavorite ? faStarSolid : faStarRegular}
        className={isFavorite ? "text-yellow-400" : "text-gray-400"}
      />
    </button>
  );
}
