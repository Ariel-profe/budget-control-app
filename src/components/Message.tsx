import { FC } from "react"

interface Props {
    children: string;
    type: string;
}

export const Message:FC<Props> = ({children, type}) => {
  return (
    <div className={`alerta ${type}`}>
        {children}
    </div>
  )
}
