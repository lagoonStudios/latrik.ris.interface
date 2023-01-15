import { BackButton } from "components/BackButton";

function PatientList() {
  return (
    <>
      <BackButton />
      <div className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Lista de Pacientes</h3>
      </div>
    </>
  );
}

export default PatientList;
