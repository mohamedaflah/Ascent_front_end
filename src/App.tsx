import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Header from "./components/common/Header";
import LandingPage from "./pages/Landingpage";
import ValidateEmail from "./pages/ValidateEmail";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
function App() {
  const {role}=useSelector((state:RootState)=>state.userData)
  console.log(role)
  return (
    <main className="w-full">
      {/* <Header /> */}
       <Routes>
        <Route path="verify-email/:token" element={<ValidateEmail/>} />
        <Route path="/" element={<Layout role={role} />} >
           <Route index element={<LandingPage/>} />
        </Route>
        
      </Routes>
    </main>
  );
}

export default App;
