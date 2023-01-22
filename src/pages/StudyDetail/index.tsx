import { BackButton } from "components/BackButton";
import { Study } from "models/latrikModels";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudyById } from "api/studiesApi";
import Loader from "components/Loader";

function StudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsloading] = React.useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsloading(true);
      getStudyById(id).then(
        (res) => {
          console.log("res: ", res);
          setStudy(res.data);
          setIsloading(false);
        },
        (err) => {
          console.log("err: ", err);
          setIsloading(false);
        }
      );
    }
  }, []);

  return (
    <>
      <BackButton goTo={"/StudyList"} />
      <section className="mb-6 max-w-7xl mx-auto text-shadow">
        <h3 className="font-bold text-4xl">Resumen de estudio </h3>

        {study && (
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
                  {study.priority}
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
                      {study.patient.gender}
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
                    {study.modality}
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
