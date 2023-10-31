/* Creamos este hook para obtener la url y asi poder generar invitaciones */

import { useEffect, useState } from "react"

export const useOrigin = () => {
  /* Usamos el useState, useEffect y el if para evitar errores de hidratacion */
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  /* Obtenemos la url */
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  return origin
}


