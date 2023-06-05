import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Editor = lazy(() => import("./Editor"));
const Other = lazy(() => import("./Other"));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Editor />
            </Suspense>
          }
        />
        <Route
          path="/other"
          element={
            <Suspense>
              <Other />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
