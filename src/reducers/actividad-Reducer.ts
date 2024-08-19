import { Atv } from "../types"

export type ActividadAcciones =
  { type: 'guardar-actividad', payload: { newActividad: Atv } } |
  { type: 'set-actividadId', payload: { id: Atv['id'] } } |
  { type: 'delete-actividad', payload: { id: Atv['id'] } } |
  { type: 'reset-app' }


export type ActividadState = {
  actividad: Atv[],
  activeId: Atv['id']
}

const localStorageActividades = (): Atv[] => {
  const actividad = localStorage.getItem('actividad')
  return actividad ? JSON.parse(actividad) : []
}

export const initialState: ActividadState = {
  actividad: localStorageActividades(),
  activeId: ''
}

export const actividadReducer = (
  state: ActividadState = initialState,
  action: ActividadAcciones) => {
  switch (action.type) {
    case 'guardar-actividad':

      let updateActividad: Atv[] = []

      if (state.activeId) {
        updateActividad = state.actividad.map(
          actividad =>
            actividad.id === state.activeId
              ? action.payload.newActividad : actividad
        )
      } else {
        updateActividad = [...state.actividad, action.payload.newActividad]
      }

      return {

        ...state,
        actividad: updateActividad,
        activeId: ''
        //actividad: [...state.actividad, payload.newActividad]
      };
    case 'set-actividadId':
      return {
        ...state,
        activeId: action.payload.id
      };
    case "delete-actividad":
      return {
        ...state,
        actividad: state.actividad.filter(actividadstate => actividadstate.id !== action.payload.id)
      }
    case "reset-app":
      return {
        actividad: [],
        activeId: ''
      }
    default:
      return state
  }
}

/*


export const actividadReducertest = (state: ActividadState = initialState, action: ActividadAcciones) => {

  if (action.type === 'guardar-actividad') {
    console.log('testaction');

  }

  return state
}

*/
