'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const session = useSession()

    const router = useRouter()

    if (session.status === 'unauthenticated') {
        router.replace('/')
    }

    return (
        <div>
            {JSON.stringify(session)}
        </div>
    );
}