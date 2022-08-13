import React, { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import recipesContext from "../context/context";
import "./SearchBar.css";

function SearchBar({ setToggleInput }) {
  const { searchMeals, searchDrinks, setComidaContext } =
    useContext(recipesContext);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("name");

  const history = useHistory();
  const { pathname } = history.location;

  const fetchMealsHandler = useCallback(() => {
    if (pathname === "/foods") {
      searchMeals(inputSearch, selectedRadio);
      setComidaContext(true);
      setToggleInput(false);
    }
  }, [
    inputSearch,
    searchMeals,
    selectedRadio,
    pathname,
    setComidaContext,
    setToggleInput,
  ]);

  const fetchDrinksHandler = useCallback(() => {
    if (pathname === "/drinks") {
      searchDrinks(inputSearch, selectedRadio);
      setComidaContext(false);
      setToggleInput(false);
    }
  }, [
    inputSearch,
    searchDrinks,
    selectedRadio,
    pathname,
    setComidaContext,
    setToggleInput,
  ]);

  return (
    <form className="form-container bg-stone-300 w-full pt-4 ">
      <input
        className="radio-element mt-8"
        name="search"
        id="ingredient-search"
        type="radio"
        data-testid="ingredient-search-radio"
        value="ingredient"
        onClick={(e) => setSelectedRadio(e.target.value)}
      />
      <label htmlFor="ingredient-search" className=" sm:text-xl text-sm mt-4">
        Ingredient
      </label>
      <label htmlFor="name-search" className=" sm:text-xl text-sm ">
        <input
          className="radio-element"
          name="search"
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
          value="name"
          defaultChecked
          onClick={(e) => setSelectedRadio(e.target.value)}
        />{" "}
        Name
      </label>
      <label htmlFor="first-letter-search" className=" sm:text-xl text-sm ">
        <input
          className="radio-element"
          name="search"
          id="first-letter-search"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onClick={(e) => setSelectedRadio(e.target.value)}
        />
        First Letter
      </label>
      <br />
      <input
        className="input-search mt-4 rounded-lg mx-2 p-8"
        type="text"
        data-testid="search-input"
        placeholder="pesquisar"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button
        className="bg-stone-500 p-2 m-2 rounded-lg  hover:bg-stone-600 hover:duration-500 text-white"
        type="button"
        data-testid="exec-search-btn"
        onClick={pathname === "/foods" ? fetchMealsHandler : fetchDrinksHandler}
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  setToggleInput: PropTypes.func.isRequired,
};

export default SearchBar;
