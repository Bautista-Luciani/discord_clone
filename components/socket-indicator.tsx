"use client"

import { useSocket } from "./providers/socket-provider"
import { Badge } from "./ui/badge"

/* Usamos este componente para mostrar un icono:
- en amarillo en caso de que el chat no este conectado
- en verde en caso de que ek chat este conectado en tiempo real */

export const SocketIndicator = () => {
    const { isConnected } = useSocket()

    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="bg-yellow-600 text-white border-none"
            >
                Fallback: Polling every 1s
            </Badge>
        )
    }

    return (
        <Badge
            variant="outline"
            className="bg-emerald-600 text-white border-none"
        >
            Live: Real-time updates
        </Badge>
    )
}
