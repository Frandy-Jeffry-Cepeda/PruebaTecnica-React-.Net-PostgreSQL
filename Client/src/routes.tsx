import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layouts/Layout';
import AdminDashboard, { loader as adminLoader } from './views/Admin/AdminDashboard';
import CreateEmployee from './views/Admin/CreateEmployee';
import Login from './views/Login';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import UpdateEmployee from './views/Admin/UpdateEmployee';
import EmployeeHome, {loader as employeeHomeLoader } from './views/Empleado/EmployeeHome';
import UpdateInfoEmployee from './views/Empleado/UpdateInfoEmployee';
import InfoEmployee, { loader as infoPersonalEmployee } from './views/Empleado/InfoEmployee';

export const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'admin/dashboard',
        element: <ProtectedRoute allowedRoles={['Admin']} />,
        children: [
          {
            path: '',
            element: <AdminDashboard />,
            loader: adminLoader,
          },
          {
            path: 'crear-employee',
            element: <CreateEmployee />,
          },
          {
            path: 'editar-employee/:id',
            element: <UpdateEmployee />,
          },
        ],
      },
      {
        path: 'user/home',
        element: <ProtectedRoute allowedRoles={['Employee']} />,
        children: [
          {
            path: '',
            element: <EmployeeHome />,
            loader: employeeHomeLoader, 
          },
          {
            path: 'info',
            element: <InfoEmployee />,
            loader: infoPersonalEmployee
          },
          {
            path: 'editar/:id',  // Ahora directamente bajo 'user/home'
            element: <UpdateInfoEmployee />,
          }
        ],
      }
    ],
  },
]);
