"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"
import { useState } from "react"
import axios from "axios"

const InviteModal = () => {

    const { type, isOpen, onOpen, onClose, data } = useModal()

    const [isCopy, setIsCopy] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    /* Obtenemos el dominio de la url que nos encontramos utilizando el hook que nos creamos anteriormente */
    const origin = useOrigin()

    const isModalOpen = isOpen && type === "invite"
    const {server} = data

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    /* Funcion para copiar la invitacion */
    const onCopy = ()=> {
        navigator.clipboard.writeText(inviteUrl)

        setIsCopy(true)

        setTimeout(()=> {
            setIsCopy(false)
        }, 1000)
    }

    /* Funcion para generar una nueva invitacion */
    const onNewInvitation = async() => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite", { server: response.data })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button 
                            size="icon"
                            disabled={isLoading}
                            onClick={onCopy}
                        >
                            {
                                isCopy
                                ? <Check className="w-4 h-4" />
                                : <Copy className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                    <Button
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                        onClick={onNewInvitation}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal