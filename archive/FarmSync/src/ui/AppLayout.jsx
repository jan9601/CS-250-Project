import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="layout-grid">
      <Header />
      <Sidebar />
      <main className="px-[4.8rem] pt-16 pb-[6.4rem] bg-bg">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
