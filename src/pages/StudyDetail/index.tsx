import { BackButton } from "components/BackButton";
import { Gender, Modality, Study, StudyPriority } from "models/latrikModels";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "components/Loader";
import { useFirestoreDocDataOnce } from "reactfire";
import { toast } from 'react-hot-toast';
import {
  doc,
  getFirestore,
} from "firebase/firestore";

function StudyDetail() {
  const { state } = useLocation();
  const { studyId } = state;

  const docRef = doc(getFirestore(), "Studies", studyId);
  const studyRef: any = useFirestoreDocDataOnce(docRef);

  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsloading] = React.useState<boolean>(false);

  useEffect(() => {
    if (studyId) {
      setIsloading(true);
      if (studyId && studyRef.data) {
        setStudy(studyRef.data);
        setIsloading(false);
      }
      // setIsloading(true);
      // getStudyById(studyId).then(
      //   (res) => {
      //     console.log("res: ", res);
      //     setStudy(res.data);
      //     setIsloading(false);
      //   },
      //   (err) => {
      //     console.log("err: ", err);
      //     setIsloading(false);
      //   }
      // );
    }else{
      toast.error('No se pudo encontrar el estudio')
    }
  }, [studyRef.data, studyId]);

  return (
    <>
      <BackButton goTo={"/StudyList"} />
      <section className="mb-6 max-w-7xl mx-auto text-shadow">
        <h3 className="font-bold text-4xl">Resumen de estudio </h3>

        {(study && study.patient) && (
          <div>
            <section className="bg-secondary rounded-[30px] my-10  py-16 px-10  shadow-buttonShadow text-2xl">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-bold text-6xl text-black">
                    {study.patient.name}
                  </h3>
                  <p className="text-xl mt-3">
                    <label className="font-bold">
                      Documento de identidad:{" "}
                    </label>
                    {study.patient.patientId}
                  </p>
                </div>
                <div className="bg-success h-16 w-64 rounded-[20px] flex justify-center items-center  text-white text-3xl font-extrabold shadow-buttonShadow text-shadow-none">
                  {StudyPriority[study.priority]}
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <div>
                    <p>
                      <label className="font-bold">Género: </label>
                      {Gender[study.patient.gender]}
                    </p>
                    <p>
                      <label className="font-bold">
                        Fecha de nacimiento:{" "}
                      </label>
                      {study.patient.birthDate?.toString()}
                    </p>
                    <p>
                      <label className="font-bold">Edad: </label>
                      24
                    </p>
                    <p>
                      <label className="font-bold">Alergias: </label>
                      {study.patient.allergies
                        ? study.patient.allergies
                        : "Sin detalles"}
                    </p>
                    <p>
                      <label className="font-bold">
                        Condición médica:{" "}
                      </label>

                      {study.patient.medicalCondition
                        ? study.patient.medicalCondition
                        : "Sin detalles"}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 ml-5">
                  <p>
                    <label className="font-bold">Fecha de estudio: </label>
                    {study.studyDate}
                  </p>
                  <p>
                    <label className="font-bold">Modalidad: </label>
                    {Modality[study.modality]}
                  </p>
                  <p>
                    <label className="font-bold">Procedimiento: </label>
                    {study.procedure}
                  </p>
                </div>
              </div>
            </section>
            <div className="text-end">
              <button
                className="filledPrimary text-4xl font-bold w-fit h-20 px-5 py-3 rounded-xl"
                type="button"
                title="Finalizar estudio"
              >
                Finalizar estudio
              </button>
            </div>
          </div>
        )}
      </section>

      <Loader isLoading={isLoading} />
    </>
  );
}

export default StudyDetail;
