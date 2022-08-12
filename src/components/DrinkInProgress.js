import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/context';
import Footer from './Footer';

const copy = require('clipboard-copy');

function DrinkInProgress() {
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
    console.log(localObject)
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0");
    let ano = data.getFullYear();
    const dataAtual = dia + "/" + mes + "/" + ano;
    if(localObject == null){
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: dataInProgress.idDrink,
        type: 'drink',
        category: dataInProgress.strCategory,
        alcoholicOrNot: dataInProgress.strAlcoholic,
        name:dataInProgress.strDrink,
        image:dataInProgress.strDrinkThumb,
        doneDate: dataAtual,
        tags:dataInProgress.strTags,
      } ]))  
    }
    if(localObject !== null){
      const localStorageAtt = [...localObject, {
        id: dataInProgress.idDrink,
        type: 'drink',
        category: dataInProgress.strCategory,
        alcoholicOrNot: dataInProgress.strAlcoholic,
        name:dataInProgress.stridDrink,
        image:dataInProgress.strDrinkThumb,
        doneDate: dataAtual,
        tags:dataInProgress.strTags,
      } ]
      // console.log(dataInProgress.idMeal)
      localStorage.setItem('doneRecipes', JSON.stringify(localStorageAtt))  

    }
   
  }


  return (
    <div className='bg-stone-100 h-screen'>
       <h1 data-testid="recipe-title" className='bg-stone-400 p-4 text-white font-alice text-3xl text-center'>{dataInProgress.strDrink}</h1>
       <div className='flex flex-col md:flex-row p-6 justify-center items-center'>
      <img
      className='h-52 rounded-lg'
        width={ 200 }
        src={ dataInProgress.strDrinkThumb }
        alt={ dataInProgress.strDrink }
        data-testid="recipe-photo"
        a
      />
     <div className='pl-8 pr-8'>
     <p data-testid="recipe-category" className='my-3 text-center mb:text-justify underline'>{dataInProgress.strCategory}</p>
     <h4 className='text-stone-700 font-light text-xl mb-3'>Ingredients</h4>
     <div className='flex'>
      <div className='mb-3 mr-5'>
      
      {ingredients && ingredients.map((ingredient, index) => (
        <div key={ index }>
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
            {ingredient.ingredient}→
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
      <p data-testid="instructions">{dataInProgress.strInstructions}</p>
      <div className='flex justify-center mt-6'>
      <button
        type="button"
        className='flex bg-stone-400 py-2 m-2 rounded-lg w-28 hover:bg-green-500 hover:duration-500 justify-center pointer'

        data-testid="share-btn"
        onClick={ () => {
          const url = `http://localhost:3000/drinks/${dataInProgress.idDrink}`;
          copy(url);
          setLinkCopy(true);
        } }
      >
        Compartilhar

      </button>
      <button type="button" className='flex bg-stone-400 py-2 m-2 rounded-lg w-28 hover:bg-green-500 hover:duration-500 justify-center pointer'
 data-testid="favorite-btn">Favoritar</button>
      {linkCopy && <p>Link copied!</p>}
      <button
        type="button"
        className='flex bg-green-400 py-2 m-2 rounded-lg w-28 hover:bg-green-500 hover:duration-500 justify-center pointer disabled:bg-red-100 disabled:cursor-not-allowed'
        data-testid="finish-recipe-btn"
        onClick={ () => {
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

export default DrinkInProgress;
