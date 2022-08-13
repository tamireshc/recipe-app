import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import shareIcon from "../images/shareIcon.svg";
import whiteHeartIcon from "../images/whiteHeartIcon.svg";
import blackHeartIcon from "../images/blackHeartIcon.svg";
import Footer from "../components/Footer";

const copy = require("clipboard-copy");

function RecipeDetails() {
  const [rd, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [receitaFeita, setReceitaFeita] = useState(false);
  const [receitaEmProgresso, setReceitaEmProgresso] = useState(false);
  const [favoritada, setFavoritada] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [linkFav, setLinkFav] = useState(false);
  const history = useHistory();
  const comida = history.location.pathname.includes("foods");
  const id = comida
    ? history.location.pathname.split("/foods/").join("")
    : history.location.pathname.split("/drinks/").join("");
  useEffect(() => {
    const six = 6;
    if (comida) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((raw) => raw.json()) // gera detalhes da receita
        .then((data) => setRecipeDetails(data.meals[0]));
      fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        .then((raw) => raw.json()) // gera recomendações de bebidas
        .then((data) => setRecomendations(data.drinks.slice(0, six)));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((raw) => raw.json()) // gera detalhes da receita
        .then((data) => setRecipeDetails(data.drinks[0]));
      fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((raw) => raw.json()) // gera recomendações de comida
        .then((data) => setRecomendations(data.meals.slice(0, six)));
    }
  }, []);

  console.log(rd);

  useEffect(() => {
    // efeito para criar ingredients
    if (rd !== []) {
      const ingredientsArr = [];
      const quantitiesArr = [];
      Object.keys(rd).forEach((key) => {
        if (key.includes("Ingredient") && rd[key]) {
          ingredientsArr.push(rd[key]);
        }
        if (key.includes("Measure") && rd[key]) {
          quantitiesArr.push(rd[key]);
        }
      });
      setIngredients(
        ingredientsArr
          .filter((item) => item !== "") // limpa os itens vazios
          .map((item, i) => ({
            item: ingredientsArr[i],
            quantity: quantitiesArr[i],
          }))
      ); // cria um array de objetos para ser renderizado no return como ingredientes : quantidades
    }
  }, [rd]);

  useEffect(() => {
    // checa se a receita já foi feita, ou está em progresso
    if (rd !== []) {
      // if (localStorage.getItem('doneRecipes') !== null) {
      //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      //   setReceitaFeita(doneRecipes.some((item) => (comida ? item.id === rd.idMeal
      //     : item.id === rd.idDrink)));
      // }
      if (JSON.parse(localStorage.getItem("inProgressRecipes")) !== null) {
        let inProgressRecipes = JSON.parse(
          localStorage.getItem("inProgressRecipes")
        );
        if (comida) {
          inProgressRecipes = Object.keys(inProgressRecipes.meals).some(
            (item) => item === rd.idMeal
          );
        } else {
          inProgressRecipes = Object.keys(inProgressRecipes.cocktails).some(
            (item) => item === rd.idDrink
          );
        }
        console.log(inProgressRecipes);
        setReceitaEmProgresso(inProgressRecipes);
      }
    }
  }, [rd]);

  useEffect(() => {
    // checa se a recipe está favoritada
    if (rd !== []) {
      const favoriteRecipes = JSON.parse(
        localStorage.getItem("favoriteRecipes")
      );
      if (favoriteRecipes) {
        setFavoritada(
          favoriteRecipes.some((favorita) =>
            comida ? favorita.id === rd.idMeal : favorita.id === rd.idDrink
          )
        );
      }
    }
  }, [rd]);

  const favoriteClick = () => {
    let favoriteRecipes = [];
    if (localStorage.getItem("favoriteRecipes")) {
      favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
    }
    if (
      favoriteRecipes.some((favorita) =>
        comida ? favorita.id === rd.idMeal : favorita.id === rd.idDrink
      )
    ) {
      // se já é favorite, desfavorite-a
      favoriteRecipes = favoriteRecipes.filter((item) =>
        comida ? item.id !== rd.idMeal : item.id !== rd.idDrink
      );
      setFavoritada(false);
    } else {
      favoriteRecipes = [
        ...favoriteRecipes,
        comida
          ? {
              id: rd.idMeal,
              type: "food",
              nationality: rd.strArea,
              category: rd.strCategory,
              alcoholicOrNot: "",
              name: rd.strMeal,
              image: rd.strMealThumb,
            }
          : {
              id: rd.idDrink,
              type: "drink",
              nationality: rd.strArea ? rd.strArea : "",
              category: rd.strCategory,
              alcoholicOrNot: rd.strAlcoholic,
              name: rd.strDrink,
              image: rd.strDrinkThumb,
            },
      ];
      setFavoritada(true);
    }
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  };

  const reload = () => {
    setTimeout(() => {
      document.location.reload(true);
    }, 300);
  };

  const addFav = () => {
    setLinkFav(true);
  };

  return (
    <section className="bg-stone-100">
      <div className="bg-stone-500 h-18 text-white ">
        <h2
          data-testid="recipe-title"
          className="text-3xl font-alice text-center py-4"
        >
          {comida ? rd.strMeal : rd.strDrink}
        </h2>
      </div>
      {copiado && (
        <p className="text-red-500 text-2xl text-center">Link copied!</p>
      )}
      {linkFav && (
        <p className="text-center text-blue-600 text-2xl">
          Adicionado aos favoritos
        </p>
      )}
      <div className="flex justify-center items-center my-6 flex-col md:flex-row">
        <img
          data-testid="recipe-photo"
          className="  rounded hover:scale-105 hover:duration-500 md:mr-6 mb-6 max-h-80 w-80 mx-auto md:mx-0"
          src={comida ? rd.strMealThumb : rd.strDrinkThumb}
          alt={comida ? rd.strMeal : rd.strDrink}
          width="200"
        />
        <div>
          <div className="bg-white flex flex-col justify-center py-2 px-8 rounded ">
            <h3
              data-testid="recipe-category"
              className="text-center font-alice text-xl underline text-red-800 mb-2"
            >
              {rd.strCategory}
              {!comida && rd.strAlcoholic}
            </h3>
            <ul className="">
              {ingredients.map((ingredient, i) => (
                <li
                  className="font-serif"
                  key={i}
                  data-testid={`${i}-ingredient-name-and-measure`}
                >
                  {`ᐅ ${ingredient.item} + ${ingredient.quantity}`}
                </li>
              ))}
            </ul>

            <p
              data-testid="instructions"
              className="text-sm font-thin w-64 text-justify h-44 overflow-scroll mt-2"
            >
              {rd.strInstructions}
            </p>
          </div>
        </div>
      </div>
      <p className="text-alice text-2xl text-center bg-stone-200 p-2">
        {" "}
        Another Recomendations:{" "}
      </p>
      <div className="recomendations flex flex-wrap gap-4 bg-stone-100 justify-center py-8 pb-44">
        {recomendations.map(
          (
            item,
            i 
          ) => (
            <div className="">
              <Link
                data-testid={`${i}-recomendation-card`}
                key={i}
                to={
                  !comida ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}`
                }
                className="rec-card"
              >
                <img
                  width="150"
                  className="rounded-md hover:scale-105 hover:duration-500"
                  src={!comida ? item.strMealThumb : item.strDrinkThumb}
                  data-testid={`${i}-recomendation-img`}
                  alt={!comida ? item.strMeal : item.strDrink}
                  onClick={reload}
                />
                <p
                  data-testid={`${i}-recomendation-title`}
                  className="font-serif text-center mt-2 text-lg "
                >
                  {!comida ? item.strMeal : item.strDrink}
                </p>
              </Link>
            </div>
          )
        )}
      </div>
      <div className="fix-btn flex justify-center py-4 fixed bottom-12 bg-stone-200 w-full">
        {receitaEmProgresso ? (
          <Link 
            data-testid="start-recipe-btn"
            type="button"
            to={
              comida ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress`
            }
            className="fix-btn2"
          >
            Continue Recipe
          </Link>
        ) : (
          !receitaFeita && (
            <Link 
              data-testid="start-recipe-btn"
              type="button"
              to={
                comida
                  ? `/foods/${id}/in-progress`
                  : `/drinks/${id}/in-progress`
              }
              className="fix-btn2"
            >
              {" "}
              <button className="bg-green-500 p-2 m-2 rounded-lg  hover:bg-green-600 hover:duration-500 text-white">
                Start Recipe
              </button>
            </Link>
          )
        )}
        <div className="flex justify-center items-center px-1/2">
          <button
            type="button"
            className="bg-stone-500 p-2 m-2 rounded-lg  hover:bg-stone-600 hover:duration-500 text-white"
            data-testid="share-btn"
            onClick={() => {
              copy(`http://localhost:3000${history.location.pathname}`);
              setCopiado(true);
            }}
          >
            Compartilhar
          </button>

          <button
            type="button"
            className="bg-stone-500 p-2 m-2 rounded-lg w-24 hover:bg-stone-600 hover:duration-500 text-white"
            data-testid="favorite-btn"
            onClick={() => {
              addFav();
              favoriteClick();
            }}
            src={favoritada ? blackHeartIcon : whiteHeartIcon} 
            alt={favoritada ? "Full Heart Button" : "Empty Heart Buton"}
          >
            Favoritar
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default RecipeDetails;
