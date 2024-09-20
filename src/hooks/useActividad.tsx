import { useContext } from "react";

import { ActividadContext } from "../context/ActividadContext";

export const useActividad = () => {
  const context = useContext(ActividadContext)
  if (!context) {
    throw new Error("el hook useActividad debe ser utilizado en un ActividadProvider")
  }
  return context
} 
