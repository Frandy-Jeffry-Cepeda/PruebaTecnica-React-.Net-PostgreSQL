import { useForm } from "react-hook-form";
import { DataEmployee, UpdateFormDataSchema, UserSchema } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { EmployeeGetInfoForUpdate, EmployeeUpdateInfo } from "../services/EmployeeServices";

export default function UpdateInfoEmployee() {
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<UpdateFormDataSchema>();
  const navigate = useNavigate();

  
  const { id } = useParams<{ id: string }>();

  const employeeId = parseInt(id || "0");

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
      navigate('/user/home');
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  return (
    <>
      <div className="mt-10 mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-slate-500">Editar Información</h2>
          <Link
            to="/user/home"
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Volver a Home
          </Link>
        </div>

        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="fullName">Nombre completo:</label>
            <input 
              id="fullName"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
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
              className="mt-2 block w-full p-3 bg-gray-50"
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
              className="mt-2 block w-full p-3 bg-gray-50"
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
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Actualizar Empleado"
          />
        </form>
      </div>
    </>
  );
}
