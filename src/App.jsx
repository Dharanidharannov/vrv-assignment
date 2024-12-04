import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import UserManagement from "./components/Usermanagement";
import RoleManagement from "./components/Rolesmanagement";

function App() {
  return (
    <BrowserRouter>
   
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-lg font-bold">RBAC Dashboard</h1>
            <div className="space-x-4">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline"
                    : "text-white hover:text-gray-300"
                }
              >
                User Management
              </NavLink>
              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline"
                    : "text-white hover:text-gray-300"
                }
              >
                Role Management
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
