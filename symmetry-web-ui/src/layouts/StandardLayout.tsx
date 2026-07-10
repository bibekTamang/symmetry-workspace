import { Outlet } from "react-router";

export const StandardLayout = () => {
  return (
    <div className="layout-root">
      <div className="content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
