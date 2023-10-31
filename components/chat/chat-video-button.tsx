/* Componente para las videollamadas en conversaciones entre dos miembros */

"use client"

import qs from "query-string"
import { Video, VideoOff } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { ActionTooltip } from "../action-tooltip"

const ChatVideoButton = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const isVideo = searchParams?.get("video")

    const onClick = ()=> {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true })

        router.push(url)
    }

    const Icon = isVideo ? VideoOff : Video
    const tooltipLabel = isVideo ? "End video call" : "Start video call"

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
        <button onClick={onClick} className="hover:opacity-75 transition mr-4">
            <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
        </button>
    </ActionTooltip>
  )
}

export default ChatVideoButton