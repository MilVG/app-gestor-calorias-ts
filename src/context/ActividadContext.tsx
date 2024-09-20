import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";

import { actividadReducer, initialState, ActividadState, ActividadAcciones } from "../reducers/actividad-Reducer";
type ActividadProviderProps = {
  children: ReactNode
}

type ActividadContextProps = {
  state: ActividadState,
  dispatch: Dispatch<ActividadAcciones>,
  caloriasConsumidas: number,
  caloriasQuemadas: number,
  totalCalorias: number
}
export const ActividadContext = createContext<ActividadContextProps>(null!)

export const ActividadProvider = ({ children }: ActividadProviderProps) => {

  const [state, dispatch] = useReducer(actividadReducer, initialState)

  const caloriasConsumidas = useMemo(() => state.actividad.reduce((total, actv) => actv.categoriasel === 1 ? total +
    actv.calorias : total, 0), [state.actividad])
  const caloriasQuemadas = useMemo(() => state.actividad.reduce((total, actv) => actv.categoriasel === 2 ? total +
    actv.calorias : total, 0), [state.actividad])

  const totalCalorias = useMemo(() => caloriasConsumidas - caloriasQuemadas, [state.actividad])

  return (
    <ActividadContext.Provider
      value={{
        state,
        dispatch,
        caloriasConsumidas,
        caloriasQuemadas,
        totalCalorias
      }}
    >
      {children}
    </ActividadContext.Provider>
  )
}
