/* Creamos esta pagina para redirigir al usuario cuando usa el codigo de invitacion de algun servidor */

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface InviteCodeProps {
    params: {
        inviteCode: string
    }
}

const InviteCodePage = async({ params }: InviteCodeProps) => {

    /* Obtenemos el usuario */
    const profile = await currentProfile()

    if(!profile){
        return redirectToSignIn()
    }

    if(!params.inviteCode){
        return redirect("/")
    }

    /* Verificamos si el usuario ya es parte del servidor, y en caso de que lo sea lo llevamos a ese servidor  */
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(existingServer){
        return redirect(`/servers/${existingServer.id}`)
    }

    /* En caso de que no pertenezca, lo agregamos y lo redirigimos al servidor */
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    } 

    return null
}

export default InviteCodePage
