
type CaloriasDisplayProps = {
  calorias: number,
  text: string
}
export default function ({ calorias, text }: CaloriasDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange"> {calorias}</span>
      {text}
    </p>

  )
}

