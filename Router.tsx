import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./"));

export default function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            user ? (
              <Suspense>
                <Editor />
              </Suspense>
            ) : (
              <Home />
            )
          }
          errorElement={<NotFound />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <Suspense>
                <Admin />
              </Suspense>
            </AdminRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute user={user}>
              <Suspense>
                <Help />
              </Suspense>
            </PrivateRoute>
          }
        />
        {/* <Route path="/contact" element={<Contact />} />
                <Route path="/docs" element={<Docs />} />
                <Route
                    path="/issue-tracker"
                    element={
                        <PrivateRoute user={user}>
                            <IssueTracker />
                        </PrivateRoute>
                    }
                /> */}
        <Route
          path="/signIn"
          element={
            <PublicRoute>
              <Suspense>
                <SignIn />
              </Suspense>
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
