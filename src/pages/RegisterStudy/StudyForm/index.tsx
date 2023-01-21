import { Modality, Patient, Study, StudyPriority } from "models/latrikModels";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

function StudyForm({
  patient,
  setStudy,
  setShowConfirmationModal,
}: {
  patient: Patient | undefined;
  setStudy: Function;
  setShowConfirmationModal: Function;
}) {
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
  }, []);

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
      <hr className="mb-5 mt-10 text-mediumGrey" />
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
        onSubmit={(values: any, { setSubmitting }) => {
          if (values.patient) {
            setShowConfirmationModal(true);
            setStudy(values);
          }
        }}
        validationSchema={Yup.object({
          studyDate: Yup.date().required("Requerido"),
          modality: Yup.number().required("Requerido"),
          procedure: Yup.string()
            .max(30, "30 caracteres máximo")
            .required("Requerido"),
          priority: Yup.number().required("Requerido"),
          referringPhysician: Yup.string()
            .required("Requerido")
            .max(30, "Máximo 30 caracteres"),
        })}
      >
        {({ setValues }) => (
          <Form>
            <h4 className="text-black text-2xl font-bold mb-5">Estudio</h4>

            <fieldset
              disabled={patient?.id === undefined}
              className="flex justify-around"
            >
              <div className="w-[45%]">
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

                <label htmlFor="referringPhysician">Médico asignado</label>
                <Field
                  id="referringPhysician"
                  name="referringPhysician"
                  // as="select"
                  className="w-full"
                ></Field>
                <p className="block mb-3 text-danger">
                  <ErrorMessage name="referringPhysician" />
                </p>
              </div>
              <div className="w-[45%] h-full">
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
              </div>
            </fieldset>

            <div className="flex justify-evenly mt-5 mx-auto">
              <button
                type="button"
                className="outlineDanger rounded-xl w-44 h-12 text-2xl"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="filledPrimary rounded-xl w-44 h-12 disabled:opacity-50 text-2xl"
                disabled={patient?.id === undefined}
              >
                Continuar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudyForm;
