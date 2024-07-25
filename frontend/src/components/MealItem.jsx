import { useDispatch } from 'react-redux'
import { deleteMeal } from '../features/meals/mealSlice'

function MealItem({ meal }) {
  const dispatch = useDispatch()

  return (
    <div className='meal'>
      <div>{new Date(meal.createdAt).toLocaleString('en-US')}</div>
      <h2>{meal.text}</h2>
      <button onClick={() => dispatch(deleteMeal(meal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default MealItem
