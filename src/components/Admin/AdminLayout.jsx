// components/Admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavigation } from './AdminNavigation';

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminNavigation />
      <main className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
