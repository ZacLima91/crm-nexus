"use client";
import { useApi } from "@/providers/api-provider";
import { useActionState, useEffect } from "react";
import { submitNewCliente } from "@/lib/newCliente";
import Form from "next/form";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreate = ({ setIsOpen, isOpen }: ModalCreateProps) => {
  const [state, formAction, isPending] = useActionState(submitNewCliente, {
    success: false,
    message: "",
  });
  const { setClients, getClients } = useApi();

  useEffect(() => {
    if (state?.success) {
      // Chama a função getClients para pegar a lista atualizada
      const fetchClients = async () => {
        const clients = await getClients(); 
        console.log("Clientes atualizados:", clients); // Verifique se os dados estão vindo corretamente
        setClients(clients); 
      };
      fetchClients();
  
      // Fechar o modal após o sucesso
      setIsOpen(false);
    }
  }, [state?.success, setClients, setIsOpen]);

  return (
    <div className="fixed top-0 left-0  w-full h-screen flex justify-center items-center z-30">
      <div className="fixed w-full h-screen bg-black opacity-50 left-0 top-0 z-40"></div>
      <div className="flex flex-col w-3/6 h-auto bg-white relative z-50">
        <div className="w-full flex flex-row justify-between px-10 pt-6">
          <h2 className="text-2xl font-bold">Novo Usuário</h2>
          <span
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            X
          </span>
        </div>
        <Form action={formAction} className="px-6 py-4">
          <div className="flex flex-row w-full ">
            <div className="flex flex-col w-1/2 p-4 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Nome:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="name"
                  placeholder="name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Cidade:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Telefone:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-4 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Excursão:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="excursao"
                  placeholder="Excursão"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Setor:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="sector"
                  placeholder="Setor"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Vaga:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="vacancy"
                  placeholder="Vaga"
                  required
                />
              </div>
            </div>
          </div>
          <div className="p-4 w-full">
            <textarea
              name="observation"
              placeholder="Observação"
              className="border border-gray-600 p-2 rounded-md w-full"
            />
          </div>
          <div className="p-4">
            <button
              type="submit"
              className="w-full bg-blue-700 py-2 rounded-md text-white font-semibold"
            >
              Criar usuário
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
