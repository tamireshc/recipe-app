import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";
import Footer from "../components/Footer";
import recipesContext from "../context/context";
import "./styles/Drinks.css";
import Recipes from "../components/Recipes";

function Drinks() {
  const { recipes, setRecipes } = useContext(recipesContext);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((raw) => raw.json())
      .then((data) => setRecipes(data.drinks));
  }, []);

  return (
    <div>
      <Header
        title="Drinks"
        profileIcon={profileIcon}
        searchIcon={searchIcon}
      />
      {recipes ? <Recipes /> : null}
      <Footer />
    </div>
  );
}

export default Drinks;
