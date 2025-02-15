import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthSelection from "./components/AuthSelection";
import RegisterSelection from "./components/RegisterSelection";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";
import VerifyEmail from "./components/VerifyEmail";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSelection />} />
        <Route path="/register-selection" element={<RegisterSelection />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
