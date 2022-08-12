import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';
import Footer from '../components/Footer';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [msgCopied, setMsgCopied] = useState(false);

  const getFavoriteRecipes = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    setFavoriteRecipes(JSON.parse(favoriteRecipesStorage));
  };

  const removeFavoriteRecipesLocalStorage = (recipe) => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const removeFav = favoritesObj.filter((i) => i.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavoriteRecipes(removeFav);
  };

  const filterFavoritesDrinks = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const favDrik = favoritesObj.filter((i) => i.image.includes('drink'));

    setFavoriteRecipes(favDrik);
    console.log('drinks');
  };

  const filterFavoritesFoods = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    const favFood = favoritesObj.filter((i) => i.image.includes('meals'));
    setFavoriteRecipes(favFood);
  };

  const filterAll = () => {
    const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteRecipesStorage);
    setFavoriteRecipes(favoritesObj);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div className='bg-stone-100 h-fit'>
      <Header
        title="Favorite Recipes"
        profileIcon={ profileIcon }

      />
      <div className='flex justify-center bg-stone-100 p-4'>
        <button
          type="button"
          className='bg-stone-400 p-2 m-2 rounded-lg w-24 hover:bg-stone-500 hover:duration-500 text-white'
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          type="button"
          className='bg-stone-400 p-2 m-2 rounded-lg w-24 hover:bg-stone-500  hover:duration-500 text-white'
          data-testid="filter-by-food-btn"
          onClick={ filterFavoritesFoods }
        >

          Food
        </button>
        <button
          type="button"
          className='bg-stone-400 p-2 m-2 rounded-lg w-24 hover:bg-stone-500 hover:duration-500 text-white' 
          data-testid="filter-by-drink-btn"
          onClick={ filterFavoritesDrinks }
        >
          Drinks
        </button>
      </div>
      {msgCopied && <p className='text-center text-2xl text-red-700'>Link copied!</p>}
  
      <div className='flex flex-wrap justify-center bg-stone-100 px-4 mb-16'>
        {favoriteRecipes && favoriteRecipes.map((item, index) => (
          <div key={ item.id } className="card bg-white rounded-lg p-4 ptext-center flex justify-center">
            <div className='flex flex-wrap sm:flex-col justify-center items-center mx-auto'>
              <div>
            <Link
                to={ `/${item.image.includes('meals')
                  ? 'foods' : 'drinks'}/${item.id}` }
              >
                <p data-testid={ `${index}-horizontal-name` } className='font-alice text-2xl text-center text-stone-900 underline'>{item.name}</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` } className='text-lg mx-4 w-40'>
                {item.alcoholicOrNot === 'ᗒ Alcoholic'
                  ? item.alcoholicOrNot
                  : ` ᗒ ${item.nationality} - ${item.category}`}
              </p>
              </div>
             <div className='flex flex-wrap justify-center md:block mb-2'>
              <button
                type="button"
                className='flex bg-stone-400 py-2 m-2 rounded-lg w-96 hover:bg-stone-500 hover:duration-500 justify-center pointer '
                onClick={ () => {
                  copy(`http://localhost:3000/${item.image.includes('meals')
                    ? 'foods' : 'drinks'}/${item.id}`);
                  setMsgCopied(true);
                } }
              >
                <img
                  className="svg-icon mx-auto"
                  alt="share-icon"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                

              </button>
              <button
                type="button"
                className='flex bg-stone-400 py-2 m-2 rounded-lg w-96 hover:bg-stone-500 hover:duration-500 justify-center pointer'

                onClick={ () => {
                  removeFavoriteRecipesLocalStorage(item);
                } }
              >
                <img
                  src={ blackHeartIcon }
                  alt="black icon"
                  className="svg-icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />

              </button>
              </div>
            </div>
           
            <div className=''>
              <Link
                to={ `/${item.image.includes('meals')
                  ? 'foods' : 'drinks'}/${item.id}` }
              >
                <div className='px sm:px-0'>
                <img
                className='rounded-lg hover:scale-105 hover:duration-500'
                  src={ item.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ item.name }
                />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default FavoriteRecipes;
