import { ReactComponent as CheckSvg } from "assets/icons/Check.svg";
import { ReactComponent as AddPersonSvg } from "assets/icons/AddPerson.svg";
import { ReactComponent as DocumentSvg } from "assets/icons/Document.svg";
import { useNavigate } from "react-router";

function PatientConfirmationModal({ patientId }: { patientId: string }) {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="mb-5">
          <CheckSvg className="svg195 fill-success" />
          <h4 className="text-3xl font-bold">Paciente creado correctamente</h4>
        </div>
        <div className="flex justify-around mt-5">
          <button onClick={() => navigate("/PatientList")}>
            <AddPersonSvg className="svg120 fill-primary" />
            <h4 className="text-2xl font-bold">Lista de pacientes</h4>
          </button>
          <button
            onClick={() =>
              navigate("/StudyForm/", {
                state: { patientId },
              })
            }
          >
            <DocumentSvg className="svg120 fill-primary" />
            <h4 className="text-2xl font-bold">Asignar estudio</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientConfirmationModal;
