import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Header from "./components/common/Header";
import LandingPage from "./pages/Landingpage";
import ValidateEmail from "./pages/user/ValidateEmail";
import Layout from "./pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUser } from "./redux/actions/userActions";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import CompanySignup from "./pages/company/CompanySignup";
import CompanyLogin from "./pages/company/CompanyLogin";
import RequestAndApprovel from "./pages/admin/RequestApprovel";
import CompanyDashbord from "./pages/company/CompanyDashboard";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    async function checkAuth() {
      await dispatch(getUser());
    }
    checkAuth();
  }, [dispatch]);
  const { role, user } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full">
      {/* <Header /> */}
      <Routes>
        <Route
          path="verify-email/:token"
          element={!user ? <ValidateEmail /> : <Navigate to={"/"} />}
        />
        <Route
           path="/"
           element={
             role === "admin" ? (
               <Navigate to={"/admin/"} />
             ) : role === "company" ? (
               <Navigate to={"/company/"} />
             ) : (
               <Layout role={role} />
             )
           }
        >
          <Route index element={<LandingPage />} />
          <Route
            path="adm/login"
            element={user ? <Navigate to={"/"} /> : <AdminLogin />}
          />
          <Route
            path="recruiter/signup"
            element={user ? <Navigate to={"/"} /> : <CompanySignup />}
          />
          <Route
            path="recruiter/login"
            element={user ? <Navigate to={"/"} /> : <CompanyLogin />}
          />
        </Route>

        {role === "admin" && (
          <>
            <Route path="/admin/" element={<Layout role={role} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="approvels" element={<RequestAndApprovel />} />
            </Route>
          </>
        )}
        {role === "company" && (
          <Route path="/company/" element={<Layout role={"company"} />}>
            <Route index element={<CompanyDashbord />} />
          </Route>
        )}

        <Route path="admin/*" element={<Navigate to="/" />} />
        <Route path="company/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
