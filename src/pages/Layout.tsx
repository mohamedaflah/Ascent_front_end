import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";

import UserLayout from "@/components/Layouts/user/UserLayout";
import AdminLayout from "@/components/Layouts/admin/AdminLayout";
import CompanyLayout from "@/components/Layouts/company/CompanyLayout";



const Layout = ({ role }: { role?: "user" | "admin" | "company" | null }) => {

  if (role === "user") {
    return <UserLayout />;
  } else if (role === "admin") {
    return <AdminLayout />;
  } else if (role === "company") {
    return <CompanyLayout />;
  } else {
    return (
      <main>
        <Header />
        <Outlet />
      </main>
    );
  }
};
export default Layout;
