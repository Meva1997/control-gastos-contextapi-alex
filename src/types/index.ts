
export type Category = {
  id: string,
  name: string,
  icon: string
}

export type Expense = {
  id: string,
  expenseName: string,
  amount: number,
  category: string,
  date: Value
}

//type temporal cuando se crea un gasto y omitimos el id
export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];