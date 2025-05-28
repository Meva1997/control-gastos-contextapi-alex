import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { type ChangeEvent } from "react";

export default function FilterByCategory() {

  const {dispatch} = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}});
  }


  return (

    <div className="p-10 bg-white rounded-lg shadow-lg">
      <form>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <label htmlFor="category">  Filtrar Gastos </label>
            <select id="category" className="flex-1 p-3 text-center transition-colors border-2 border-pink-600 rounded bg-slate-100 focus:outline-none focus:border-pink-600" onChange={handleChange}>
              <option value="">-- Todas las Categorias --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
        </div>
      </form>
    </div>
  )
}
