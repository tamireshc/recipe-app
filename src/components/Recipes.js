import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import recipesContext from '../context/context';

function Recipes() {
  const { recipes, setRecipes } = useContext(recipesContext);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [temFiltro, setTemFiltro] = useState(false);
  const history = useHistory();
  const comida = history.location.pathname.includes('foods');

  const onze = 11;
  const cinco = 5;

  useEffect(() => {
    if (comida) {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((raw) => raw.json())
        .then((data) => setCategories(data.meals));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((raw) => raw.json())
        .then((data) => setCategories(data.drinks));
    }
  }, []);

  useEffect(() => {
    if (filter !== '') {
      if (comida) {
        if (filter === 'All') {
          fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((raw) => raw.json())
            .then((data) => {
              setRecipes(data.meals);
              setTemFiltro(false);
            });
        } else {
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
            .then((raw) => raw.json()).then((data) => setFiltered(data.meals || []));
        }
      } else if (filter === 'All') {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((raw) => raw.json())
          .then((data) => {
            setRecipes(data.drinks);
            setTemFiltro(false);
          });
      } else {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`)
          .then((raw) => raw.json()).then((data) => setFiltered(data.drinks));
      }
    }
  }, [filter]);

  return (
    <div>
      <section>
        <div className='bg-stone-200'>
        <br />
        <div className='flex flex-wrap justify-center pb-4'>
        {categories.filter((item) => categories.indexOf(item) < cinco).map((category) => (
          <button
          className='bg-stone-400 p-2 m-2 rounded-lg px-4 text-white hover:bg-stone-500 hover:duration-500 '
            key={ category.strCategory }
            type="button"
            id={ category.strCategory }
            onClick={ (e) => {
              if (temFiltro) {
                setTemFiltro(false);
              } else {
                setFilter(e.target.id);
                setTemFiltro(true);
              }
            } }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
        <button
        className='bg-stone-400 p-2 m-2 rounded-lg w-24 text-white hover:bg-stone-500 hover:duration-500'
          type="button"
          id="All"
          onClick={ (e) => {
            setFilter(e.target.id);
            setTemFiltro(false);
          } }
          data-testid="All-category-filter"
        >
          All
        </button>
        </div>
        </div>
      </section>
      <section className='flex flex-wrap gap-4 bg-stone-100 justify-center py-8 pb-24'>
      {!temFiltro ? recipes.filter((it) => recipes.indexOf(it) <= onze) // mostra os 12 primeiros
        .map((item, i) => ( // cria os 'cards'
          <Link
          className=''
            key={ i }
            data-testid={ `${i}-recipe-card` }
            to={ comida ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}` }
          >
            <img
            className='rounded-md hover:scale-105 hover:duration-500'
              width="200"
              src={ comida ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${i}-card-img` }
              alt={ comida ? item.strMeal : item.strDrink }
            />
            <p className='font-mono text-center hover:underline mt-3'
            data-testid={ `${i}-card-name` }>
              {comida ? item.strMeal : item.strDrink}
            </p>
          </Link>))
        : filtered.filter((it) => filtered.indexOf(it) <= onze) // mostra os 12 primeiros, e condicionalmente renderiza a lista das categorias ou a lista da busca
          .map((item, i) => ( // cria os 'cards'
            <Link
              key={ i }
              data-testid={ `${i}-recipe-card` }
              to={ comida ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}` }
            >
              <img
                width="200"
                src={ comida ? item.strMealThumb : item.strDrinkThumb }
                data-testid={ `${i}-card-img` }
                alt={ comida ? item.strMeal : item.strDrink }
              />
              <p data-testid={ `${i}-card-name` }>
                {comida ? item.strMeal : item.strDrink}
              </p>
            </Link>))}</section>
    
    </div>);
}

export default Recipes;
