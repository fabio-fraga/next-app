'use server'

import { z } from 'zod'

export default async function signIn(prevState: InitialState, formData: FormData) {
    const state = {
        success: false,
        errors: {}
    }
    
    const user = {
        email: 'popeyemelancia@email.com',
        password: '12345678'
    }

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
        state.errors = validatedFields.error.flatten().fieldErrors

        return state
    }

    if (data.email != user.email || data.password != user.password) {
        state.errors = {
            general: 'Revise suas credenciais de acesso.'
        }

        return state
    }

    state.success = true
    return state
}