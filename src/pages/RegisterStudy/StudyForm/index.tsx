import { Modality, Patient, Study, StudyPriority } from "models/latrikModels";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addStudy } from "api/studiesApi";
import * as Yup from 'yup';
import { useNavigate } from "react-router";

function StudyForm({ patient, setStudy }: { patient: Patient | undefined, setStudy: Function }) {
    const navigate = useNavigate();
  const today: string = new Date().toISOString().split("T")[0];

  const [modalities, setModalities] = React.useState<
    { value: number; label: string }[]
  >([]);
  const [priorities, setPriorities] = React.useState<
    { value: number; label: string }[]
  >([]);

  React.useEffect(() => {
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
  }, [patient?.id]);

  const traducePriority = React.useCallback((label: string) => {
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
  }, []);
  return (
    <div>
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
                // setStudy(values);
                setSubmitting(false);
                // setShowConfirmationModal(true);
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
                  className="filledPrimary rounded-xl w-44 h-12"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="filledPrimary rounded-xl w-44 h-12 disabled:opacity-50"
                  disabled={!isValid}
                >
                  Envíar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default StudyForm;
