
import {Patient, Study } from "models/latrikModels";

import React from "react";
import { getPatientById } from "api/patientsApi";
import { useLocation } from "react-router";
import { BackButton } from "components/BackButton";
import Loader from "components/Loader";
import StudyConfirmationModal from "./StudyConfirmationModal";
import StudyForm from "./StudyForm";

function RegisterStudy() {
  
  const { state } = useLocation();
  const { patientId } = state;
  const [patient, setPatient] = React.useState<Patient>();
  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (patientId) {
      getPatientById(patientId).then(
        (res) => {
          console.log("patientRes: ", res);
          setPatient(res.data);
          setIsLoading(false);
        },
        (err) => {
          console.log("patientErr: ", err);
          setIsLoading(false);
        }
      );
    }
  }, [patientId]);

  
  return (
    <>
      <BackButton goTo={"/StudyList"} />
      <StudyForm patient={patient} setStudy={setStudy} />
      
      {showConfirmationModal && (
        <StudyConfirmationModal
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
}

export default RegisterStudy;
