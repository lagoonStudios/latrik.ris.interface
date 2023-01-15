import { BackButton } from "components/BackButton";
import { Gender, Patient } from "models/latrikModels";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowSmallRight from "assets/icons/ArrowSmallRight.svg";

function StudyResumen() {
  const { id } = useParams();
  const [patient, setPatient] = React.useState<Patient>();

  useEffect(() => {
    setPatient(
      new Patient({
        id: "",
        patientId: id,
        name: "Leonardo",
        email:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum vitae nisi delectus esse velit sit molestias non doloribus necessitatibus quasi error beatae laborum sapiente accusantium commodi odit, voluptatum ex minus!",
        phoneNumber: "+123123",
        birthDate: "12/12/21",
        gender: "Male",
        allergies:
          "",
        medicalCondition:
          ""
      })
    );
  }, []);

  return (
    <>
      <BackButton />
      <section className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Resumen de estudio </h3>
        {patient && (
          <section className="bg-primary rounded-3xl m-10 p-5 min-h-[400px] shadow-buttonShadow">
            <div className="flex justify-between">
              <h3 className="font-bold text-4x1 text-white text-4xl text-shadow">
                {patient.name}
              </h3>
              <label>12/12/22</label>
            </div>
            <div className="flex justify-around w-1/2 my-5">
              <div className="bg-green w-28 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                CT
              </div>
              <div className="bg-orange w-28 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                1
              </div>
              <div className="bg-danger w-28 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                Urgente
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="text-base">
                  <p className="text-lg">
                    <label className="font-semibold">
                      {new Gender(patient.gender).getGender()}
                    </label>
                  </p>
                  <p className="text-lg">
                    Fecha de nacimiento:{" "}
                    <label className="font-semibold">
                      {patient.birthDate?.toString()}
                    </label>
                  </p>
                  <p className="text-lg">
                    Edad: <label className="font-semibold">12</label>
                  </p>
                  <p className="text-lg">
                    Documento de identidad:{" "}
                    <label className="font-semibold">{patient.patientId}</label>
                  </p>
                  <p className="text-lg">
                    Número de telefono:{" "}
                    <label className="font-semibold">
                      {patient.phoneNumber}
                    </label>
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <h6 className="font-semibold text-2xl">Alergias</h6>
                <p>{patient.allergies ? patient.allergies : 'Sin detalles'}</p>
                <h6 className="font-semibold text-2xl">Condición médica</h6>
                <p>{patient.medicalCondition ? patient.medicalCondition : 'Sin detalles'}</p>
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
            Envíar {' '}
            <img src={ArrowSmallRight} className="inline" alt="" />
          </label>
        </button>
      </div>
    </>
  );
}

export default StudyResumen;
