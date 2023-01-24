import React from "react";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Gender, Patient } from "models/latrikModels";

import { BackButton } from "components/BackButton";
import Loader from "components/Loader";
import PatientConfirmationModal from "./PatientConfirmationModal";
import { toast } from "react-hot-toast";

import {
  addDoc,
  setDoc,
  doc,
  collection,
  getFirestore,
} from "firebase/firestore";

function PatientForm() {
  const patientsRef = collection(getFirestore(), "Patients");
  const addPatient = async (values: Patient) => {
    const snap = await addDoc(patientsRef, values);
    values.id = snap.id;
    setPatient(values);
    return setDoc(doc(getFirestore(), "Patients", values.id), values).then(
      (res) => {
        // toast.success("Paciente creado correctamente");
      },
      (err) => {
        toast.error("Ha ocurrido un error");
      }
    );
  };

  const navigate = useNavigate();
  const today: string = new Date().toISOString().split("T")[0];
  const [patient, setPatient] = React.useState<Patient>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] =
    React.useState<boolean>(false);

  const resetForm = (action: Function) => {
    //Funcion setValues()
    setTimeout(() => {
      action(
        {
          patientId: "",
          name: "",
          email: "",
          phoneNumber: "",
          birthDate: "",
          gender: Gender[0],
          allergies: "",
          medicalCondition: "",
        },
        false
      );
    }, 1);
  };

  return (
    <>
      <BackButton goTo={-1} />
      <Formik
        initialValues={{
          id: "",
          patientId: patient?.patientId != null ? patient.patientId : "",
          name: patient?.name ? patient.name : "",
          email: patient?.email ? patient?.email : "",
          phoneNumber: patient?.phoneNumber ? patient.phoneNumber : "",
          birthDate: patient?.birthDate ? patient.birthDate : "",
          gender: patient?.gender || Gender.Other,
          allergies: patient?.allergies ? patient.allergies : "",
          medicalCondition: patient?.medicalCondition
            ? patient.medicalCondition
            : "",
        }}
        onSubmit={(values: Patient, { setSubmitting }) => {
          setSubmitting(true);
          setIsLoading(true);
          addPatient(values).then(
            (res: any) => {
              setSubmitting(false);
              setIsLoading(false);
              setShowConfirmation(true);
            },
            (err: any) => {
              setSubmitting(false);
              setIsLoading(false);
              console.log("err", err);
            }
          );
        }}
        validationSchema={Yup.object({
          patientId: Yup.string().required("Requerido").ensure().trim(),
          name: Yup.string().required("Requerido").ensure().trim(),
          email: Yup.string()
            .email("Email inválido")
            .required("Requerido")
            .ensure()
            .trim(),
          gender: Yup.number().required("Requerido"),
          phoneNumber: Yup.string()
            .max(15, "Máximo 15 caracteres")
            .ensure()
            .trim(),
          birthDate: Yup.date()
            .max(today, "Fecha inválida")
            .required("Requerido"),
          allergies: Yup.string()
            .max(30, "Máximo 30 caracteres")
            .ensure()
            .trim(),
          medicalCondition: Yup.string()
            .max(30, "Máximo 30 caracteres")
            .ensure()
            .trim(),
        })}
      >
        {({ isValid, setValues }) => (
          <Form noValidate>
            <div className="bg-white w-full max-w-xl py-10 px-14 rounded-3xl border-primary border-[3px] m-auto">
              <h1 className="text-center text-black text-4xl font-extrabold mb-5">
                Registro de paciente
              </h1>

              <label htmlFor="name">Nombre</label>
              <Field id="name" name="name" type="text" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="name" />
              </p>

              <label htmlFor="name">Documento de identidad</label>
              <Field id="patientId" name="patientId" type="string" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="patientId" />
              </p>

              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="email" />
              </p>

              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <Field id="birthDate" name="birthDate" type="date" max={today} />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="birthDate" />
              </p>

              <label htmlFor="gender">Género</label>
              <Field id="gender" name="gender" as="select">
                <option value="0">Hombre</option>
                <option value="1">Mujer</option>
                <option value="2">Otro</option>
                <option value="3">Na</option>
              </Field>
              <p className="block mb-3 text-danger">
                <ErrorMessage name="gender" />
              </p>

              <label htmlFor="phoneNumber">Número de telefono</label>
              <Field id="phoneNumber" name="phoneNumber" type="string" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="phoneNumber" />
              </p>

              <label htmlFor="allergies">Alergias</label>
              <Field id="allergies" name="allergies" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="allergies" />
              </p>

              <label htmlFor="medicalCondition">Condición médica</label>
              <Field id="medicalCondition" name="medicalCondition" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="medicalCondition" />
              </p>
            </div>
            <div className="flex justify-around my-10 w-4/6 mx-auto">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="outlineDanger rounded-xl w-44 h-12 text-2xl"
              >
                Cancelar
              </button>
              <button
                type="reset"
                onClick={() => {
                  resetForm(setValues);
                }}
                className="outlinePrimary rounded-xl w-44 h-12 text-2xl"
                id="resetFormBtn"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="filledPrimary rounded-xl w-44 h-12 disabled:opacity-50 text-2xl"
                disabled={!isValid}
              >
                Continuar
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showConfirmation && patient && (
        <PatientConfirmationModal patientId={patient.id} />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
}

export default PatientForm;
