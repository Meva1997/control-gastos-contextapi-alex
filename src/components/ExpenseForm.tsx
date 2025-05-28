import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {


  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const[error, setError] = useState('')
  const[previousAmount, setPreviousAmount] = useState(0) //para guardar el gasto anterior y no exceder el presupuesto

  const{dispatch, state, remainingBudget,} = useBudget()

  useEffect(() => {
    if(state.editingId){
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  },[state.editingId, state.expenses])

  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense, 
      date: value
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

    const {name, value} = e.target
    //si estamos en input amount regresa true y asi identificamos en que input se encuentra el usuario
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name] : isAmountField ? +value : value //si el nombre es de amount lo convierte a numero y si no lo pasa como string

    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    //validar 
    if(Object.values(expense).includes('')){
      setError('Todos los campos son obligatorios')
      return
    }

    //validar no exceder el presupuesto 
    if((expense.amount - previousAmount) > remainingBudget){ //resta el gasto anterior al nuevo para que no se exceda el presupuesto
      setError('El gasto no puede ser mayor al presupuesto')
      return
    }

    //agregar o actualizar el gasto 
    if(state.editingId){
      dispatch({type: 'update-expense', payload:{expense:{id: state.editingId, ...expense}}})

    } else {
      dispatch({type: 'add-expense', payload:{expense}})
    }

    setPreviousAmount(0) //resetea el gasto anterior para que no se vuelva a comparar
  }

  return (

    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
          <input type="text" id="expenseName" placeholder="Añade el nombre del Gastro" className="bg-slate-100 p-2 rounded-lg" name="expenseName" value={expense.expenseName} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">Cantidad:</label>
          <input type="number" id="amount" placeholder="Añade la cantidad del gasto: ej. 300" className="bg-slate-100 p-2 rounded-lg" name="amount" value={expense.amount} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xl">Categoria:</label>
          <select id="category" className="bg-slate-100 p-2 rounded-lg" name="category" value={expense.category} onChange={handleChange}>
            <option value="">-- Seleccione --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">Fecha de Gasto:</label>
          <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
        </div>

        <input type="submit" value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'} className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
      </form>
    </>
  )
}
