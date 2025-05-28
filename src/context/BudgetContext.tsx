import { useReducer, createContext, useMemo, type Dispatch, type ReactNode } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer" //importamos budgetReducer que es el que hace la accion e importamos el estado inicial

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
}

//se agrega un type a children para evitar errores
type BudgetProviderProps = {
  children: ReactNode
}

//agregamos null para evitar errores, tambien se puede usar {} as BudgetContextProps
export const BudgetContext = createContext<BudgetContextProps>(null!)

//Provider es de donde vienen y lo que contiene los datos y es la union del BudgetContext con BudgetProvider
export const BudgetProvider = ({children} : BudgetProviderProps) => {

  //aqui con el reducer es lo que nos da acceso a budget-reducer
  const [state, dispatch] = useReducer(budgetReducer, initialState) //agregamos el reducer con sus propiedades

  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
  const remainingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);

  return ( //aqui se conecta el context y el reducer
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )

}