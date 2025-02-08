'use client';

import { useState } from "react";
import ModalDelete from "./modal-delete-cliente";
import { useDisclosure } from "@nextui-org/react";
import { useApi } from "@/providers/api-provider";
import { ModalUpdate } from "./modal-edit-cliente";

export interface User {
  id: string;
  city: string;
  excursao: string;
  id_: string;
  name: string;
  observation: string;
  phone: string;
  sector: string;
  vacancy: string;
}

export function ListClients() {
  const {
    clients,
    getClients,
    setClients,
    filteredClients,
    selectedClients,
    handleCheckboxChange,
  } = useApi();
  const [selectedClientDeleteIndex, setSelectedClientDeleteIndex] = useState<
    number | null
  >(null);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<User | null>(null);
  

  const handleEditClick = (client: User) => {
    setClientToEdit(client); // Passa o cliente completo para edição
    setIsOpenUpdate(true); // Abre o modal
  };

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const updateClientsList = async () => {
    const updatedUsers = await getClients();
    setClients(updatedUsers);
  };

  const handleDeleteClick = (clientId: string) => {
    const index = clients.findIndex((client) => client.id === clientId);
    setSelectedClientDeleteIndex(index);
    onDeleteModalOpen();
  };

  if (!filteredClients) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex-1 overflow-x-auto scrollbar-hidden scroll-container mt-10 flex flex-col gap-4 pr-4 ">
      {filteredClients.map(
        ({ id, name, city, phone, sector, vacancy, excursao, observation }) => (
          <div
            key={id}
            className="grid grid-cols-26 w-full bg-white px-4 py-6 rounded-lg shadow-md"
          >
            <div className="flex items-center w-4">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                checked={selectedClients.some((client) => client.id === id)}
                onChange={() => handleCheckboxChange(id)} // Passando apenas o id
              />
            </div>
            <div className="col-span-6 flex flex-row gap-3 ">
              <div className="w-10 h-10 bg-[#5174ea] rounded-full flex items-center justify-center">
                <span className="font-bold text-white">{name.charAt(0)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold truncate whitespace-nowrap w-32">
                  {name}
                </span>
                <span className="text-xs truncate whitespace-nowrap w-32">
                  {city}
                </span>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Telefone</span>
              <span className="text-xs font-semibold">{phone}</span>
            </div>

            <div className="col-span-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500 truncate">
                Setor:{" "}
                <span className="font-semibold text-gray-900">{sector}</span>
              </span>
              <span className="text-xs text-gray-500">
                Vaga:{" "}
                <span className="font-semibold text-gray-900">{vacancy}</span>
              </span>
            </div>

            <div className="col-span-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Excursão:</span>
              <span className="text-xs font-semibold truncate pr-4">
                {excursao}
              </span>
            </div>

            <div className="col-span-5 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Obs:</span>
              <span className="text-xs font-semibold truncate pr-2">
                {observation}
              </span>
            </div>
            <div className="col-span-2 flex items-center justify-center flex-col gap-2 ">
              <button
                className="text-xs text-blue-500 font-semibold hover:underline"
                onClick={() => handleEditClick({
                  id, name, city, phone, sector, vacancy, excursao, observation,
                  id_: ""
                })}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteClick(id)}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Excluir
              </button>
            </div>
          </div>
        )
      )}
      {clientToEdit && isOpenUpdate && (
        <ModalUpdate
          clientToEdit={clientToEdit} // Passando o cliente para o modal
          setIsOpen={setIsOpenUpdate} isOpen={false} clientId={""}        />
      )}
      {selectedClientDeleteIndex !== null && (
        <ModalDelete
          idClient={clients[selectedClientDeleteIndex]?.id}
          onOpenChange={onDeleteModalOpenChange}
          isOpen={isDeleteModalOpen}
          onOpen={onDeleteModalOpen}
          users={clients}
          updateUsersList={updateClientsList}
        />
      )}
    </div>
  );
}
