// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientJournalPage from "./pages/ClientJournalPage";
import TherapistPage from "./pages/TherapistPage";
import TherapistDashboard from "./pages/TherapistDashboard";

// Private Routes Imports
import TherapistPrivateRoutes from "./components/TherapistPrivateRoutes";
import ClientPrivateRoutes from "./components/ClientPrivateRoutes";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route element={<ClientPrivateRoutes />}>
            <Route path="/journal" element={<ClientJournalPage />} />
          </Route>
          <Route element={<TherapistPrivateRoutes />}>
            <Route path="/therapist" element={<TherapistPage />} />
            <Route path="/therapist/dashboard" exact element={<TherapistDashboard />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
