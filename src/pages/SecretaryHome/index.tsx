import { Link } from "react-router-dom";
import { ReactComponent as AddPerson } from "assets/icons/AddPerson.svg";
import { ReactComponent as ListCheck } from "assets/icons/ListCheck.svg";
import {ReactComponent as PeopleSvg } from "assets/icons/People.svg"
import Calendar from "assets/icons/Calendar.svg";
import {ReactComponent as SettingsSvg} from "assets/icons/Settings.svg";
import {ReactComponent as StatsSvg} from "assets/icons/Stats.svg";

export function SecretaryHome() {
  return (
    <div>
      <div className="bg-secondary w-full h-1/3 -z-10 fixed">
        {/* background azul clarito */}
      </div>

      <div>
        <div className="mb-5">
          <p className="text-center text-4xl font-bold block">
            Bienvenido de nuevo!
          </p>
        </div>

        <div className="flex justify-evenly mx-28 border-b pb-14">
          <Link to="/PatientForm">
            <button
              className="w-96 h-80 filledPrimary p-4 text-center rounded-3xl"
              type="button"
              title="Crear Nuevo Eestudio"
            >
              <AddPerson className="svg120 fill-white" />
            </button>
            <br />
            <h3 className="text-center text-2xl font-bold mt-9">
              Crear Nuevo Estudio
            </h3>
          </Link>
          <div>
            <Link to="/StudyList">
              <button
                className="w-96 h-80 filledPrimary p-4 text-center rounded-3xl"
                type="button"
                title="Lista de Estudios"
              >
                <ListCheck className="svg120 fill-white" />
              </button>
              <h3 className="text-center text-2xl font-bold mt-9">
                Lista de Estudios
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="my-5">
          <p className="text-center text-4xl font-bold block">
            Accesos rápidos
          </p>
        </div>
        <div className="flex justify-evenly">
          <button
            className="filledTertiary text-white w-64 h-fit p-4 rounded-3xl"
            type="button"
            title="Configuración"
          >
            <SettingsSvg className="svg120 fill-white" />
            Configuración
          </button>
          <Link to={"/PatientList"}>
          <button
            className="filledTertiary text-white w-64 h-fit p-4 rounded-3xl"
            type="button"
            title="Pacientes"
          >
            <PeopleSvg className="svg120 fill-white" />
            Pacientes
          </button>
          </Link>
          <button
            className="filledTertiary text-white w-64 h-fit p-4 rounded-3xl"
            type="button"
            title="Estadísticas"
          >
            <StatsSvg className="svg120 fill-white" />
            Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
}
