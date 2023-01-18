import { BackButton } from "components/BackButton";
import { Gender, Patient, Study } from "models/latrikModels";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowSmallRight from "assets/icons/ArrowSmallRight.svg";
import { getStudyById } from "api/studiesApi";
import Loader from "components/Loader";

function StudyResumen() {
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
      <BackButton />
      <section className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Resumen de estudio </h3>

        {study && (
          <section className="bg-primary rounded-3xl my-10 mx-auto p-5 max-w-7xl shadow-buttonShadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-6xl text-black text-shadow">
                {study.patient.name}
              </h3>
              <div className="text-shadow text-xl">
                <label className="font-bold">Fecha de estudio: </label>
                <label> {study.studyDate}</label>
              </div>
            </div>
            <div className="flex justify-around items-center my-5 text-2xl">
              <div className="bg-green w-fit min-w-[8rem] px-3 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                {study.modality}
              </div>
              <div className="bg-orange w-fit min-w-[8rem] px-3 mx-5 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                {study.procedure}
              </div>
              <div className="bg-danger w-fit min-w-[8rem] px-3 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                {study.priority}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="text-3xl text-shadow">
                  <p>
                    <label className="font-semibold">
                      {study.patient.gender}
                    </label>
                  </p>
                  <p>
                    <label className="font-semibold">
                      Fecha de nacimiento:{" "}
                    </label>
                    <label>{study.patient.birthDate?.toString()}</label>
                  </p>
                  <p>
                    <label className="font-semibold">Edad: </label>
                    <label>24</label>
                  </p>
                  <p>
                    <label className="font-semibold">
                      Documento de identidad:{" "}
                    </label>
                    <label>{study.patient.patientId}</label>
                  </p>
                  <p>
                    <label className="font-semibold">
                      Número de telefono:{" "}
                    </label>
                    <label>{study.patient.phoneNumber}</label>
                  </p>
                </div>
              </div>
              <div className="col-span-1 ml-5 text-shadow">
                <h6 className="font-semibold text-2xl">Alergias</h6>
                <p>
                  {study.patient.allergies
                    ? study.patient.allergies
                    : "Sin detalles"}
                </p>
                <h6 className="font-semibold text-2xl">Condición médica</h6>
                <p>
                  {study.patient.medicalCondition
                    ? study.patient.medicalCondition
                    : "Sin detalles"}
                </p>
              </div>
            </div>
          </section>
        )}
      </section>
      <div className="text-center">
        <button
          className="filledTertiary text-4xl font-bold w-fit px-5 py-3 rounded-full"
          type="button"
          title="Envíar"
        >
          <label>Envíar</label>
        </button>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
}

export default StudyResumen;
