import ChatHeader from "@/components/chat/chat-header"
import ChatInput from "@/components/chat/chat-input"
import ChatMessages from "@/components/chat/chat-messages"
import MediaRoom from "@/components/media-room"
import { getOrCreateConversation } from "@/lib/conversaion"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface MemberIdPageProps {
  params: {
    serverId: string,
    memberId: string
  },
  searchParams: {
    video?: boolean
  }
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {

  /* Obtenemos el usuario */
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  /* Obtenemos el miembro actual */
  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  })

  if (!currentMember) {
    return redirect('/')
  }

  /* Obtenemos la conversacion con le nueva utilidad que creamos anteriormente */
  const conversation = await getOrCreateConversation(currentMember.id, params.memberId)

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`)
  }

  const { memberOne, memberTwo } = conversation

  /* Obtenemos el otro miembro
  Si el profileId del memberOne coincide con el profile.id que obtuvimos anteriormente significa que nosotros somos el memberOne, entonces el otherMember seria el memberTwo
  Caso contrario significa que somos el memberTwo, entonces el otherMember es el memberOne */
  const otherMember = memberOne.profileId == profile.id ? memberTwo : memberOne

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        name={otherMember.profile.name}
        type="conversation"
        imageUrl={otherMember.profile.imageUrl}
      />

      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          audio={true}
          video={true}
        />
      )}

      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id
            }}
          />

          <ChatInput
            apiUrl="/api/socket/direct-messages"
            name={otherMember.profile.name}
            type="conversation"
            query={{
              conversationId: conversation.id
            }}
          />
        </>
      )}
    </div>
  )
}

export default MemberIdPage