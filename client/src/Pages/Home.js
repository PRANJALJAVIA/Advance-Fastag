import React from 'react'
import '../style/Home.scss'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home__container'>
      <div className='maps__container'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLS5p19OluIyGuYOTJAmkED0LNupcLV09GA&usqp=CAU' />
      </div>

      <div className='information__container'>
        <div className='dynamic_header'>
          <h1>Find <span>Place</span></h1>
        </div>

        <div className='buttons'>
          <button onClick={() => navigate('/add-place')}>Add place</button>
          <button onClick={() => navigate('/find-place')}>Find place</button>
        </div>
      </div>
    </div>
  )
}

export default Home