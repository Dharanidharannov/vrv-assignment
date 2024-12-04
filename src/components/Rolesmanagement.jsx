import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ name: "", permissions: [] });
  const allPermissions = ["read", "write", "delete"];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:5000/roles");
    setRoles(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/roles", form);
    setForm({ name: "", permissions: [] });
    fetchRoles();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Role Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Role Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <div className="space-y-2">
          {allPermissions.map((perm) => (
            <label key={perm} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.permissions.includes(perm)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setForm({ ...form, permissions: [...form.permissions, perm] });
                  } else {
                    setForm({ ...form, permissions: form.permissions.filter((p) => p !== perm) });
                  }
                }}
                className="form-checkbox"
              />
              <span>{perm}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Role
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-2">{role.name}</td>
                <td className="px-4 py-2">{role.permissions.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
