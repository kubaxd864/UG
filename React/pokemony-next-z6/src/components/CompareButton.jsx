import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CompareButton({ name, addToCompare }) {
  return (
    <button
      className="absolute bottom-3 right-5"
      onClick={() => {
        addToCompare(name);
      }}
    >
      <FontAwesomeIcon icon={faPlus} className="text-gray-400" />
    </button>
  );
}
