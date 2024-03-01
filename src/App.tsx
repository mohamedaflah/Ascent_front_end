import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import LandingPage from "./pages/Landingpage";
import ValidateEmail from "./pages/ValidateEmail";
function App() {
  return (
    <main className="w-full">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="validate-email" element={<ValidateEmail/>} />
      </Routes>
    </main>
  );
}

export default App;
