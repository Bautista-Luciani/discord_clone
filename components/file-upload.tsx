import { FileIcon, X } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    /* Estas dos opciones son las que tenemos en el archivo 'app/api/uploadthing/core.ts' */
    endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {

    /* Verificamos si hay un value, en caso de que haya significa que el usuario selecciono un archivo
    Extraemos la extencion del archivo
    En caso de que haya un value y que su extencion no sea pdf vamos a mostrar ese value
    Para eso debemos importar X de "lucide-react" y Image de "next/image"
    Si nos lanza un error por ejemplo "utsf.io is not configured under images in your next.config.js"
    lo que debemos hacer es agregar (en este caso utsf.io) dentro del objeto 'images' del archivo next.config.js */
    const fileType = value?.split(".").pop()

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    if(value && fileType === "pdf"){
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a 
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    { value }
                </a>
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    return (
        /* Este componente lo debemos importar de "@/lib/uploadthing"
        Ademas debemos importar los estilos de "@uploadthing/react/styles.css" */
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload