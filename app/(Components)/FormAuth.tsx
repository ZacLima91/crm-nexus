"use client";

import { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import { loginAction } from "@/lib/signin";

export function FormAuth() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    {message: ""}
  );

  return (
    <>
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-700">
          Nexus CRM
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Revolucione a gestão do seu negócio
        </p>

        <div className="w-full mt-6 p-6 rounded-lg shadow-md border border-gray-200">
          <Form
            action={formAction}
          >
            <h2 className="text-2xl text-gray-700 font-semibold mb-4">
              Faça Login
            </h2>

            {state.message && (
              <p className="text-red-500 text-sm mb-3">{state.message}</p>
            )}

            <input
              type="text"
              name="userName"
              placeholder="Seu nome"
              className="mb-3 w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              className="mb-3 w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#5174ea] text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>
          </Form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Não tem uma conta?{" "}
            <a
             
              className="text-[#5174ea] hover:underline"
            >
              Inscreva-se
            </a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Esqueceu sua senha?{" "}
            <Link
              href="/ForgotPassword"
              className="text-[#5174ea] hover:underline"
            >
              Recuperar
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
