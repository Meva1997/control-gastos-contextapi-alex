import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { useBudget } from "../hooks/useBudget" //useBudget es la manera de mandar a llamar el reducer sin tener que pasar props

export default function BudgetForm() {

  const[budget, setBudget] = useState(0)
  const{ dispatch} = useBudget()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{

    setBudget(+e.target.value)

  }

  const isValid = useMemo(() => { 
    return isNaN(budget) || budget <= 0
  },[budget])

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({type: 'add-budget', payload:{budget}}) //mandamos a llamar la accion
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir Presupuesto
        </label>
        <input type="number" name="budget" id="budget" value={budget} className="w-full bg-white border border-gray-200 p-2" placeholder="Define tu Presupuesto" onChange={handleChange} />
      </div>
      <input type="submit" value='Definir Presupuesto' className="bg-blue-600 hover:to-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40" disabled={isValid} />
    </form>
  )
}
