import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import NavigationAction from "./navigation-action"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import NavigationItem from "./navigation-item"
import { ModeToggle } from "../mode-toggle"
import { UserButton } from "@clerk/nextjs"

const NavigationSidebar = async () => {

    /* Obtenemos el perfil */
    const profile = await currentProfile()

    if (!profile) {
        return redirect("/")
    }

    /* Obtenemos todos los servidores de ese perfil */
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
            <NavigationAction/>
            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                { servers.map( server => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                {/* Este ModeToggle lo habiamos creado anteriormente para poder cambiar el theme */}
                <ModeToggle/>
                {/* El user boton es un componente de clerk el cual nos permite desloguearnos */}
                <UserButton
                    /* No nos podemos olvidar de agregar el afterSignOutUrl="/" */
                    afterSignOutUrl="/"
                    /* Este atributo es para hacer el boton un poco mas grande, sino quedaba mas chico que el resto */
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default NavigationSidebar