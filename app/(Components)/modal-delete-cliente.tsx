"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Client } from "@prisma/client";
import { useApi } from "@/providers/api-provider";

interface ModalDeleteProps {
  onOpenChange: () => void;
  isOpen: boolean;
  onOpen: () => void;
  idClient: string;
  users: Client[];
  updateUsersList: () => void;
}

export default function ModalDelete({
  onOpenChange,
  isOpen,
  idClient,
  updateUsersList,
}: ModalDeleteProps) {
  const { deleteClient } = useApi();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => {
          const handlerDelete = async () => {
            try {
              await deleteClient(idClient);
              updateUsersList();
              onClose();
            } catch (error) {
              // Handle error, you might want to show a message to the user
              console.error("Failed to delete client", error);
            }
          };
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deletar Cliente
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handlerDelete} type="submit" color="primary">
                  Deletar
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
