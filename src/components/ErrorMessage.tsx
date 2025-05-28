import type { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) { //en lugar de hacer los props puedo usar e importar PropsWitchChildren y se elimina el props que se creo
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">{children}</p>
  )
}
