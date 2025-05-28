import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget";
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailprops = {
  expense: Expense
}


export default function ExpenseDetail({expense} : ExpenseDetailprops) {

  const{dispatch} = useBudget()


  const categoryinfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0] ,[expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload:{id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id}})}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (

    <>
      <SwipeableList>

        <SwipeableListItem
          maxSwipe={1}
          leadingActions={leadingActions()} //arrastrar el elemento de izquierda a derecha
          trailingActions={trailingActions()} //arrastrar el elemento de derecha a izquierda
        >

          <div className="flex items-center w-full gap-5 p-5 bg-white border-b border-gray-200 shadow-lg">

            <div>
              <img src={`${import.meta.env.BASE_URL}icono_${categoryinfo.icon}.svg`} alt="icono gasto" className="w-20"/>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-sm font-bold uppercase text-slate-500">{categoryinfo.name}</p>
              
              <p>{expense.expenseName}</p>
              <p className="text-sm text-slate-600">{formatDate(expense.date!.toString())}</p> 
            </div>

            <AmountDisplay 
              amount={expense.amount}
            />
    
          </div>

        </SwipeableListItem>

      </SwipeableList>
    </>
  )
}
