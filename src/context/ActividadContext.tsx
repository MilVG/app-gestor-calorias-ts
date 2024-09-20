import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";

import { actividadReducer, initialState, ActividadState, ActividadAcciones } from "../reducers/actividad-Reducer";
import { categorias } from "../data";
import { Atv } from "../types";
type ActividadProviderProps = {
  children: ReactNode
}

type ActividadContextProps = {
  state: ActividadState,
  dispatch: Dispatch<ActividadAcciones>,
  caloriasConsumidas: number,
  caloriasQuemadas: number,
  totalCalorias: number,
  nombreCategoria: (categoria: Atv["categoriasel"]) => string[],
  actividadesComprobacion: boolean

}
export const ActividadContext = createContext<ActividadContextProps>(null!)

export const ActividadProvider = ({ children }: ActividadProviderProps) => {

  const [state, dispatch] = useReducer(actividadReducer, initialState)

  //utilización de variables en actividadTracker
  const caloriasConsumidas = useMemo(() => state.actividad.reduce((total, actv) => actv.categoriasel === 1 ? total +
    actv.calorias : total, 0), [state.actividad])
  const caloriasQuemadas = useMemo(() => state.actividad.reduce((total, actv) => actv.categoriasel === 2 ? total +
    actv.calorias : total, 0), [state.actividad])

  const totalCalorias = useMemo(() => caloriasConsumidas - caloriasQuemadas, [state.actividad])

  //utilización de funciones en ActividadesList
  const nombreCategoria = useMemo(() => (categoria: Atv['categoriasel']) => categorias.map(cat => cat.id === categoria ? cat.name : ''), [state.actividad])
  const actividadesComprobacion = useMemo(() => state.actividad.length === 0, [state.actividad])


  return (
    <ActividadContext.Provider
      value={{
        state,
        dispatch,
        caloriasConsumidas,
        caloriasQuemadas,
        totalCalorias,
        nombreCategoria,
        actividadesComprobacion
      }}
    >
      {children}
    </ActividadContext.Provider>
  )
}
