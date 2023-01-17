import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Gender, Patient } from "models/latrikModels";
import { addPatient } from "api/patientsApi";
import React from 'react';
import { useNavigate } from "react-router";

function PatientForm() {
  const today: string = new Date().toISOString().split("T")[0];
  const [patient, setPatient] = React.useState<Patient>()
  const navigate = useNavigate();

  const resetForm = (action: Function) => {
    //Funcion setValues()
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
  };

  return (
    <Formik
      initialValues={{
        id: "",
        patientId: patient?.patientId != null ? patient.patientId : "",
        name: patient?.name ? patient.name : "",
        email: patient?.email ? patient?.email : "",
        phoneNumber: patient?.phoneNumber ? patient.phoneNumber : "",
        birthDate: patient?.birthDate ? patient.birthDate : "",
        gender: patient?.gender || "0",
        allergies: patient?.allergies ? patient.allergies : "",
        medicalCondition: patient?.medicalCondition
          ? patient.medicalCondition
          : "",
      }}
      onSubmit={(values: Patient, { setSubmitting }) => {
        setSubmitting(true);
        addPatient(values).then(
          (res) => {
            console.log("res: ", res);
            setPatient(res.data);
            setSubmitting(false);
            navigate('/StudyForm/',{state: {patientId: res.data.id}})
          },
          (err) => {
            console.log("err", err);
          }
        );
      }}
      validationSchema={Yup.object({
        patientId: Yup.string().required("Requerido"),
        name: Yup.string().required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido"),
        gender: Yup.string().required("Requerido"),
        phone: Yup.string(),
        birthDate: Yup.date()
          .max(today, "Fecha inválida")
          .required("Requerido"),
        allergies: Yup.string(),
        medicalCondition: Yup.string(),
      })}
    >
      {({ isValid, setValues }) => (
        <Form
          className="bg-white container py-10 px-28 rounded-3xl border-primary border m-auto mt-8"
          noValidate
        >
          <h1 className="text-center text-black text-4xl font-bold mb-5">
            Registro de paciente
          </h1>

          <label htmlFor="name">Documento de identidad</label>
          <Field
            id="patientId"
            name="patientId"
            type="string"
            className="w-full invalid invalid:border-b-danger"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="patientId" />
          </p>

          <label htmlFor="name">Nombre</label>
          <Field
            id="name"
            name="name"
            type="text"
            className="w-full invalid:border-b-danger"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="name" />
          </p>

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" className="w-full" />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="email" />
          </p>

          <label htmlFor="birthDate">Fecha de nacimiento</label>
          <Field
            id="birthDate"
            name="birthDate"
            type="date"
            max={today}
            className="w-full"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="birthDate" />
          </p>

          <label htmlFor="gender">Género</label>
          <Field id="gender" name="gender" as="select" className="w-full">
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
            <option value="3">Na</option>
          </Field>
          <p className="block mb-3 text-danger">
            <ErrorMessage name="gender" />
          </p>

          <label htmlFor="phoneNumber">Número de telefono</label>
          <Field
            id="phoneNumber"
            name="phoneNumber"
            type="string"
            className="w-full"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="phoneNumber" />
          </p>

          <label htmlFor="allergies">Alergias</label>
          <Field
            id="allergies"
            name="allergies"
            as="textarea"
            className="w-full"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="allergies" />
          </p>

          <label htmlFor="medicalCondition">Condición médica</label>
          <Field
            id="medicalCondition"
            name="medicalCondition"
            as="textarea"
            className="w-full"
          />
          <p className="block mb-3 text-danger">
            <ErrorMessage name="medicalCondition" />
          </p>

          <div className="flex justify-around mt-20">
            <button
              type="button"
              onClick={() => {
                resetForm(setValues);
              }}
              className="filledTertiary rounded-xl w-44 h-12"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="filledTertiary rounded-xl w-44 h-12 disabled:opacity-50"
              disabled={!isValid}
            >
              Continuar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default PatientForm;
