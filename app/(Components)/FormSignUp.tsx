"use client";

import { useActionState } from "react";
import { createUserAction } from "@/lib/signup";
import Form from "next/form";
import Link from "next/link";

export function FormSignUp() {
  const [state, formAction, pending] = useActionState(createUserAction, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Nexus CRM</h1>
        <p className="text-gray-600 mt-2">Crie sua conta e comece agora!</p>
      </div>

      <section className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <Form action={formAction}>
          <h2 className="text-2xl font-semibold mb-4">Inscreva-se</h2>

          {state?.message && (
            <p className="text-red-500 text-sm mb-3">{state.message}</p>
          )}

          <input
            type="text"
            name="name"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className="mb-3 w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {pending ? "Criando conta..." : "Criar Conta"}
          </button>
        </Form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem uma conta?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </section>
    </div>
  );
}
