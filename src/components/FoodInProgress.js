import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/context';
import Footer from './Footer';

const copy = require('clipboard-copy');

function FoodInProgress() {
  const {
    dataInProgress,
    ingredients,
    setIngredients,
    measures,
  } = useContext(recipesContext);
  const [linkCopy, setLinkCopy] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const handleChange = (e) => {
    
    const { name, checked } = e.target;
    const tempIngredients = ingredients.map(
      (ingredient) => (ingredient.ingredient === name
        ? { ...ingredient, isChecked: checked, done: checked } : ingredient),
    );
    setIngredients(tempIngredients);
    const doneIngredients = [];
    tempIngredients.map(
      (ingredient) => (
        ingredient.done === true ? doneIngredients.push(ingredient.ingredient) : null
      ),
    );
    if (doneIngredients.length === tempIngredients.length) {
       setIsDisabled(false);
    } else {
       setIsDisabled(true);
    }
  };

  const saveRecipeDoneInLocalStorage = () => {
    const localStorageAtual = localStorage.getItem('doneRecipes');
    const localObject = JSON.parse(localStorageAtual)
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0");
    let ano = data.getFullYear();
    const dataAtual = dia + "/" + mes + "/" + ano;
    if(localObject == null){
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: dataInProgress.idMeal,
        type: 'food',
        category: dataInProgress.strCategory,
        alcoholicOrNot: 'Not alcohol',
        name:dataInProgress.strMeal,
        image:dataInProgress.strMealThumb,
        doneDate: dataAtual,
        tags:dataInProgress.strTags,
      } ]))  
    }
    if(localObject !== null){
      const localStorageAtt = [...localObject, {
      id: dataInProgress.idMeal,
      type: 'food',
      category: dataInProgress.strCategory,
      alcoholicOrNot: 'Not alcohol',
      name:dataInProgress.strMeal,
      image:dataInProgress.strMealThumb,
      doneDate: dataAtual,
      tags:dataInProgress.strTags,
      } ]
      // console.log(dataInProgress.idMeal)
      localStorage.setItem('doneRecipes', JSON.stringify(localStorageAtt))  

    }
  }

  // localStorage.setItem('doneRecipes', JSON.stringify([{ id: '15997',
  // type: 'drink',
  // category: 'drink',
  // alcoholicOrNot: 'Optional alcohol',
  // name: 'GG',
  // image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  // doneDate: 'quando-a-receita-foi-concluida',
  // tags: ['tag'] }, { id: '53060',
  // type: 'food',
  // nationality: 'Croatian',
  // category: 'Side',
  // alcoholicOrNot: 'Non alcoholic',
  // name: 'Burek',
  // image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  // doneDate: 'quando-a-receita-foi-concluida',
  // tags: ['tag'] }]));

  return (
    <div className='bg-stone-100 h-screen'>
      <h1 data-testid="recipe-title" className='bg-stone-500 p-4 text-white font-alice text-3xl text-center'>{dataInProgress.strMeal} </h1>
      <div className='flex md:flex-row flex-col items-center md:items-start p-6 justify-center'>
      <img
      className='h-52 rounded-lg'
        width={ 200 }
        src={ dataInProgress.strMealThumb }
        alt={ dataInProgress.strMeal }
        data-testid="recipe-photo"
        a
      />
      
      
      {linkCopy && <p>Link copied!</p>}
      <div className='px-8'>
      <p data-testid="recipe-category" className='font-alice text-xl mb-3'>ᐅ {dataInProgress.strCategory}</p>
      <h4 className='text-stone-700 font-light text-xl mb-3'>Ingredients</h4>
      <div className='flex'>
      <div className='mb-3 mr-5'>
      {ingredients && ingredients.map((ingredient, index) => (
        
        <div key={ index } >
          <label
            htmlFor={ ingredient.ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ {
              textDecoration: ingredient.done ? 'line-through' : 'none',
            } }
          >
            <input
              type="checkbox"
              className='mr-2 text-lg'
              id={ ingredient.ingredient }
              name={ ingredient.ingredient }
              value={ ingredient.ingredient }
              checked={ ingredient?.isChecked || false }
              onChange={ handleChange }
            />
            {ingredient.ingredient} →
          </label>
        </div>
      ))}
      </div>
      <div className='flex flex-col'>
      {measures && measures.map((item, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
          
        >
         {item.measure}
        </span>
      ))}  
</div>
</div>
      <span className='text-stone-700 font-light text-xl mb-4'>Instructions</span>
      <p data-testid="instructions" className='text-justify mb-4 max-w-xl'>{dataInProgress.strInstructions}</p>
      <div className='flex justify-center mb-10'>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-28 hover:bg-green-500 hover:duration-500 justify-center pointer'
        data-testid="share-btn"
        onClick={ () => {
          const url = `http://localhost:3000/foods/${dataInProgress.idMeal}`;
          copy(url);
          setLinkCopy(true);
        } }
      >
        Compartilhar

      </button>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-28 hover:bg-stone-500 hover:duration-500 justify-center pointer'

        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <button
        type="button"
        className='flex bg-green-400 py-2 m-2 rounded-lg w-28 hover:bg-green-500 hover:duration-500 justify-center pointer disabled:bg-red-100 disabled:cursor-not-allowed'
        data-testid="finish-recipe-btn"
        onClick={ () => {
          console.log('teste')
           history.push('/done-recipes')
           saveRecipeDoneInLocalStorage()
        }}
        disabled={ isDisabled }
      >
        Finish Recipe
      </button>
      </div>
      </div>
      </div>
      <div className='flex justify-center'>
     
      <Footer/>
    </div>
    </div>
  );
}

export default FoodInProgress;