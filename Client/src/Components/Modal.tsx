import { UserSchema } from "../types";
import { deleteEmployee } from "../services/AdminServices";
import { useAppStore } from "../stores/useAppStore";

import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type ModalCProps = {
  employee: UserSchema;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalC({ employee, isOpen, onClose }: ModalCProps) {
  const navigate = useNavigate();

  const showNotification = useAppStore((state) => state.showNotification)

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      navigate(""); 
      onClose();
      if(employee.id === 1) {
        showNotification({
          text: 'Este Admin no se puede eliminar!',
          error:true
        })
      } else {
        showNotification({
          text: 'Empleado eliminado con éxito!',
          error:false
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Confirmación</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro que deseas eliminar a este empleado?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={onClose}>
              Cerrar
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
