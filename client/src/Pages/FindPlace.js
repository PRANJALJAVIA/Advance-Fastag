import React from 'react'
import Card from '../components/Card'
import '../style/FindPlace.scss'


const FindPlace = () => {
  return (
    <div className='find_place__container'>
             <div className='search__container'>

             </div>

             <div className='header'>
                <h1>Find places</h1>
                <p>40 results found</p>
             </div>

             <div className='cards__container'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
             </div>
        </div>
  )
}

export default FindPlace