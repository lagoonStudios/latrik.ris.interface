import React from "react";
import { Patient, Study } from '../../models/latrikModels';
import { BackButton } from "../../components/BackButton/index";
import PatientForm from "pages/PatientForm";
import StudyForm from "pages/StudyForm";
import Loader from "components/Loader";
import ConfirmModal from "pages/RegisterPatient/ConfirmModal";
import SuccessModal from "./SuccessModal";

export default function RegisterPatient() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [study, setStudy] = React.useState<Study | null>(null);
  const [isOpenConfirmModal, setisOpenConfirmModal] = React.useState(false);
  const [isOpenSuccessModal, setisOpenSuccessModal] = React.useState(false);

  const closeModals = () => {
    setisOpenConfirmModal(false);
    setisOpenSuccessModal(false);
  };

  const submitInfo = () => {
    setIsLoading(true);
    closeModals()
    console.log("study: ", study);
    console.log("patient: ", patient);
    setTimeout(() => {
      setisOpenSuccessModal(true);
      setIsLoading(false);
    }, 3000);
  };

  const createNewStudy = () => {
    setPatient(null)
    setStudy(null);
    closeModals();
    setStep(1);
  };

  return (
    <>
      {/* <BackButton />
      <div className="flex">
        <div className="flex-auto px-10 pb-10">
          {step === 1 && (
            <PatientForm
              setPatient={setPatient}
              patient={patient}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <StudyForm
              setStudy={setStudy}
              setStep={setStep}
              setisOpenConfirmModal={setisOpenConfirmModal}
              patientId={patient?.id}
            />
          )}
        </div>
      </div>
      {isOpenConfirmModal === true && (
        <ConfirmModal
          setisOpenConfirmModal={setisOpenConfirmModal}
          submitInfo={submitInfo}
        />
      )}
      {isOpenSuccessModal && <SuccessModal createNewStudy={createNewStudy} />}
      <Loader isLoading={isLoading} /> */}
    </>
  );
}
