import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getMeals, reset } from '../features/meals/mealSlice'
import MealForm from '../components/MealForm'
import MealItem from '../components/MealItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { meals, isLoading, isError, message } = useSelector(
    (state) => state.meals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getMeals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Dienos pietų dashboard</p>
      </section>

      <MealForm />

      <section className='content'>
        {meals.length > 0 ? (
          <div className='meals'>
            {meals.map((meal) => (
              <MealItem key={meal._id} meal={meal} />
            ))}
          </div>
        ) : (
          <h3>Jūs neturit jokių sukurtų dienos dietų</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
