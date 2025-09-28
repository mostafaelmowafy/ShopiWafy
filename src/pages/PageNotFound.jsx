import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className=" height-100vh flex align-center justify-center background-color-grey-50 p-4.5rem">
      <div className=" background-color-grey-0 border-1 border-radius-10rem text-center">
        <h1>The page you are looking for could not be found 😢</h1>
        <button onClick={moveBack}>&larr; Go back</button>
      </div>
    </main>
  );
}

export default PageNotFound;
