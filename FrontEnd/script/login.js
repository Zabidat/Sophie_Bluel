/* eslint-disable-next-line import/extensions */
import {
    loginConnexion
    /* eslint-disable-next-line import/extensions */
  } from './travaux.js';


  //  User authentication
export function Authentification() {
    const formulaireLogin = document.querySelector('#login form');
    const spantag = document.querySelector('#login form span');
  
    if (formulaireLogin) {
      /* eslint-disable-next-line func-names ,prefer-arrow-callback */
      formulaireLogin.addEventListener('submit', async function (event) {
      // Block login form action behavior
        event.preventDefault();
        //  Create a new login(objet)
        const login = {
          email: event.target.querySelector('#email').value,
          password: event.target.querySelector('#password').value,
        };
  
        //  Transform data into JSON
        const bodyvalue = JSON.stringify(login);
  
        //  The try...catch instruction is used to manage errors
        try {
          //  Request post api login
          await fetch('http://localhost:5678/api/users/login', {
            //  Configuration Object
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyvalue,
          }).then((reponse) => {
            const loginresult = reponse.json();
            console.log(loginresult);
            if (reponse.status === 404 || reponse.status === 401) {
              loginConnexion();
              spantag.innerHTML = 'Email ou Mot de passe incorrect';
            } else if (reponse.status === 200) {
              //  Display data userId and token
              loginresult.then((data) => {
                console.log(data);
                //  Stock  userID and token
                localStorage.setItem('usertoken', data.token);
                localStorage.setItem('userId', data.userId);
              });
  
              //  Go to home page
              /* eslint-disable-next-line no-restricted-globals */
              window.location.replace('index.html');
            } else {
              spantag.innerHTML = 'un problème est survenu, veuillez reessayer plus tard.';
            }
          });
        } catch (error) {
          console.error('Erreur :', error);
          spantag.innerHTML = 'un problème est survenu, veuillez reessayer plus tard.';
        }
      });
    }
  }
  
 

// Integrate the login page for the site
loginConnexion();

// User authentication
Authentification();