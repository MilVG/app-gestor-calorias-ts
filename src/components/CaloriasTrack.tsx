import CaloriasDisplay from "./CaloriasDisplay"
import { useActividad } from "../hooks/useActividad"



export default function CaloriasTrack() {

  const { caloriasConsumidas, caloriasQuemadas, totalCalorias } = useActividad()


  return (
    <>
      <h2 className="text-4xl font-black text-white text-center"> Resumen de Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriasDisplay
          calorias={caloriasConsumidas}
          text="Consumidas"
        />
        <CaloriasDisplay
          calorias={caloriasQuemadas}
          text="Quemadas"
        />
        <CaloriasDisplay
          calorias={totalCalorias}
          text="Diferencia"
        />

      </div>

    </>
  )
}


