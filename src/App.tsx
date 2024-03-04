import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Header from "./components/common/Header";
import LandingPage from "./pages/Landingpage";
import ValidateEmail from "./pages/ValidateEmail";
import Layout from "./pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUser } from "./redux/actions/userActions";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    async function checkAuth() {
      await dispatch(getUser());
    }
    checkAuth();
  }, [dispatch]);
  const { role } = useSelector((state: RootState) => state.userData);
  console.log(role);
  return (
    <main className="w-full">
      {/* <Header /> */}
      <Routes>
        <Route path="verify-email/:token" element={<ValidateEmail />} />
        <Route path="/" element={<Layout role={role} />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
