/* Hook para cargar mas mensajes al hacer scroll */

import { useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>
    bottomRef: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean
    loadMore: () => void
    count: number
}

export const useChatScroll = ({ chatRef, bottomRef, shouldLoadMore, loadMore, count }: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false)

    useEffect(() => {

        /* Obtenemos el top del chat */
        const topDiv = chatRef?.current

        /* Creamos una funcion para cargar mas mensajes en caso de llegar el top del chat y que haya mas mensajes para cargar */
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        }

        /* Agregamos el eventListener al top del chat y despues lo quitamos */
        topDiv?.addEventListener("scroll", handleScroll)

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll)
        }

    }, [chatRef, loadMore, shouldLoadMore])

    useEffect(() => {

        /* Obtenemos el bottom del chat */
        const bottomDiv = bottomRef?.current

        /* Obtenemos el top del chat */
        const topDiv = chatRef?.current

        /* Creamos una funcion para en caso de estar cargando mensajes anteriores no haga scroll,
        pero en caso de que haya llegado un nuevo mensaje haga scroll automatico al inicio del chat */
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true)
                return true
            }

            if (!topDiv) {
                return false
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceFromBottom <= 100
        }

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth"
                })
            }, 100)
        }
    }, [bottomRef, chatRef, count, hasInitialized])
}
