import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [list, setList] = useState('');
  const [resultList, resultSetList] = useState([]);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    resultSetList(doneRecipes);
    if (doneRecipes !== null) {
      if (list === 'food') {
        resultSetList(doneRecipes.filter((recipes) => recipes.type === 'food'));
      }
      if (list === 'drink') {
        resultSetList(doneRecipes.filter((recipes) => recipes.type === 'drink'));
      }
    }
  }, [list]);

  return (
    <div  className='bg-stone-100 h-full'>
      <Header
        title="Done Recipes"
        profileIcon={ profileIcon }
      />
      <div className='flex justify-center mt-3'>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-24 hover:bg-stone-500 hover:duration-500 justify-center pointer text-white'
        onClick={ () => { setList('all'); } }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-24 hover:bg-stone-500 hover:duration-500 justify-center pointer text-white'
        onClick={ () => { setList('food'); } }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-24 hover:bg-stone-500 hover:duration-500 justify-center pointer text-white'
        onClick={ () => { setList('drink'); } }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      </div>
      {copiado && <p className='text-center text-2xl text-red-700'>Link copied!</p>}
      <div className='px-4 flex flex-wrap justify-center pb-24'>
      
      {resultList && resultList.map((elem, index) => (
        <div key={ index } className="card bg-white rounded-lg p-6 flex flex-col justify-center ">
          <Link to={ elem.type === 'food' ? `/foods/${elem.id}` : `/drinks/${elem.id}` }>
            <img
              type="image"
              src={ elem.image }
              alt="food-card"
              width="200"
              data-testid={ `${index}-horizontal-image` }
            />         
          </Link>
   
          <div className='mx-auto'>
          <p data-testid={ `${index}-horizontal-name` } className='font-alice text-2xl text-center text-stone-900 underline'>{elem.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` } className='mt-2 text-center'>
              {elem.alcoholicOrNot}
            </p>
  
          <p data-testid={ `${index}-horizontal-done-date` } className='text-center mt-3'>{elem.doneDate}</p>
          <button
            type="button"
            className='flex bg-stone-400 py-2 m-2 rounded-lg w-96 hover:bg-stone-500 hover:duration-500 justify-center pointer '

            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              copy(`http://localhost:3000${elem.type === 'food' ? `/foods/${elem.id}` : `/drinks/${elem.id}`}`);
              setCopiado(true);
            } }
          >
            <img src={ shareIcon } alt="Share icon"  className="svg-icon"
/>
          </button>
          </div>
         
          
          
          {/* {elem.tags.map((tag, i) => (
            <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>))} */}
        </div>))}
        </div>
        <Footer/>
    </div>
  );
}

export default DoneRecipes;
