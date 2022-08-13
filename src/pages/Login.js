import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import recipesContext from "../context/context";
import cook from "../img/cookie.png";

function Login() {
  const { email, setEmail } = useContext(recipesContext);
  const [password, setPassword] = useState("");
  const history = useHistory();

  const validateEmailAndPassword = () => {
    const MIN_LENGTH_PASSWORD = 6;
    const regex = /[\w.-]+@[\w-]+\.[\w.-]+/gi;
    const validateSenha = password.length <= MIN_LENGTH_PASSWORD;
    const validate = email.match(regex) && !validateSenha;
    return !validate;
  };

  const saveEmailandTokenAtLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    localStorage.setItem("mealsToken", 1);
    localStorage.setItem("cocktailsToken", 1);
    history.push("/foods");
  };

  return (
    <section className="flex flex-col items-center justify-center bg-stone-400 h-screen login-bg">
      <div className="flex justify-center items-center">
        <img src={cook} className="h-20" />
      </div>
      <form className="flex flex-col bg-white p-8 items-center w-5/6 md:w-1/2 lg:w-1/3 lg:p-16 rounded-lg mt-3">
        <h2 className="font-alice text-3xl text-stone-700 font-bold mb-8">
          ONLINE COOK
        </h2>
        <input
          className="border border-stone-600  rounded-md px-4 py-1 focus:border-none mb-4 w-full"
          placeholder="Email"
          data-testid="email-input"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          className="border border-stone-600 rounded-md px-4 py-1 focus:border-none mb-3 w-full focus:border-violet-300"
          placeholder="Senha - Insira 7 dígitos"
          data-testid="password-input"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button
          className="bg-stone-600  w-full rounded-full py-2 text-white font-semibold font-mono disabled:bg-stone-400 disabled:duration-500 hover:scale-105 hover:duration-500"
          data-testid="login-submit-btn"
          type="button"
          disabled={validateEmailAndPassword()}
          onClick={saveEmailandTokenAtLocalStorage}
        >
          Enter
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default Login;
