import { Suspense } from "react";
import "./Root.scss";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Suspense
          fallback={
            <div>
              <LoadingComponent />
            </div>
          }
        >
          <MainPage />
        </Suspense>
      </>
    ),
  },
]);

function Root() {
  return (
    <div className="root">
      <RouterProvider router={router} />
    </div>
  );
}

export default Root;
