import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPaciente from "./pages/Login/LoginPaciente";
import DashboardPaciente from "./pages/Dashboard/DashboardPaciente";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";

export default function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<LoginPaciente />} />
        <Route path="/LoginPaciente" element={<LoginPaciente />} />

        <Route
          path="/DashboardPaciente"
          element={
            <ProtectedRoute role="paciente">
              <DashboardPaciente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/DashboardAdmin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </DataProvider>
  );
}
