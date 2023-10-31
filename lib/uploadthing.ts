/* Todo este codigo nos lo brinda la siguiente documentacion [https://docs.uploadthing.com/nextjs/appdir]*/

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();