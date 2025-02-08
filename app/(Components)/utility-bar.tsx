"use client";

import React, { useState, useRef, RefObject, useEffect } from "react";
import { Printer, UserRoundPlus } from "lucide-react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ModalCreate } from "./modal-create-cliente";
import { useApi } from "@/providers/api-provider";
import Image from "next/image";

export function UtilityBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { clients, selectedClients } = useApi();

  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Documento de Impressão",
  });

  return (
    <div className="w-full h-10 mt-10 flex flex-row justify-between items-center">
      <div>
        <h2 className="text-gray-700 font-semibold text-3xl">
          Clientes ({clients.length})
        </h2>
      </div>
      <div className="flex space-x-4">
        <button
          className={`${
            isHovered ? "w-32" : "px-2"
          } text-white bg-[#5174ea] flex flex-row p-2 items-center justify-around rounded-lg`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handlePrint()}
        >
          <Printer />
          <span className={`text-sm ${isHovered ? "block" : "hidden"}`}>
            Imprimir ({selectedClients.length})
          </span>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="w-40 text-white bg-[#5174ea] flex flex-row p-2 items-center justify-around rounded-lg "
        >
          <UserRoundPlus width={20} />
          <span className="text-sm">Adicionar Cliente</span>
        </button>
      </div>

      {isOpen && <ModalCreate isOpen={isOpen} setIsOpen={setIsOpen} />}
      {/* Componente CustomDocument com ref */}
      {
        <div className="hidden print:block" ref={contentRef}>
          <div className="flex flex-col h-1/2  print:w-screen">
            {selectedClients.map((client, index) => (
              <div
                key={index}
                className="border w-full h-[50vh]  flex flex-row justify-between"
              >
                <div className="flex bg-[#ebe1da] w-2/3 px-4 py-2 max-h-full">
                  <div className="flex flex-1 p-2 flex-col  w-full">
                    <div className="flex-1">
                      <Image
                        src="/logoObelaPrint.png"
                        alt="Logo1"
                        width={200}
                        height={120}
                      />
                    </div>
                    <div className="border-solid flex-1 border-b-[1px] w-full relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Nome:{" "}
                        <span
                          className={`text-black ${
                            client.name.length < 20 ? "text-base" : "text-sm"
                          }`}
                        >
                          {client.name}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="border-solid border-b-[1px] flex-1 w-full  relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Cidade e UF:{" "}
                        <span
                          className={`text-black ${
                            client.city.length < 10 ? "text-base" : "text-sm"
                          }`}
                        >
                          {client.city}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="border-solid border-b-[1px] flex-1 w-full  relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Telefone:{" "}
                        <span
                          className={`text-black ${
                            client.phone.length < 10 ? "text-base" : "text-sm"
                          }`}
                        >
                          {client.phone}
                        </span>
                      </p>
                    </div>
                    <div className="border-solid border-b-[1px] flex-1 w-full  relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Excursão:{" "}
                        <span
                          className={`text-black ${
                            client.excursao.length < 10
                              ? "text-base"
                              : "text-sm"
                          }`}
                        >
                          {client.excursao}
                        </span>
                      </p>
                    </div>
                    <div className="border-solid border-b-[1px] flex-1 w-full  relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Setor:{" "}
                        <span
                          className={`text-black ${
                            client.sector.length < 10 ? "text-base" : "text-sm"
                          }`}
                        >
                          {client.sector}
                        </span>
                      </p>
                    </div>
                    <div className="border-solid border-b-[1px] flex-1 w-full  relative text-xl border-[#cca46c]">
                      <p className="text-[#cca46c] absolute bottom-0">
                        Vaga:{" "}
                        <span
                          className={`text-black ${
                            client.vacancy.length < 10 ? "text-base" : "text-sm"
                          }`}
                        >
                          {client.vacancy}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="border-solid flex-1 flex border-[#cca46c] p-1 border-[1px] w-full mt-4">
                      <h4 className="text-3xl flex-1 text-[#cca46c] ">
                        OBS:{" "}
                        <span
                          className={`text-black ${
                            client.observation.length < 10
                              ? "text-base"
                              : "text-sm"
                          }`}
                        >
                          {client.observation}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="bg-[#cca46c] w-1/3 px-4 py-2 max-h-full">
                  <div className="flex flex-col ">
                    <Image
                      src="/logoObelaWhite.png"
                      alt="obela"
                      width={90}
                      height={90}
                      className="mt-4"
                    />
                    <div className="mt-4">
                      <h5 className="text-4xl font-bold">
                        Oi Amore,
                        <br />
                        seu pedido <br />
                        chegou!
                      </h5>
                    </div>

                    <div className="mt-6">
                      <p>
                        Queremos agradecer <br />
                        pela confiança. Esperamos que <br />
                        venda tudo rapidinho!
                      </p>

                      <p>
                        O vídeo da abertura do pacote é <br />
                        fundamental para que você seja <br />
                        acobertada(o) de qualquer eventual <br />
                        erro nosso.
                      </p>

                      <p>Deus abençoe suas vendas!</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
