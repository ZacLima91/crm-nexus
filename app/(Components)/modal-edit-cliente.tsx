'use client';
import { useApi } from "@/providers/api-provider";
import { useActionState, useEffect } from "react";
import { submitNewCliente } from "@/lib/newCliente";
import { submitUpdateCliente } from "@/lib/updateCliente"; // Ação de atualização
import Form from "next/form";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientToEdit?: any; // Cliente a ser editado
  clientId: string;  // ID do cliente a ser editado
}

export const ModalUpdate = ({ setIsOpen, isOpen, clientToEdit, clientId}: ModalCreateProps) => {
  const [state, formAction, pending] = useActionState(
   submitUpdateCliente ,
    null
  );
  const { setClients, getClients } = useApi();

  // Efeito para atualizar a lista após sucesso
  useEffect(() => {
    if (state?.success) {
      // Atualiza a lista de clientes
      const fetchClients = async () => {
        const clients = await getClients(); // Se você tiver o método getClients implementado
        setClients(clients); // Atualiza o estado dos clientes
      };
      fetchClients();

      // Fechar o modal após o sucesso
      setIsOpen(false);
    }
  }, [state?.success, setClients, setIsOpen]);

  const actionWithId = async (formData: FormData) => {
    formData.append("id", clientToEdit.id); // Adiciona o ID antes de enviar
    await formAction(formData); // Chama a Server Action com os dados modificados
  };



  // Usar o `clientId` no caso de edição para preencher o formulário com os dados corretos.
  return (
    <div className="fixed top-0 left-0  w-full h-screen flex justify-center items-center z-30">
      <div className="fixed w-full h-screen bg-black opacity-50 left-0 top-0 z-40"></div>
      <div className="flex flex-col w-3/6 h-auto bg-white relative z-50">
        <div className="w-full flex flex-row justify-between px-10 pt-6">
          <h2 className="text-2xl font-bold">{clientToEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <span className="text-2xl font-bold cursor-pointer" onClick={() => setIsOpen(false)}>X</span>
        </div>
        <Form action={actionWithId} className="px-6 py-4">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2 p-4 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">Nome:</label>
                <input
                  className="border border-gray-600 p-2 rounded-md"
                  type="text"
                  name="name"
                  defaultValue={clientToEdit?.name || ''} // Se for edição, preenche com o valor do cliente
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
                  defaultValue={clientToEdit?.city || ''} // Se for edição, preenche com o valor do cliente
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
                  defaultValue={clientToEdit?.phone || ''} // Se for edição, preenche com o valor do cliente
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
                  defaultValue={clientToEdit?.excursao || ''} // Se for edição, preenche com o valor do cliente
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
                  defaultValue={clientToEdit?.sector || ''} // Se for edição, preenche com o valor do cliente
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
                  defaultValue={clientToEdit?.vacancy || ''} // Se for edição, preenche com o valor do cliente
                  placeholder="Vaga"
                  required
                />
              </div>
            </div>
          </div>
          <div className="p-4 w-full">
            <textarea
              name="observation"
              defaultValue={clientToEdit?.observation || ''} // Se for edição, preenche com o valor do cliente
              placeholder="Observação"
              className="border border-gray-600 p-2 rounded-md w-full"
            />
          </div>
          <div className="p-4">
            <button
              type="submit"
              className="w-full bg-blue-700 py-2 rounded-md text-white font-semibold"
            >
              {clientToEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
