import { useEffect } from "react";
import { EmployeeGetInfoForUpdate, EmployeeUpdateInfo } from "../../services/EmployeeServices";
import { useAppStore } from "../../stores/useAppStore";
import { DataEmployee, UpdateFormDataSchema } from "../../types";

import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateInfoEmployee() {
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<UpdateFormDataSchema>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id || "0");

  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const employee = await EmployeeGetInfoForUpdate();
        if (employee) {
          setValue("fullName", employee.fullName);
          setValue("userName", employee.userName);
          setValue("email", employee.email);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    fetchEmployeeData();
  }, [setValue]);

  const onSubmit = async (dataEmployee: DataEmployee) => {
    try {
      await EmployeeUpdateInfo(employeeId, dataEmployee);
      navigate('/user/home/info');
      showNotification({
        text: 'Información actualizada con éxito!',
        error:false
      })
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 sm:p-10 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
            Editar Empleado
          </h2>
          <Link
            to="/admin/dashboard"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm sm:text-base font-bold hover:bg-indigo-500"
          >
            Volver a Info
          </Link>
        </div>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="fullName">Nombre completo:</label>
            <input 
              id="fullName"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded"
              placeholder="Pedro Enriquez Jímenez"
              {...register("fullName", { required: "El nombre completo es obligatorio" })}
            />
            {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="userName">Username:</label>
            <input 
              id="userName"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded"
              placeholder="Pedro"
              {...register("userName", { required: "El username es obligatorio" })}
            />
            {errors.userName && <p className="text-red-600">{errors.userName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded"
              placeholder="user@example.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-3 text-white font-bold text-lg rounded cursor-pointer hover:bg-indigo-700"
            value="Actualizar Empleado"
          />
        </form>
      </div>
    </div>
  );
}

