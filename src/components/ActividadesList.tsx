import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useActividad } from "../hooks/useActividad"

function ActividadesList() {

  const { state, dispatch, nombreCategoria, actividadesComprobacion } = useActividad()
  const { actividad } = state

  return (
    <>

      <h1 className="bg-gradient-to-r from-green-500 via-orange-300 to-yellow-300  text-4xl font-bold text-white text-center">Comida Y Actividades</h1>


      {actividadesComprobacion ? <p className="text-center my-5">No hay actividades aún...</p> :
        actividad.map(actv => (
          <div key={actv.id} className="px-5 py-10 bg-white shadow-xl rounded-xl mt-5 flex justify-between">

            <div className="space-y-4 relative">

              <p className={`absolute -top-8 -left-8 px-10 py-2 text-white rounded-xl uppercase font-bold 
                 ${actv.categoriasel === 1 ? 'bg-lime-700' : 'bg-yellow-500'}
              `}>
                {nombreCategoria(actv.categoriasel)}
              </p>

              <p className="text-2xl font-bold pt-5">{actv.descriptionActividad}</p>
              <p className="font-black text-4xl text-lime-400">{actv.calorias} {""}

                <span>Calorias</span>
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() => dispatch({ type: "set-actividadId", payload: { id: actv.id } })}
              >
                <PencilSquareIcon
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                />
              </button>
              <button
                onClick={() => dispatch({ type: "delete-actividad", payload: { id: actv.id } })}
              >
                <TrashIcon
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ActividadesList  
