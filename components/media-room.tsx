/* Gran parte de este componente lo podemos encontrar en la documentacion oficial
"https://docs.livekit.io/realtime/quickstarts/nextjs-13/" */

"use client"

import '@livekit/components-styles';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { Channel } from "@prisma/client"
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface MediaRoomProps {
    chatId: string,
    audio: boolean,
    video: boolean
}

const MediaRoom = ({ chatId, audio, video }: MediaRoomProps) => {

    const { user } = useUser()
    const [token, setToken] = useState("")

    useEffect(() => {

        if (!user?.firstName || !user?.lastName) return

        function getName() {
            return `${user?.firstName} ${user?.lastName}`;
        }

        const name = getName();

        (async () => {
            try {
                const resp = await fetch(`/api/get-participant-token?room=${chatId}&username=${name}`)
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })()

    }, [chatId, user?.firstName, user?.lastName]);

    if (token === "") {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}

export default MediaRoom
