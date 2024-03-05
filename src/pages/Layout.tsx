import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";

import UserLayout from "@/components/Layouts/user/UserLayout";
import AdminLayout from "@/components/Layouts/admin/AdminLayout";

const Layout = ({ role }: { role?: "user" | "admin" | "company" | null }) => {
  if (role === "user") {
    return <UserLayout />;
  } else if (role === "admin") {
    return(
      <AdminLayout/>
    )
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
