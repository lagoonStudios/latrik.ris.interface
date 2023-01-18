import { ReactComponent as Check } from "assets/icons/Check.svg";
import { ReactComponent as AddPerson } from "assets/icons/AddPerson.svg";
import { ReactComponent as ListCheck } from "assets/icons/ListCheck.svg";
import { useNavigate } from "react-router";

function StudyConfirmationModal({
  setShowConfirmationModal,
}: {
  setShowConfirmationModal: Function;
}) {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modalContainer">
        <Check className="svg120 fill-tertiary" />
        <h3 className="block font-bold text-4xl">
          Estudio creado correctamente
        </h3>
        <div className="flex justify-around mt-10">
          <button onClick={()=>setShowConfirmationModal(false)}>
            <AddPerson className="svg120 fill-tertiary" />
            <label className="font-bold text-2xl">Nuevo estudio</label>
          </button>
          <button onClick={() => navigate("/StudyList")}>
            <ListCheck className="svg120 fill-tertiary" />
            <label className="font-bold text-2xl">Lista de estudios</label>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default StudyConfirmationModal;
