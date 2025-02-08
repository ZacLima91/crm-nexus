"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Client } from "@prisma/client";

export type ClientData = {
  name: string;
  city: string;
  phone: string;
  excursao: string;
  observation: string;
  sector: string;
  vacancy: string;
  userId: string;
};

type ApiContextType = {
  getClients: () => Promise<Client[]>;
  createClient: (data: ClientData) => Promise<ClientData>;
  updateClient: (id: string, data: ClientData) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  totalClients: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredClients: Client[];
  handleCheckboxChange: (id: string) => void;
  selectedClients: {
    name: string;
    id: string;
    city: string;
    excursao: string;
    observation: string;
    phone: string;
    sector: string;
    vacancy: string;
    userId: string
  }[]; // Apenas ids dos clientes selecionados
  setSelectedClients: Dispatch<
    SetStateAction<
      {
        name: string;
        id: string;
        city: string;
        excursao: string;
        observation: string;
        phone: string;
        sector: string;
        vacancy: string;
        userId: string
        
      }[]
    >
  >;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = axios.create({
    baseURL: "/api/client",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const totalClients = clients.length;

  // Alterado para string[], já que queremos armazenar apenas os ids
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedClients((prevSelectedClients) => {
      // Encontre o cliente com base no id
      const client = clients.find((client) => client.id === id);
      if (client) {
        // Se o cliente for encontrado, manipule o array de clientes selecionados
        if (prevSelectedClients.some((selected) => selected.id === client.id)) {
          return prevSelectedClients.filter(
            (selected) => selected.id !== client.id
          );
        } else {
          return [...prevSelectedClients, client];
        }
      }
      return prevSelectedClients;
    });
  };

  console.log(clients);

  const getClients = async () => {
    const res = await api.get("");
    const data = res.data.users;
    return data;
  };

  useEffect(() => {
    const getAll = async () => {
      const response = await getClients();
      setClients(response);
    };
    getAll();
  }, []);

  const filteredClients = clients.filter((cliente) =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createClient = async (data: ClientData) => {
    const res = await api.post("", data);
    const newClient = res.data;
    setClients([...clients, newClient]);
    return newClient;
  };

  const updateClient = async (id: string, data: ClientData) => {
    console.log(data);
    const res = await api.patch(`/${id}`, data);
    const updatedClient = res.data;
    setClients((prevClients) =>
      prevClients.map((client) => (client.id === id ? updatedClient : client))
    );
    return updatedClient;
  };

  const deleteClient = async (id: string) => {
    await api.delete(`/${id}`);
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  return (
    <ApiContext.Provider
      value={{
        getClients,
        createClient,
        updateClient,
        deleteClient,
        clients,
        totalClients,
        filteredClients,
        searchTerm,
        setSearchTerm,
        handleCheckboxChange,
        selectedClients,
        setSelectedClients,
        setClients,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
