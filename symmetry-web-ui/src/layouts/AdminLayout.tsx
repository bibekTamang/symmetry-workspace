import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { NAVIGATION_ITEMS } from "../config/navigation";
import type { UserRole } from "../types/AuthTypes";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import Brand from "../components/Brand";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { selectAuthUser } from "../redux/features/auth/authSlice";
import ProfileDropdown from "../components/navigation/ProfileDropdown";
import { logout } from "../redux/features/auth/authThunk";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  userRole: UserRole;
}

export const AdminLayout = ({ userRole }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  const allowedNavItems = NAVIGATION_ITEMS.filter((item) =>
    item.allowedRoles.includes(userRole),
  );

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="layout-root">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`sidebar ${isMobileMenuOpen ? "translate-x-0" : "sidebar-hidden"} h-full flex flex-col justify-between`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="sidebar-header">
            <Brand variant="Dark" />
            <button onClick={toggleMenu} className="md:hidden">
              <IoCloseOutline size={20} />
            </button>
          </div>

          <nav className="sidebar-nav">
            {allowedNavItems.map((item) => {
              const IconComponent = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "nav-item-active" : ""} flex gap-2 relative z-10`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-indicator"
                          className="absolute inset-0 bg-brand-primary rounded-md -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {IconComponent && (
                        <IconComponent size={20} className="shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <ProfileDropdown user={user} onLogout={logoutUser} />
      </aside>

      {/* Main Content Area */}
      <div className="content-wrapper">
        <header className="mobile-header">
          <Brand variant="Dark" />
          <button onClick={toggleMenu} className="p-2 text-gray-600">
            <RiMenu3Line size={24} />
          </button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
