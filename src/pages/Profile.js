import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';
import profileIMG from '../images/profileIcon-copy.svg';

function Profile() {
  const [emailLocal, setEmailLocal] = useState('');

  const getEmailLocalStorage = () => {
    const emailCapture = localStorage.getItem('user');
    if (emailCapture !== null) {
      const emailGet = JSON.parse(emailCapture);
      setEmailLocal(emailGet.email);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);

  return (
    <div>
      <Header
        title="Profile"
        profileIcon={ profileIcon }
      />
      <section className="bg-stone-100 pt-4 flex flex-col itens-center">
      <img src={profileIMG } className='h-28 flex mx-auto w-28 bg-stone-200 rounded-full p-4 my-4'/>
      <p data-testid="profile-email" className='text-center font-alice text-2xl'>{emailLocal}</p>
      </section>
      <section className="bg-stone-100   h-screen text-center">
        <Link to="/done-recipes">
          <button type="button" data-testid="profile-done-btn"
          className="bg-stone-500 p-2 mt-4 rounded-lg  hover:bg-stone-600 hover:duration-500 text-white w-48">
            Done Recipes
          </button>
        </Link>
        <br/>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="bg-stone-500 p-2 mt-2 rounded-lg  hover:bg-stone-600 hover:duration-500 text-white w-48"
          >
            Favorite Recipes
          </button>
        </Link>
        <br/>
        <Link to="/">
          <button
            className="bg-red-500 p-2 mt-2 rounded-lg hover:bg-red-600 hover:duration-500  text-white w-48"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
          >
            Logout
          </button>
        </Link>

      </section>
      <Footer />
    </div>
  );
}

export default Profile;
