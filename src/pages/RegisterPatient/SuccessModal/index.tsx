import Check from "assets/icons/Check.svg";
import AddPerson from "assets/icons/AddPerson.svg";
import ListCheck from "assets/icons/ListCheck.svg";
import { Link } from "react-router-dom";

function SuccessModal({ createNewStudy }: { createNewStudy: Function }) {
  return (
    <div className="modal">
      <div className="modalContainer  bg-primary rounded-3xl p-14 w-10/12 max-w-7xl">
        <div className="imgContainer">
          <img src={Check} className="w-48 h-48" alt="Icono check" />
        </div>
        <h3 className="block font-bold text-4xl">
          Estudio creado correctamente
        </h3>
        <div className="flex justify-around mt-10">
          <button
            onClick={() => createNewStudy()}
            className="filledTertiary rounded-full w-80 h-56 font-bold text-2xl"
            type="button"
          >
            <img
              src={AddPerson}
              title="Nuevo estudio"
              alt="Icono nuevo estudio"
              className="px-20"
            />
            <label>Nuevo estudio</label>
          </button>
          <Link to="/StudyList">
            <button
              className="filledTertiary rounded-full w-80 h-56 font-bold text-2xl"
              type="button"
            >
              <img
                src={ListCheck}
                title="Lista de estudios"
                alt="Icono lista"
                className="px-20"
              />
              <label>Lista de estudios</label>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
