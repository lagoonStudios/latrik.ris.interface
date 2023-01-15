import { Link } from "react-router-dom";
import AddPerson from "assets/icons/AddPerson.svg";
import ListCheck from "assets/icons/ListCheck.svg";
import Calendar from "assets/icons/Calendar.svg";
import Settings from "assets/icons/Settings.svg";
import Stats from "assets/icons/Stats.svg";

export function SecretaryResumen() {
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
          <Link to="/RegisterPatient">
            <button
              className="w-96 h-80 filledPrimary p-4 text-center rounded-3xl"
              type="button"
              title="Crear Nuevo Eestudio"
            >
              <img
                src={AddPerson}
                alt="Ir a Crear Nuevo Estudio"
                title="Crear Nuevo Estudio"
              />
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
                <img
                  src={ListCheck}
                  alt="Ir a lista de Estudios"
                  title="Lista de Estudios"
                />
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
            title="Calendario"
          >
            <img src={Calendar} className="mb-4" alt="Calendar icon" />
            Calendario
          </button>
          <button
            className="filledTertiary text-white w-64 h-fit p-4 rounded-3xl"
            type="button"
            title="Configuración"
          >
            <img src={Settings} className="mb-4" alt="Settings icon" />
            Configuración
          </button>
          <button
            className="filledTertiary text-white w-64 h-fit p-4 rounded-3xl"
            type="button"
            title="Estadísticas"
          >
            <img src={Stats} className="mb-4" alt="Stats icon" />
            Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
}
