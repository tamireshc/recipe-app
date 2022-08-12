import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer  " data-testid="footer">
      
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
          className="footer-item hover:scale-105  hover:duration-500"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="foods"
          data-testid="food-bottom-btn"
          className="footer-item hover:scale-105  hover:duration-500"
        />
      </Link>
      
    </footer>
  );
}

export default Footer;
