import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { actividadReducer, initialState, ActividadState, ActividadAcciones } from "../reducers/actividad-Reducer";
type ActividadProviderProps = {
  children: ReactNode
}

type ActividadContextProps = {
  state: ActividadState,
  dispatch: Dispatch<ActividadAcciones>
}
export const ActividadContext = createContext<ActividadContextProps>(null!)

export const ActividadProvider = ({ children }: ActividadProviderProps) => {

  const [state, dispatch] = useReducer(actividadReducer, initialState)
  return (
    <ActividadContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ActividadContext.Provider>
  )
}
