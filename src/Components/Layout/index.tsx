import { Outlet } from "react-router";
import HeaderNav from "./HeaderNav";

function Layout() {
  return (
    <>
      <HeaderNav />
      <Outlet />
    </>
  );
}

export default Layout;
