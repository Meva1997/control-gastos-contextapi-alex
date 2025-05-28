import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {


  const{state} = useBudget()

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
  
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses] ) 

  return (

    <>
      <div className="p-5 mt-10 bg-white rounded-lg shadow-lg">
        {isEmpty ? <p className="text-2xl font-bold text-center text-gray-400">No hay Gastos...</p> : (
          <>
            <p className="my-5 text-2xl font-bold text-gray-600">Listado de gastos</p>
            {filteredExpenses.map(expense => (
              <ExpenseDetail 
                key={expense.id}
                expense={expense}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
   