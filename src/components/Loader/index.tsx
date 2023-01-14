import { Watch } from "react-loader-spinner";

function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading === true && (
        <div className="modal">
        <div className="w-fit h-fit bg-tertiary rounded-3xl p-3">
            <Watch
                height="80"
                width="80"
                radius="48"
                color="#000"
                ariaLabel="loading"
                visible={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Loader;
