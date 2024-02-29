import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import LandingPage from "./pages/Landingpage";
function App() {
  return (
    <main className="w-full">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
}

export default App;
