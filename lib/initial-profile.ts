import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

export const initialProfile = async() => {

    // Obtenemos el usuario
    const user = await currentUser()

    // En caso de que no exista lo redirijimos
    if(!user){
        return redirectToSignIn()
    }

    // Obtenemos el perfil del usuario
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    // Si existe el perfil lo retornamos
    if(profile){
        return profile
    }

    // Si no existe creamos un nuevo perfil y lo retornamos
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    return newProfile
}