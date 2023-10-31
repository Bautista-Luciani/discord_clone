import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage = async({ params }: ServerIdPageProps) => {

  /* Obtenemos el usuario */
  const profile = await currentProfile()

  if(!profile){
    return redirectToSignIn()
  }

  /* Por defecto, siempre queremos que el servidor este abierto en el channel 'general' 
  Buscamos el servidor e incluimos el channel el cual tenga el nombre 'general'*/
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  /* Definimos el channel inical en una variable
  Le ponemos la posicion [0] aunque no exista otro channel con ese nombre en un mismo servidor */
  const initialChannel = server?.channels[0]

  /* Esto tecnicamente nunca podria pasar, pero lo ponemos por las dudas */
  if(!initialChannel){
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default ServerIdPage