import { Outlet } from "react-router-dom";
import Header from "../components/AdminHeader";

const AdministratorLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdministratorLayout;
