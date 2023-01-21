import { Patient, Study } from "models/latrikModels";

import React from "react";
import { BackButton } from "components/BackButton";
import Loader from "components/Loader";
import StudyConfirmationModal from "./StudyConfirmationModal";
import StudyForm from "./StudyForm";
import StudyPatientForm from "./StudyPatientForm";
import { useLocation } from "react-router";
import { useFirestoreDocDataOnce } from "reactfire";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

function RegisterStudy() {
  const { state } = useLocation();
  const { patientId } = state;

  const docRef = doc(getFirestore(), "Patients", patientId);
  const patientRef: any = useFirestoreDocDataOnce(docRef);


  const [patient, setPatient] = React.useState<Patient>();
  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  const createStudy = (values: Study) => {
    if (study && study.patient) {

      const studiesRef = collection(getFirestore(), "Studies");
      const addStudy = async (values: Study) => {
        const snap = await addDoc(studiesRef, values);
        values.id = snap.id;
        setStudy(values);
        return setDoc(doc(getFirestore(), "Studies", values.id), values);
      };
      addStudy(values);
    //   addStudy(study).then(
    //     (res) => {
    //       console.log("res: ", res);
    //       setStudy(res.data);
    //       setShowConfirmationModal(false);
    //     },
    //     (err) => {
    //       console.log("err: ", err);
    //     }
    //   );
    // } else {
    //   console.log("No hay estudio");
    }
  };
  
  React.useEffect(() => {
    if (patientId && patientRef.data) {
      setPatient(patientRef.data);
    }
  }, [patientRef]);

  return (
    <>
      <BackButton goTo={"/StudyList"} />

      <div className="border-4 border-primary bg-white w-2/3 rounded-[40px] m-auto px-20 py-5">
        <h1 className="text-center text-black text-4xl font-bold mb-5">
          Registro de estudio
        </h1>
        <StudyPatientForm
          patient={patient}
          setPatient={setPatient}
          setIsLoading={setIsLoading}
        />
        <StudyForm
          patient={patient}
          setStudy={setStudy}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      </div>

      {showConfirmationModal && (
        <StudyConfirmationModal
          setShowConfirmationModal={setShowConfirmationModal}
          createStudy={createStudy}
        />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
}

export default RegisterStudy;
