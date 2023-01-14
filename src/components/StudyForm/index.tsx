import { Formik, Form, Field, ErrorMessage } from "formik";
import { Study } from "models/latrikModels";
import * as Yup from "yup";

function StudyForm({
  setStudy,
  setStep,
  setisOpenConfirmModal
}: {
  setStudy: Function;
  setStep: Function;
  setisOpenConfirmModal: Function
}) {
  const today: string = new Date().toISOString().split("T")[0];

  return (
    <>
      
      <Formik
        initialValues={{
          id: "",
          patient_id: "",
          studyDate: today,
          modality: "CT",
          process: "1",
          priority: "Normal",
          state: "Espera",
        }}
        onSubmit={(values: Study, { setSubmitting }) => {
          setStudy(values);
        }}
        validationSchema={Yup.object({
          studyDate: Yup.date()
            .max(today, "Fecha inválida")
            .max(today, "Fecha inválida")
            .required("Requerido"),
          modality: Yup.string().required("Requerido"),
          process: Yup.string().required(),
          priority: Yup.string().required(),
        })}
      >
        <Form className="bg-white container py-10 px-28 rounded-3xl border-primary border">
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
          <Field id="modality" name="modality" as="select" className="w-full">
            <option value="CT">CT</option>
            <option value="MR">MR</option>
            <option value="PR">PR</option>
            <option value="CR">CR</option>
          </Field>
          <p className="block mb-3 text-danger">
            <ErrorMessage name="modality" />
          </p>

          <label htmlFor="process">Proceso</label>
          <Field id="process" name="process" as="select" className="w-full">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Field>
          <p className="block mb-3 text-danger">
            <ErrorMessage name="process" />
          </p>

          <label htmlFor="priority">Prioridad</label>
          <Field id="priority" name="priority" as="select" className="w-full">
            <option value="Alta">Alta</option>
            <option value="Normal">Normal</option>
            <option value="Baja">Baja</option>
          </Field>
          <p className="block mb-3 text-danger">
            <ErrorMessage name="priority" />
          </p>

          <div className="flex justify-around mt-20">
            <button
              type="button"
              className="filledTertiary rounded-xl w-44 h-12"
              onClick={() => setStep(1)}
            >
              Volver
            </button>
            <button
              type="submit"
              className="filledTertiary rounded-xl w-44 h-12"
              data-bs-toggle="confirmation"
              onClick={() => {
                setisOpenConfirmModal(true);
              }}
            >
              Envíar
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default StudyForm;
