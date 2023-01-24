import { useParams } from "react-router";
import React from "react";
import { useFirestoreDocDataOnce, useUser } from "reactfire";
import { doc, getFirestore } from "firebase/firestore";
import Loader from "components/Loader";
import { Gender, Study } from "models/latrikModels";
import { Modality } from "models/latrikModels";
import { BackButton } from "components/BackButton";

function DownloadStudy() {
  const { studyId } = useParams();
  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsloading] = React.useState<boolean>(false);

  let id: string = "";
  studyId === undefined ? (id = "undefined") : (id = studyId);

  const docRef = doc(getFirestore(), "Studies", id);
  const studyRef: any = useFirestoreDocDataOnce(docRef);

  const user = useUser();

  React.useEffect(() => {
    console.log(study)
    if (studyId) {
      setIsloading(true);
      if (studyId && studyRef.data) {
        setStudy(studyRef.data);
        setIsloading(false);
        console.log(study)
      }else{
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
    }
  }, [studyRef.data]);

  return (
    <>
    {user.data && <BackButton goTo={-1} />}
      <section className="mb-6 max-w-7xl mx-auto mt-[5vh] text-shadow">
        <h3 className="font-bold text-4xl">Descargar estudio</h3>

        {study && study.patient && (
          <div>
            <section className="bg-secondary rounded-[30px] my-10  py-16 px-10  shadow-buttonShadow text-2xl">
              <div className="mb-5">
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
              </div>
              {/* <div className="flex justify-around items-center my-5 text-2xl">
              <div className="bg-green w-fit min-w-[8rem] px-3 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                {study.modality}
              </div>
              <div className="bg-orange w-fit min-w-[8rem] px-3 mx-5 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                {study.procedure}
              </div>
            </div> */}

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <div>
                    <p>
                      <label className="font-bold">Género: </label>
                      {Gender[study.patient.gender]}
                    </p>
                    <p>
                      <label className="font-bold">Fecha de nacimiento: </label>
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
                      <label className="font-bold">Condición médica: </label>

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
                Descargar
              </button>
            </div>
          </div>
        )}
      </section>

      <Loader isLoading={isLoading} />
    </>
  );
}

export default DownloadStudy;
