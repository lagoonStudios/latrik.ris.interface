import { ReactComponent as InfoSvg } from "assets/icons/Info.svg";

import { useNavigate } from "react-router";

function StudyConfirmationModal({
  setShowConfirmationModal,
  createStudy,
}: {
  setShowConfirmationModal: Function;
  createStudy: Function;
}) {

  return (
    <div className="modal">
      <div className="modalContainer !py-20 w-1/2">
        <InfoSvg className="svg195 fill-primary !mb-8" />
        <h3 className="block font-bold text-4xl">
          ¿Estás seguro que los datos introducidos son correctos?
        </h3>
        <div className="flex justify-around mt-10">
          <button
            onClick={() => setShowConfirmationModal(false)}
            className="outlinePrimary rounded-xl w-44 h-12 text-2xl"
          >
            volver
          </button>
          <button
            onClick={() => createStudy()}
            className="filledPrimary rounded-xl w-44 h-12 text-2xl"
          >
            Envíar
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default StudyConfirmationModal;
