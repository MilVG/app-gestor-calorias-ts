import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { categorias } from "../data"
import { Atv } from "../types"
import { useActividad } from "../hooks/useActividad"


export default function Form() {

  const { state, dispatch } = useActividad()
  const initialState: Atv = {
    id: uuidv4(),
    categoriasel: 1,
    descriptionActividad: "",
    calorias: 0
  }
  const [actividad, setActividad] = useState<Atv>(initialState)


  useEffect(() => {
    if (state.activeId) {
      const selectedActividad = state.actividad.filter(stateActividadreducer => stateActividadreducer.id === state.activeId)[0]

      setActividad(selectedActividad);
    }

  }, [state.activeId])


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

    const verificarType = ['categoriasel', 'calorias'].includes(e.target.id)
    setActividad({
      ...actividad,
      [e.target.id]: verificarType ? +e.target.value : e.target.value
    })
  }

  //Evento para un input del tipo button
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log("guardando");

    dispatch({ type: "guardar-actividad", payload: { newActividad: actividad } })

    setActividad(
      {
        ...initialState,
        id: uuidv4(),
      }
    )
  }

  //bottones de prueba
  const handleClick2 = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log("test event 2");

  }

  const handleClick3 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("test event 3");

  }
  const validacionCampos = () => {
    const { descriptionActividad, calorias } = actividad

    return descriptionActividad.trim() !== '' && calorias > 0
  }


  return (
    <form className="grid grid-cols-1 mx-4 my-6 bg-white p-10 rounded-lg shadow-xl">


      {/* grupo de Seleccion de Listado de Elementos */}
      <label className="text-xl" htmlFor="categoriasel" >Categoría:</label>
      <select
        className="border border-slate-300 p-3 rounded-lg w-full bg-white"
        id="categoriasel"
        value={actividad.categoriasel}
        onChange={handleChange}
      >

        {
          categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))
        }
      </select>

      {/* Group 1 de entrada de datos */}
      <label className="text-xl mt-5 " htmlFor="descriptionActividad">Actividad:</label>
      <input
        type="text"
        className="w-full rounded-lg border border-slate-300 p-2"
        placeholder="Ejem: comida,juego de Naranj,Ensalada,Ejercicio,Pesas,Bicicleta"
        id="descriptionActividad"
        value={actividad.descriptionActividad}
        onChange={handleChange}
      />


      {/* Group 2 de entrada de datos */}
      <label className="text-xl mt-5 " htmlFor="calorias">Calorias:</label>
      <input
        type="number"
        id="calorias"
        className="w-full rounded-lg border border-slate-300 p-2"
        placeholder="Ejem: 300 o 500"
        value={actividad.calorias}
        onChange={handleChange}

      />

      <input
        className={`mt-5 w-full bg-green-400 rounded-lg p-3 text-xl 
                hover:bg-green-600 disabled:bg-slate-300 disabled:text-slate-200 ${validacionCampos() ? 'cursor-pointer' : ''} `}
        type="button"
        value={actividad.categoriasel == 1 ? 'GUARDAR COMIDA' : 'GUARDAR EJERCICIO'}
        onClick={handleClick}
        disabled={!validacionCampos()}
      />

      <input type="submit" onClick={handleClick2} />

      <button onClick={handleClick3}>
        test event3
      </button>
    </form>

  )
}
