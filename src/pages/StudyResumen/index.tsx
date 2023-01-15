import { BackButton } from "components/BackButton";
import { Gender, Patient } from "models/latrikModels";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowSmallRight from "assets/icons/ArrowSmallRight.svg";

function StudyResumen() {
  const { id } = useParams();
  const [patient, setPatient] = React.useState<Patient>();

  useEffect(() => {
    const newPatient = new Patient({
      id: "",
      patientId: id,
      name: "Jhon Doe",
      email: "",
      phoneNumber: "+123123",
      birthDate: "12/12/21",
      gender: Gender[0],
      allergies: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum vitae nisi delectus esse velit sit molestias non doloribus necessitatibus quasi error beatae laborum sapiente accusantium commodi odit, voluptatum ex minus!",
      medicalCondition: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum vitae nisi delectus esse velit sit molestias non doloribus necessitatibus quasi error beatae laborum sapiente accusantium commodi odit, voluptatum ex minus!",
    })
    setPatient(newPatient);
  }, []);

  return (
    <>
      <BackButton />
      <section className="mx-6 mb-6">
        <h3 className="font-bold text-4xl">Resumen de estudio </h3>

        {patient && (
          <section className="bg-primary rounded-3xl my-10 mx-auto p-5 max-w-4xl shadow-buttonShadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-6xl text-white text-shadow">
                {patient.name}
              </h3>
              <div>
              <label className="text-xl">Fecha de estudio: </label>
                <label className="text-xl font-bold"> 12/12/22</label>
              </div>
              
            </div>
            <div className="flex justify-around items-center my-5 text-2xl">
              <div className="bg-green w-fit min-w-[8rem] px-3 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                CT
              </div>
              <div className="bg-orange w-fit min-w-[8rem] px-3 mx-5 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                Proceso de pruebas
              </div>
              <div className="bg-danger w-fit min-w-[8rem] px-3 rounded-3xl text-center text-white font-extrabold shadow-buttonShadow">
                Urgente
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="text-3xl">
                  <p>
                    <label className="font-semibold">
                      patient.gender
                    </label>
                  </p>
                  <p>
                    Fecha de nacimiento:{" "}
                    <label className="font-semibold">
                      {patient.birthDate?.toString()}
                    </label>
                  </p>
                  <p>
                    Edad: <label className="font-semibold">24</label>
                  </p>
                  <p>
                    Documento de identidad:{" "}
                    <label className="font-semibold">{patient.patientId}</label>
                  </p>
                  <p>
                    Número de telefono:{" "}
                    <label className="font-semibold">
                      {patient.phoneNumber}
                    </label>
                  </p>
                </div>
              </div>
              <div className="col-span-1 ml-5">
                <h6 className="font-semibold text-2xl">Alergias</h6>
                <p>{patient.allergies ? patient.allergies : "Sin detalles"}</p>
                <h6 className="font-semibold text-2xl">Condición médica</h6>
                <p>
                  {patient.medicalCondition
                    ? patient.medicalCondition
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
