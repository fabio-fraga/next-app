'use server'

export default async function login(prevState: initialState, formData: FormData) {
    console.log(Object.fromEntries(formData))

    return {
        success: true,
        error: false
    }
}