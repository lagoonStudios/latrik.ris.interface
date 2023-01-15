import TriangleWarning from "assets/icons/TriangleWarning.svg";

function ConfirmModal({ setisOpenConfirmModal, submitInfo }: { setisOpenConfirmModal: Function;submitInfo: Function }) {
  return (
    <div className="modal">
      <div className="modalContainer bg-primary w w-1/2 h-1/2 rounded-3xl p-10 max-w-7xl">
          <img src={TriangleWarning} alt="Alert icon" className="w-48 h-48" />
        <h3 className="block font-bold text-4xl">
          ¿Estás seguro que los datos introducidos son correctos?
        </h3>
        <div className="flex justify-around">
          <button
            className="filledTertiary rounded-xl w-44 h-9"
            type="button"
            onClick={() => setisOpenConfirmModal(false)}
          >
            Volver
          </button>
          <button onClick={() => submitInfo()} className="filledTertiary rounded-xl w-44 h-9" type="button">
            Envíar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
