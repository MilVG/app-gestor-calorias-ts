import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { actividadReducer, initialState } from "./reducers/actividad-Reducer"
import ActividadesList from "./components/ActividadesList"
import CaloriasTrack from "./components/CaloriasTrack"


function App() {

  const url_img = "https://img.freepik.com/foto-gratis/menu-saludable-receta-dieta-alimentaria_53876-122837.jpg?t=st=1722312707~exp=1722316307~hmac=92fdcaf1c6a37b9e169d644374fd9bdaeb83a1f77142eca8f1f456a7b4ba3cb9&w=900"

  const [state, dispatch] = useReducer(actividadReducer, initialState)

  useEffect(() => {
    localStorage.setItem('actividad', JSON.stringify(state.actividad))
  }, [state.actividad])

  const disRestartApp = () => useMemo(() => state.actividad.length, [state.actividad])


  return (
    <>
      <div className="bg-slate-100">
        <header className="bg-green-700 text-center p-5 flex flex-row justify-center space-x-64">
          <h1 className="text-white text-2xl">Contador de Calorias
          </h1>
          <button
            className="bg-gray-600 text-white rounded-lg hover:bg-gray-900 p-2 w-36 disabled:opacity-5"
            disabled={!disRestartApp()}
            onClick={() => dispatch({ type: "reset-app" })}
          >
            Reiniciar
          </button>
        </header>
        <section className="grid grid-cols-2 gap-4">
          <div className="relative bg-purple-300 w-full m-5 rounded-lg flex 
          flex-col justify-center justify-items-center" >
            <div className="absolute bg-gradient-to-r from-green-400 w-full">
              <h1
                className="text-white text-center text-3xl p-4 font-black"
              >AGENDA TUS CALORIAS</h1>
            </div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={url_img}
              alt="Calorias" />
          </div>
          <Form
            dispatch={dispatch}
            state={state}
          />
        </section>

        <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CaloriasTrack
              actividad={state.actividad}
            />
          </div>
        </section>

        <section className=" mx-auto py-5  max-w-4xl rounded-lg">
          <ActividadesList
            actividad={state.actividad}
            dispatch={dispatch}
          />
        </section>
      </div>
    </>
  )
}

export default App
