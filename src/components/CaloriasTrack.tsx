import { useMemo } from "react"
import { Atv } from "../types"
import CaloriasDisplay from "./CaloriasDisplay"

type CaloriasTrackProps = {
  actividad: Atv[]
}

export default function CaloriasTrack({ actividad }: CaloriasTrackProps) {

  const caloriasConsumidas = useMemo(() => actividad.reduce((total, actv) => actv.categoriasel === 1 ? total +
    actv.calorias : total, 0), [actividad])
  const caloriasQuemadas = useMemo(() => actividad.reduce((total, actv) => actv.categoriasel === 2 ? total +
    actv.calorias : total, 0), [actividad])

  const totalCalorias = useMemo(() => caloriasConsumidas - caloriasQuemadas, [actividad])

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


