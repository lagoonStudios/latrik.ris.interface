import { BackButton } from "components/BackButton";
import { Gender, Patient, Study } from "models/latrikModels";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowSmallRight from "assets/icons/ArrowSmallRight.svg";
import { getStudyById } from "api/studiesApi";

function StudyResumen() {
  const { id } = useParams();
  const [study, setStudy] = React.useState<Study>();

  useEffect(() => {
    if (id) {
      getStudyById(id).then(
        (res) => {
          console.log("res: ", res);
          setStudy(res.data);
        },
        (err) => {
          console.log("err: ", err);
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
          <section className="bg-primary rounded-3xl my-10 mx-auto p-5 max-w-4xl shadow-buttonShadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-6xl text-white text-shadow">
                {study.patient.name}
              </h3>
              <div>
                <label className="text-xl">Fecha de estudio: </label>
                <label className="text-xl font-bold"> {study.studyDate}</label>
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
                <div className="text-3xl">
                  <p>
                    <label className="font-semibold">{study.patient.gender}</label>
                  </p>
                  <p>
                    Fecha de nacimiento:{" "}
                    <label className="font-semibold">
                      {study.patient.birthDate?.toString()}
                    </label>
                  </p>
                  <p>
                    Edad: <label className="font-semibold">24</label>
                  </p>
                  <p>
                    Documento de identidad:{" "}
                    <label className="font-semibold">{study.patient.patientId}</label>
                  </p>
                  <p>
                    Número de telefono:{" "}
                    <label className="font-semibold">
                      {study.patient.phoneNumber}
                    </label>
                  </p>
                </div>
              </div>
              <div className="col-span-1 ml-5">
                <h6 className="font-semibold text-2xl">Alergias</h6>
                <p>{study.patient.allergies ? study.patient.allergies : "Sin detalles"}</p>
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
          <label>
            Envíar <img src={ArrowSmallRight} className="inline" alt="" />
          </label>
        </button>
      </div>
    </>
  );
}

export default StudyResumen;
