import { ReactComponent as CheckSvg } from "assets/icons/Check.svg";
import { ReactComponent as AddPersonSvg } from "assets/icons/AddPerson.svg";
import { ReactComponent as DocumentSvg } from "assets/icons/Document.svg";
import { useNavigate } from "react-router";

function StudyConfirmationModal({
  setShowConfirmationModal,
}: {
  setShowConfirmationModal: Function;
}) {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modalContainer w-1/3">
        <CheckSvg className="svg120 fill-success" />
        <h3 className="block font-bold text-4xl">
          Estudio creado correctamente
        </h3>
        <div className="flex justify-around mt-10">
          <button onClick={()=>navigate('/PatientList')}>
            <AddPersonSvg className="svg120 fill-primary" />
            <label className="font-bold text-2xl">Lista de pacientes</label>
          </button>
          <button onClick={() => navigate("/RegisterStudy")}>
            <DocumentSvg className="svg120 fill-primary" />
            <label className="font-bold text-2xl">Asignar estudio</label>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default StudyConfirmationModal;
