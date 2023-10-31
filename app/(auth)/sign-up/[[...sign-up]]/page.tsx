/* Es fundamental respetar el orden de las carpetas, sino no va a funcionar
Pegamos el componente SignUp que nos brinda la documentacion de clerk */
import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp />;
}