import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modality, Patient, Study, StudyPriority } from "models/latrikModels";
import * as Yup from "yup";
import React, { useCallback, useEffect } from "react";
import { getPatientById } from "api/patientsApi";
import { useLocation, useNavigate } from "react-router";
import { BackButton } from "components/BackButton";
import { addStudy } from "../../api/studiesApi";
import Loader from "components/Loader";
import StudyConfirmationModal from "./StudyConfirmationModal";

function StudyForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { patientId } = state;

  const [patient, setPatient] = React.useState<Patient>();
  const [study, setStudy] = React.useState<Study>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false)

  const [modalities, setModalities] = React.useState<
    { value: number; label: string }[]
  >([]);
  const [priorities, setPriorities] = React.useState<
    { value: number; label: string }[]
  >([]);

  const today: string = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setIsLoading(true);
    if (patientId)
      getPatientById(patientId).then(
        (res) => {
          console.log("patientRes: ", res);
          setPatient(res.data);
          setIsLoading(false);
        },
        (err) => {
          console.log("patientErr: ", err);
          setIsLoading(false);
        }
      );

    const rollModalities = () => {
      let modals: { value: number; label: string }[] = [];
      for (let i = 0; i < 18; i++) {
        modals[i] = { value: i, label: Modality[i] };
      }
      setModalities(modals);
    };

    const rollPriorities = () => {
      let priors: { value: number; label: string }[] = [];
      for (let i = 0; i < 4; i++) {
        priors[i] = { value: i, label: StudyPriority[i] };
      }
      setPriorities(priors);
    };

    rollPriorities();
    rollModalities();
  }, []);

  const traducePriority = useCallback(
    (label: string) => {
      switch (label) {
        case StudyPriority[0]:
          return "Baja";
        case StudyPriority[1]:
          return "Normal";
        case StudyPriority[2]:
          return "Urgente";
        case StudyPriority[3]:
          return "Emergencia";
        default:
          return "";
      }
    },
    [priorities]
  );
  return (
    <>
      <BackButton />
      {patient && (
        <Formik
          initialValues={{
            id: "",
            studyInstanceUID: "",
            pacsUID: "",
            referringPhysician: "",
            patient: patient,
            studyDate: today,
            modality: "0",
            procedure: "",
            status: "",
            priority: "0",
          }}
          onSubmit={(values: Study, { setSubmitting }) => {
            addStudy(values).then(
              (res) => {
                console.log("res: ", res);
                console.log("validando: ", values);
                setStudy(values);
                setSubmitting(false);
                setShowConfirmationModal(true);
              },
              (err) => {
                console.log("err: ", err);
              }
            );
          }}
          validationSchema={Yup.object({
            studyDate: Yup.date().required("Requerido"),
            modality: Yup.number().required("Requerido"),
            procedure: Yup.string()
              .max(30, "30 caracteres máximo")
              .required("Requerido"),
            priority: Yup.number().required(),
          })}
        >
          {({ isValid }) => (
            <Form className="bg-white container py-10 px-28 rounded-3xl border-primary border m-auto mt-8">
              {/* <FormContext setClearForm={undefined} clearForm={false} /> */}

              <h1 className="text-center text-black text-4xl font-bold mb-5">
                Registro de Estudio
              </h1>

              <label htmlFor="name">Fecha del estudio</label>
              <Field
                id="studyDate"
                name="studyDate"
                type="date"
                className="w-full invalid:border-b-danger"
              />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="studyDate" />
              </p>

              <label htmlFor="modality">Modalidad</label>
              <Field
                id="modality"
                name="modality"
                as="select"
                className="w-full"
              >
                {modalities.map(({ value, label }) => (
                  <option value={value} key={label}>
                    {label}
                  </option>
                ))}
              </Field>
              <p className="block mb-3 text-danger">
                <ErrorMessage name="modality" />
              </p>

              <label htmlFor="procedure">Proceso</label>
              <Field id="procedure" name="procedure" className="w-full" />
              <p className="block mb-3 text-danger">
                <ErrorMessage name="procedure" />
              </p>

              <label htmlFor="priority">Prioridad</label>
              <Field
                id="priority"
                name="priority"
                as="select"
                className="w-full"
              >
                {priorities.map(({ value, label }) => (
                  <option value={value} key={label}>
                    {traducePriority(label)}
                  </option>
                ))}
              </Field>
              <p className="block mb-3 text-danger">
                <ErrorMessage name="priority" />
              </p>

              <div className="flex justify-around mt-20">
                <button
                  type="button"
                  className="filledTertiary rounded-xl w-44 h-12"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="filledTertiary rounded-xl w-44 h-12 disabled:opacity-50"
                  disabled={!isValid}
                >
                  Envíar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {showConfirmationModal && <StudyConfirmationModal setShowConfirmationModal={setShowConfirmationModal} />}
      <Loader isLoading={isLoading} />
    </>
  );
}

export default StudyForm;
