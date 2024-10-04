'use client'

import { FormEvent, useEffect, useState } from "react";
import { signIn as nextAuthSignIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { z } from 'zod'

export default function SignIn() {
    // const [state, formAction] = useFormState(signIn, initialState)

    const [errors, setErrors] = useState({})

    const session = useSession()
    
    const router = useRouter()

    if (session.status === 'authenticated') {
        router.replace('/profile')
    }

    async function formAction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)

        const schema = z.object({
            email: z.string().email('E-mail inválido.'),
            password: z.string().min(8, 'A senha deve conter ao menos 8 caracteres.')
        })

        type SignIn = z.infer<typeof schema>

        const data: SignIn = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        const validatedFields = schema.safeParse(data)

        if (!validatedFields.success) {
            setErrors(validatedFields.error.flatten().fieldErrors)

            return
        }
        
        const login = await nextAuthSignIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })

        if (!login?.ok) {
            setErrors({
                general: 'Revise suas credenciais de acesso.'
            })

            return
        }

        router.replace('/profile')
    }

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <h1>Login</h1>
    
          <form onSubmit={formAction} className="w-3/5 flex flex-col gap-2 bg-purple-500 p-4 rounded-md">
            <label htmlFor="email" className="text-black">E-mail:</label>
            <input className="p-1 rounded-md text-black" id="email" type="text" name="email" placeholder="email@example.com" required />
    
            <label htmlFor="password" className="text-black">Senha:</label>
            <input className="p-1 rounded-md text-black" id="passoword" type="password" name="password" required />

            {Object.keys(errors).length > 0 && (
                <div>
                    {Object.entries(errors).map((item) => (
                        <div>
                            {item[0]}: {item[1]}
                        </div>
                    ))}
                </div>
            )}
    
            <button type="submit" className="bg-orange-500 rounded-md hover:bg-orange-400">Entrar</button>
          </form>
        </div>
    )
}
