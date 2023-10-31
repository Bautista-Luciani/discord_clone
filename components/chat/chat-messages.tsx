"use client"

import { ElementRef, Fragment, useRef } from "react"
import { format } from "date-fns"
import { Loader2, ServerCrash } from "lucide-react"
import { Member, Message, Profile } from "@prisma/client"

import { useChatQuery } from "@/hooks/use-chat-query"

import ChatWelcome from "./chat-welcome"
import ChatItem from "./chat-item"
import { useChatSocket } from "@/hooks/use-chat-socket"
import { useChatScroll } from "@/hooks/use-chat-scroll"

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string,
    member: Member,
    chatId: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>,
    paramKey: "channelId" | "conversationId",
    paramValue: string,
    type: "channel" | "conversation"
}

/* Definimos el formato del dia, es importante definirlo de la siguiente manera */
const DATE_FORMAT = "d MMM yyyy, HH:mm"

const ChatMessages = ({ name, member, chatId, apiUrl, socketQuery, socketUrl, paramValue, paramKey, type }: ChatMessagesProps) => {

    const chatRef = useRef<ElementRef<"div">>(null)
    const bottomRef = useRef<ElementRef<"div">>(null)

    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`

    /* Usamos el hook que creamos anteriormente */
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue })

    /* Usamos el hook que creamos anteriormente para cargar los mensajes en tiempo real */
    useChatSocket({ queryKey, addKey, updateKey })

    /* Usamos el hook que creamos anteriormente para cargar mas mensajes al hacer scroll */
    useChatScroll({chatRef, bottomRef, shouldLoadMore: !isFetchingNextPage && !!hasNextPage, loadMore: fetchNextPage, count: data?.pages?.[0]?.items?.length ?? 0})

    if (status === "loading") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dar:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dar:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (
                <ChatWelcome
                    type={type}
                    name={name}
                />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ) : (
                        <button 
                            onClick={()=> fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            {/* Usamos data del useQueryMessage para obtener los mensajes */}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <div key={message.id}>
                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    content={message.content}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    currentMember={member}
                                    member={message.member}
                                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                    isUpdated={message.updatedAt !== message.createdAt}
                                    socketQuery={socketQuery}
                                    socketUrl={socketUrl}
                                />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef}/>
        </div>
    )
}

export default ChatMessages