/* Es fundamental respetar el orden de las carpetas, sino no va a funcionar
Pegamos el componente SingIn que nos brinda la documentacion de clerk */
import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn />;
}