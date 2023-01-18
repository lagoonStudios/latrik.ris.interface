import { ReactComponent as Check } from "assets/icons/Check.svg";
import { ReactComponent as AddPerson } from "assets/icons/AddPerson.svg";
import { ReactComponent as Document } from "assets/icons/Document.svg";
import { useNavigate } from "react-router";

function PatientConfirmationModal({
  patientId,
  setShowConfirmation,
  resetFormBtn,
}: {
  patientId: string;
  setShowConfirmation: Function;
  resetFormBtn: Function;
}) {
  const navigate = useNavigate();
  const createNewPatient = () => {
    console.log("Reset form");
    resetFormBtn();
    setShowConfirmation(false);
  };

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="mb-5">
          <Check className="svg120 fill-tertiary" />
          <h4 className="text-3xl font-bold">Paciente creado correctamente</h4>
        </div>
        <div className="flex justify-around">
          <button onClick={() => createNewPatient()}>
            <AddPerson className="svg120 fill-tertiary" />
            <h4 className="text-2xl font-bold">Nuevo paciente</h4>
          </button>
          <button
            onClick={() =>
              navigate("/StudyForm/", {
                state: { patientId },
              })
            }
          >
            <Document className="svg120 fill-tertiary" />
            <h4 className="text-2xl font-bold">Asignar estudio</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientConfirmationModal;
