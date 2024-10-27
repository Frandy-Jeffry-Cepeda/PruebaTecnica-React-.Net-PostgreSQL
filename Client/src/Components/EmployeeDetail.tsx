import { useState } from "react";
import { UserSchema } from "../types";
import ModalC from "./Modal";

import { useNavigate } from "react-router-dom";

type EmployeDetailProps = {
  employee: UserSchema;
};

export default function EmployeeDetail({ employee }: EmployeDetailProps) {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-3 text-lg text-gray-800">{employee.fullName}</td>
        <td className="p-3 text-lg text-gray-800">{employee.role}</td>
        <td className="p-3 text-lg text-gray-800">{employee.departamento}</td>
        <td className="p-3 text-lg text-gray-800">{employee.email}</td>

        <td className="p-3 text-lg text-gray-800">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                navigate(`editar-employee/${employee.id}`)
              }}
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            >
              Editar
            </button>

            <button
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
              onClick={handleOpenModal}
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>

      {isModalOpen && (
        <ModalC
          employee={employee}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
