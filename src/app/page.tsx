'use client'

import { useFormState } from "react-dom";
import login from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formState: initialState = {
  success: false,
  error: false
}

export default function Home() {
  const [state, formAction] = useFormState(login, formState)

  const router = useRouter()

  useEffect(() => {
    if (state.success) {

      setTimeout(() => {
        router.replace('/profile')
      }, 2000)
    }
  }, [state.success])

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1>Login</h1>

      <form action={formAction} className="w-3/5 flex flex-col gap-2 bg-purple-500 p-4 rounded-md">
        <label htmlFor="email" className="text-black">E-mail:</label>
        <input className="p-1 rounded-md text-black" id="email" type="email" name="email" placeholder="email@example.com" required />

        <label htmlFor="password" className="text-black">Senha:</label>
        <input className="p-1 rounded-md text-black" id="passoword" type="password" name="password" required minLength={8} />

        {state.success && (
          <p>Login realizado com sucesso</p>
        )}

        <button type="submit" className="bg-orange-500 rounded-md hover:bg-orange-400">Entrar</button>
      </form>
    </div>
  );
}
