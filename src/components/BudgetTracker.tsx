import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'; // Import styles for CircularProgressbar

export default function BudgetTracker() {

  const { state, dispatch, totalExpenses, remainingBudget } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2); // Calculate percentage of budget spent
  const colorPercentage = () => {
    if (percentage < 70) return '#3b82f6'; // Blue for less than 70%
    if (percentage < 90) return '#f97316'; // Orange for less than 90%
    return '#DC2626'; // Red for 75% or more
  } // Function to determine color based on percentage spent


  return (

    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar 
            value={percentage} // Remaining budget
            text={`${percentage}% Gastado`} // Text inside the circle
            maxValue={state.budget} // Maximum value for the progress bar
            styles={buildStyles({
              pathColor: colorPercentage(), // Color of the progress bar
              textColor: '#3b82f6', // Color of the text inside the circle
              trailColor: '#e5e7eb', // Color of the background circle
              textSize: '.5rem', // Size of the text inside the circle
              pathTransitionDuration: 0.8, // Transition duration for the progress bar
              strokeLinecap: 'round', // Rounded ends for the progress bar
            })}
          />
        </div>
        
        <div className="flex flex-col justify-center items-center gap-8">
          <button type="button" className="bg-pink-600 text-white w-full p-2 uppercase font-bold rounded-lg cursor-pointer" onClick={() => dispatch({type: 'reset-app'})}> Resetear App </button>

          <AmountDisplay 
            label='Presupuesto'
            amount= {state.budget}
          />
          <AmountDisplay 
            label='Disponible'
            amount= {remainingBudget}
          />
          <AmountDisplay 
            label='Gastado'
            amount= {totalExpenses}
          />
        </div>
      </div>
    </>

  )
}
