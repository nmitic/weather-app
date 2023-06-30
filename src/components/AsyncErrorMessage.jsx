import { useAsyncError } from "react-router-dom";

export const AsyncErrorMessage = () => {
  const error = useAsyncError();

  return (
    <div className="flex justify-center flex-col text-center py-20">
      <div className="mb-8">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
      <div>{error.message}</div>
    </div>
  );
};
