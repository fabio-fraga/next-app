import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
}

export default function Button(props: ButtonProps) {
    return <button className="bg-red-500">{props.children}</button>
}
