import Heading from "./Heading";
import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <main className=" h-[100vh] flex flex-col items-center justify-center p-[4.8rem] bg-gray-50">
        <div className=" bg-gray-0 border border-gray-100 radius-md p-[4.8rem] text-center max-w-[96rem] flex-shrink-0">
          <Heading size="big">Something went wrong 😞</Heading>
          <p className=" mb-8 text-grey-500 font-sono">{error.message}</p>
          <button className={Button} onClick={resetErrorBoundary}>
            Try again
          </button>
        </div>
      </main>
    </>
  );
}

export default ErrorFallback;
