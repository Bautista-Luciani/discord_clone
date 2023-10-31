import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { memberId: string } }) {
    try {

        /* Obtenemos el usuario actual */
        const profile = await currentProfile()
        /* Utilizamos el searchParams para extraer el serverId el cual lo mandamos al llamar a este endpoint */
        const { searchParams } = new URL(req.url)
        /* Extraemos el rol que tambien lo mandamos al llamar a este endpoint */
        const { role } = await req.json()

        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }

        if (!params.memberId) {
            return new NextResponse("MemberId missing", { status: 400 })
        }

        /* Obtenemos el servidor... */
        const server = await db.server.update({
            /* ...el cual coincida con el id, y verificamos de que el perfil sea el del administrador... */
            where: {
                id: serverId,
                profileId: profile.id
            },
            /* ... y modificamos el rol del miembro ... */
            data: {
                members: {
                    update: {
                        /* ...el cual coincida con el memberId, 
                        y verifica que el id no sea el del adminitrador, ya que el administrador no puede cambiar su rol, es decir dejar de ser administrador...  */
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            /* ...y que incluya los perfiles ya que vamos a necesitar su informacion, por ejemplo el mail */
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('[MEMBERID_PATCH_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
    try {
        /* Obtenemos el usuario actual */
        const profile = await currentProfile()
        /* Utilizamos el searchParams para extraer el serverId el cual lo mandamos al llamar a este endpoint */
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!serverId) {
            return new NextResponse("ServerId missing", { status: 400 })
        }

        if (!params.memberId) {
            return new NextResponse("MemberId missing", { status: 400 })
        }

        /* Obtenemos el servidor... */
        const server = await db.server.update({
            /* ...el cual coincida con el id, y verificamos de que el perfil sea el del administrador... */
            where: {
                id: serverId,
                profileId: profile.id
            },
            /* ... y eliminamos el miembro del servidor ... */
            data: {
                members: {
                    /* ...el cual coincida con el memberId, 
                    y verifica que el id no sea el del adminitrador, ya que el administrador no puede ser eliminado del servidor
                    Esto ultimo ya esta verificado en el front, pero es importante tambien verificarlo en el back ...  */
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            /* ...y que incluya los otros miembros ya que vamos a necesitar su informacion, por ejemplo el mail */
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('[MEMBERID_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}
