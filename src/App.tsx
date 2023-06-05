import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Main = lazy(() => import("./Main"));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Main />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
