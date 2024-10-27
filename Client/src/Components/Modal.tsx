import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../types";
import { deleteEmployee } from "../services/Services";

type ModalCProps = {
  employee: UserSchema;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalC({ employee, isOpen, onClose }: ModalCProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      navigate(""); 
      onClose();
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
