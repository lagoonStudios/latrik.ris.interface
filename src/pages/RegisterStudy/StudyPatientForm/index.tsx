import { Formik, Form, Field, ErrorMessage } from "formik";
import { Gender, Patient } from "models/latrikModels";
import * as Yup from "yup";
import {
  addDoc,
  doc,
  setDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import React from "react";

function StudyPatientForm({
  patient,
  setPatient,
  setIsLoading,
}: {
  patient: Patient | undefined;
  setPatient: Function;
  setIsLoading: Function;
}) {
  const patientsRef = collection(getFirestore(), "Patients");
  const addPatient = async (values: Patient) => {
    const snap = await addDoc(patientsRef, values);
    values.id = snap.id;
    setPatient(values);
    return setDoc(doc(getFirestore(), "Patients", values.id), values);
  };

  const formRef = React.useRef<any>();

  const today: string = new Date().toISOString().split("T")[0];

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

  React.useEffect(() => {
    if(patient) formRef.current.setValues(patient);
  }, [patient]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        id: patient?.id ? patient.id : "",
        patientId: patient?.patientId ? patient.patientId : "",
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
        setIsLoading(true);
        if (values.id !== undefined && values.id !== "") {
          setSubmitting(false);
          setIsLoading(false);
        } else if (values.id === undefined || values.id === "") {
          addPatient(values).then(
            (res) => {
              // console.log("res: ", res);
              // setPatient(res.data);
              setSubmitting(false);
              setIsLoading(false);
            },
            (err) => {
              setSubmitting(false);
              setIsLoading(false);
              console.log("err", err);
            }
          );
        }
      }}
      validationSchema={Yup.object({
        patientId: Yup.string().required("Requerido"),
        name: Yup.string().required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido"),
        gender: Yup.string().required("Requerido"),
        phoneNumber: Yup.string().max(15, "Máximo 15 caracteres"),
        birthDate: Yup.date()
          .max(today, "Fecha inválida")
          .required("Requerido"),
        allergies: Yup.string().max(30, "Máximo 30 caracteres"),
        medicalCondition: Yup.string().max(30, "Máximo 30 caracteres"),
      })}
    >
      {({ setValues }) => (
        <Form noValidate>
          <h4 className="text-black text-2xl font-extrabold mb-5">Paciente</h4>
          <div className="flex justify-around items-center">
            <div className="w-[45%]">
              <fieldset disabled={patient?.id !== undefined}>
                <label htmlFor="name">Nombre</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  disabled={patient !== undefined}
                />
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="name" />
                </p>

                <label htmlFor="name">Documento de identidad</label>
                <Field
                  id="patientId"
                  name="patientId"
                  type="string"
                  disabled={patient !== undefined}
                />
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="patientId" />
                </p>

                <label htmlFor="birthDate">Fecha de nacimiento</label>
                <Field
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  max={today}
                  disabled={patient !== undefined}
                />
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="birthDate" />
                </p>

                <label htmlFor="gender">Género</label>
                <Field
                  id="gender"
                  name="gender"
                  as="select"
                  disabled={patient !== undefined}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                  <option value="3">Na</option>
                </Field>
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="gender" />
                </p>
              </fieldset>
            </div>
            <div className="w-[45%]">
              <fieldset disabled={patient?.id !== undefined}>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" />
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="email" />
                </p>

                <label htmlFor="phoneNumber">Número de telefono</label>
                <Field id="phoneNumber" name="phoneNumber" type="string" />
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="phoneNumber" />
                </p>
              </fieldset>
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
          </div>
          <div className="flex justify-evenly my-5">
            <button
              type="submit"
              className="outlinePrimary rounded-xl w-44 h-12 disabled:opacity-50 text-2xl"
              disabled={patient?.id === undefined}
            >
              Actualizar
            </button>

            <button
              type="reset"
              className="outlinePrimary rounded-xl w-44 h-12 text-2xl"
              id="resetFormBtn"
              disabled={patient?.id !== undefined}
              onClick={() => {
                resetForm(setValues);
              }}
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="filledPrimary rounded-xl w-44 h-12 text-2xl"
              disabled={patient?.id !== undefined}
            >
              Crear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default StudyPatientForm;
