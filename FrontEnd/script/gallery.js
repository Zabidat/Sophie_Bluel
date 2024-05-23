/* eslint-disable-next-line import/extensions */
import {
  genererGalerie,
  GeneratedFilterWithNoAPI,
  loginConnexion,
  Authentification,
  genererbanniere,
  ajoutModal,
  ajoutPhoto,
  returnGalleryModal,
  confirmModal,
  /* eslint-disable-next-line import/extensions */
} from './travaux.js';

// Get userID OR token
const usertoken = localStorage.getItem('usertoken');
console.log(usertoken);

// Retrieve works from the HTTP API (from the JSON file) using the fetch function
let works;
let listcopyworks;

async function getAllWorks() {
  const reponse = await fetch('http://localhost:5678/api/works');
  works = await reponse.json();
  // console.log(works[0]);
  // Calls up the function for dynamically generating jobs on the website
  genererGalerie(works);

  // Call this function to generate menu category
  if (usertoken === null) {
    GeneratedFilterWithNoAPI(works);
  }
  // Call this function to generate menu category
  // GeneratedFilterWithAPI(categorie);

  // Create a copy of the list array works
  /* eslint-disable-next-line prefer-const */
  listcopyworks = Array.from(works);

  // Call this function to filter works by category
  /* eslint-disable-next-line  no-use-before-define */
  filterCategory(works);
}

// Call this function for getting the HTTP API
getAllWorks();

// Retrieve all Category from API
let categorie;
async function getAllCat() {
  const reponseCategory = await fetch('http://localhost:5678/api/categories');
  categorie = await reponseCategory.json();
}
// Call this function for getting all Category from API
getAllCat();

// When usertoken is present display element modify
if (usertoken !== null) {
  // Create  the Element "modify" after the projects section
  const divtag = document.querySelector('.portfolio-title');
  const atag = document.createElement('a');
  /* eslint-disable-next-line no-script-url */
  atag.href = 'javascript:void(0)';

  const aicone = document.createElement('i');
  aicone.className = 'far fa-edit';
  const atext = document.createTextNode(' modifier');

  atag.appendChild(aicone);
  atag.appendChild(atext);
  divtag.appendChild(atag);
}

// Filter (display) works by category
function filterCategory() {
  const boutonCategorie = document.querySelectorAll('.menuCategory div button');
  let filterWorks;

  // Browse each category id to filter works by project category
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < boutonCategorie.length; i++) {
    /* eslint-disable-next-line no-loop-func ,func-names ,prefer-arrow-callback */
    boutonCategorie[i].addEventListener('click', function (event) {
      // Click on the button( The dataset.id = property is used
      // to retrieve the value of the data id attribute)
      /* eslint-disable-next-line radix */
      const id = parseInt(event.target.dataset.id);
      // console.log(id);
      if (id === 0) {
        filterWorks = works;
        // console.log(filterWorks);
        document.querySelector('.gallery').innerHTML = '';
        genererGalerie(filterWorks);
      } else {
        // filter will filter each element object in the works array
        /* eslint-disable-next-line func-names ,prefer-arrow-callback */
        filterWorks = works.filter(function (work) {
          return work.categoryId === id;
        });
      }
      document.querySelector('.gallery').innerHTML = '';
      genererGalerie(filterWorks);
    });
  }
}

// Integrate the connection page and attach EventListener to the click event
const boutonlogin = document.querySelectorAll('nav ul li');
if (usertoken !== null) {
  boutonlogin[2].innerHTML = 'logout';
}

// Implement action logout
function logout() {
  localStorage.clear();
  // Redirect to the page indicated
  /* eslint-disable-next-line no-restricted-globals */
  location.assign('http://127.0.0.1:8080');
}

//  Select element login and attach EventListener to the click event
/* eslint-disable-next-line func-names ,prefer-arrow-callback */
boutonlogin[2].addEventListener('click', function () {
  if (usertoken === null) {
    document.querySelector('main').innerHTML = '';

    // Integrate the login page for the site
    loginConnexion();
    // User authentication
    Authentification();
  } else {
    // Call the function Logout
    logout();
  }
});

// Call the authentication function : will be executed once when the web page is refreshed
Authentification();

// Generated the function banner when user is connecting
if (usertoken !== null) {
  genererbanniere();
}

// Session Timeout Logout
let timeid;
if (usertoken !== null) {
  // Session expire in 15 minutes(15*60*1000 milliseconds)
  timeid = setTimeout(logout, 15 * 60 * 1000);
}

const bodytag = document.querySelector('body');
/* eslint-disable-next-line func-names ,prefer-arrow-callback */
bodytag.addEventListener('mouseover', function () {
  if (usertoken !== null) {
    // Clears a timer set with the setTimeout method
    clearTimeout(timeid);
    // Reset timer
    timeid = setTimeout(logout, 15 * 60 * 1000);
  }
});

// Add eventListener for Generated Modal
const openModal = document.querySelector('.portfolio-title a');

// Close the modal of click icone inside modal
function modalCloseOnCross() {
  const divContainerModal = document.querySelector('.cont-modal');
  const closeModal = document.querySelector('.icone-topright');
  // This action will be executed if this variable is different from null
  if (closeModal) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    closeModal.addEventListener('click', function () {
      // Close the modal to the click on the cross
      divContainerModal.remove();
    });
  }
}
// This action will be executed if this variable is different from null
if (openModal) {
  /* eslint-disable-next-line func-names ,prefer-arrow-callback */
  openModal.addEventListener('click', function () {
    // Call this function to generate Modal
    ajoutModal(listcopyworks);

    // Call this function to confirm Delete or no Project
    /* eslint-disable-next-line  no-use-before-define */
    ConfirmDeleteProject();

    // Call this function to close Modal
    /* eslint-disable-next-line  no-use-before-define */
    modalCloseOnCross();
    /* eslint-disable-next-line  no-use-before-define */
    closeModalOutside();

    // Call this function Form Add works via modal
    /* eslint-disable-next-line  no-use-before-define */
    selectAjoutPhoto();
    // Call this function to remove work
    /* eslint-disable-next-line  no-use-before-define */
    deleteApi();
  });
}

// Call the modalCloseOnCross function : will be executed once when the web page is refreshed
modalCloseOnCross();

// Outer Close Modal
function closeModalOutside() {
  const divModal = document.querySelector('.cont-modal');

  // This action will be executed if this variable is different from null
  if (divModal) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    divModal.addEventListener('click', function (event) {
      // Returns the element I clicked
      // console.log(event.target);

      // Close modal on click outside is equal to divModal
      if (event.target === divModal) {
        divModal.remove();
      }
    });
  }
}

// Call the closeModalOutside function : will be executed once when the web page is refreshed
closeModalOutside();

// Return to the photo gallery Modal to the click the left arrow
function returnGalleryPhotoModal() {
  const arrowLeft = document.querySelector('.icone-topleft');

  // This action will be executed if this variable is different from null
  if (arrowLeft) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    arrowLeft.addEventListener('click', function () {
      // console.log('Return arrow left');
      // Call this function to generate Gallery photo Modal
      returnGalleryModal(listcopyworks);
      // Initialize the delete icon
      /* eslint-disable-next-line  no-use-before-define */
      deleteApi();
    });
  }
}

// Call the returnGalleryPhotoModal function : will be executed once when the web page is refreshed
returnGalleryPhotoModal();

// Function Add works to gallery
function selectAjoutPhoto() {
  const btnAjoutPhoto = document.querySelector('.cont-modal-content button');

  if (btnAjoutPhoto) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    btnAjoutPhoto.addEventListener('click', function () {
      // Call the function to Add works to gallery (via the modal)
      ajoutPhoto(categorie);
      // Call this function to Return to the photo gallery Modal
      returnGalleryPhotoModal();
      // Call this function to Add New Work to the back-end
      /* eslint-disable-next-line  no-use-before-define */
      ajoutNewWork();
      // Call this function once the button has been generated
      // To change the background of the Validate button
      /* eslint-disable-next-line  no-use-before-define */
      changeBackgroundBtnValider();
    });
  }
}

// Call the selectAjoutPhoto function for Add works to gallery
selectAjoutPhoto();

let idworkDel = 0;
let index;
// Delete works via API
function deleteApi() {
  const iconeDelete = document.querySelectorAll('.cont-gallery .icone-delete i');
  // console.log(iconeDelete);

  if (iconeDelete) {
    // Browse each category id to filter workss by project category.
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < iconeDelete.length; i++) {
      /* eslint-disable-next-line no-loop-func,func-names ,prefer-arrow-callback */
      iconeDelete[i].addEventListener('click', async function (event) {
        // Call this function to Confirm Modal to delete works
        confirmModal();
        // This variable retrieves the element id grace an Event.target
        idworkDel = event.target.dataset.id;
        // Recover element position
        index = i;
        // Call this function to confirm Delete or no Project
        /* eslint-disable-next-line  no-use-before-define */
        ConfirmDeleteProject(idworkDel);
      });
    }
  }
}

// Call the deleteApi function for removal of existing work
deleteApi();

// Function to confirm Delete or no Project
function ConfirmDeleteProject(idmodule) {
  const divModal = document.querySelector('.confirm-Modal');
  const bntYes = document.querySelector('#btnyes');
  const btnNo = document.querySelector('#bntno');
  const parenttag = document.querySelectorAll('.cont-gallery');

  // Stock input parameter id
  /* eslint-disable-next-line prefer-const */
  const id = idmodule;

  if (bntYes) {
    // Action onclick btnYes
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    bntYes.addEventListener('click', async function () {
      // Delete div Modal Confirm
      divModal.remove();
      /* eslint-disable-next-line prefer-template */
      await fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          /* eslint-disable-next-line prefer-template */
          authorization: 'Bearer ' + usertoken,
        },
      }).then((reponse) => {
        if (reponse.status === 204) {
          console.log('deleted succeful');
          // Delete project in gallery Modal
          parenttag[index].remove();

          // Select all category menu items (figure)
          const figtag = document.querySelectorAll('figure');
          /* eslint-disable-next-line no-plusplus */
          for (let i = 0; i < figtag.length; i++) {
            if (figtag[i].dataset.id === id) {
              // Delete project in Portfolio
              figtag[i].remove();
            }
          }
          // Browse the copy of the works list we've created
          /* eslint-disable-next-line no-plusplus */
          for (let i = 0; i < listcopyworks.length; i++) {
            /* eslint-disable-next-line radix */
            if (listcopyworks[i].id === parseInt(id)) {
              // console.log('hello 1')
              // Update array work for gallery Modal
              // (Delete the object whose id is equal to the delete id)
              listcopyworks.splice(i, 1);
            }
          }
        } else {
          // console.log('wrong request');
        }
      });
    });
  }

  // Action onclick btnNo
  if (btnNo) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    btnNo.addEventListener('click', function () {
      // Delete div Modal Confirm
      divModal.remove();
    });
  }
}
// Call this function to confirm Delete or no Project
ConfirmDeleteProject(idworkDel);

// Sending a new project to the back-end via the modal form
function ajoutNewWork() {
  const formModalSend = document.querySelector('.form-modal form');

  if (formModalSend) {
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    formModalSend.addEventListener('submit', async function (event) {
      // Block login form action behavior
      event.preventDefault();

      const data = new FormData();
      // Getting data in the form Modal
      const inputFile = document.querySelector('#img-id').files[0];
      const inputTitle = document.querySelector('#title').value;
      const SelectForm = document.querySelector('#category').value;
      const spantag = document.querySelector('.form-modal #spanErrorMessage');
       //console.log(inputFile);

      // Processing of form data
      if(inputFile === undefined) {
        spantag.innerHTML = 'Veuillez ajouter une image';
      } else if (inputFile !== undefined && inputFile.size / (1024 * 1024) > 4) {
        // For image tag of form Modal
        spantag.innerHTML = 'La taille du fichier a dépasseé (maximum 4 mo)';
      } else if (SelectForm === '') {
        // For select tag of form Modal
        spantag.innerHTML = "Veuillez choisir l'option ayant un nom";
      } else {
        // Recover UserIDs stored in localStorage
        data.append('title', inputTitle);
        data.append('category', SelectForm);
        data.append('image', inputFile);

        // The try...catch instruction is used to manage errors
        try {
          // Request post api works
          await fetch('http://localhost:5678/api/works', {
            // Configuration Object
            method: 'POST',
            headers: {
              accept: '*/*',
              // This property gives us access to Api works as it is secure
              /* eslint-disable-next-line prefer-template */
              authorization: 'Bearer ' + usertoken,
            },
            body: data,
          }).then((reponse) => {
            // Status treatments
            if (reponse.status === 201) {
              // Returns a promise container containing the server response
              const workresult = reponse.json();
              workresult.then((datareceived) => {
                // then(data) will access data (which is an object) from the job we've created
                console.log(datareceived);

                // Call this function(Once you have created a project) to
                // Add dynamic work in the gallery (after sending the form)
                /* eslint-disable-next-line  no-use-before-define */
                addNewWorkGallery(datareceived);

                // Add the new project to the list of existing array works
                listcopyworks[listcopyworks.length] = datareceived;
                // Call this function to generate Gallery photo Modal
                returnGalleryModal(listcopyworks);
                // Initialize the delete icon
                deleteApi();
              });
            } else {
              console.log('Le travail');
              spantag.innerHTML = "Le travail n'est pas crée.";
            }
          });
        } catch (error) {
          console.log('catch error');
        }
      }
    });
  }
}

// Call this function Sending a new project to the back-end via the modal form
ajoutNewWork();

// Function Diplay picture in the form Modal
function affichPhotoForm() {
  const inputImage = document.querySelector('#img-id').files[0];
  const labelTag = document.querySelector('.label-form');
  labelTag.innerHTML = '';
  labelTag.style.paddingTop = '0px';

  const imgTag = document.createElement('img');

  // This variable takes an object (FileReader) that reads the contents of our file
  /* eslint-disable-next-line prefer-const */
  let reader = new FileReader();
  // This event is triggered by each read operation
  reader.onload = function (e) {
    // console.log(e.target);
    // This property (result) takes the file path and the file itself
    imgTag.src = e.target.result;
    imgTag.style.objectFit = 'contain';
    imgTag.style.height = '150px';
    labelTag.appendChild(imgTag);
  };
  // Transform image into url
  reader.readAsDataURL(inputImage);
}

// Change button "Valider" backgroundColor
function changeBackgroundBtnValider() {
  const inputValider = document.querySelector('#id-submit');

  const imgTag = document.querySelector('#img-id');
  const inputTitle = document.querySelector('#title');
  const selectTag = document.querySelector('#category');

  // Verify the existence of the element to avoid an error (on the instructions below)
  if (inputTitle || imgTag || selectTag) {
    // Add EventListener on InputTitle of type "change"
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    inputTitle.addEventListener('change', function () {
      if (imgTag.value !== '' && inputTitle.value !== '' && selectTag.value !== '') {
        inputValider.style.backgroundColor = '#1D6154';
      }
    });

    // Add EventListener on InputImage of type "change"
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    imgTag.addEventListener('change', function () {
      // Call this function to display picture in the form Modal
      affichPhotoForm();

      if (imgTag.value !== '' && inputTitle.value !== '' && selectTag.value !== '') {
        inputValider.style.backgroundColor = '#1D6154';
      }
    });

    // Add EventListener on SelectTag of type "change"
    /* eslint-disable-next-line func-names ,prefer-arrow-callback */
    selectTag.addEventListener('change', function () {
      if (imgTag.value !== '' && inputTitle.value !== '' && selectTag.value !== '') {
        inputValider.style.backgroundColor = '#1D6154';
      }
    });
  }
}

// Call the changeBtnBackground function for change the backgroundColor Button :
//  will be executed once when the web page is refreshed
changeBackgroundBtnValider();

// Create this Function Add New Work Gallery dynamically (after sending the form):
// Call this Function Once you have created a project
function addNewWorkGallery(newWork) {
  // Select div tag gallery
  const sectionGallery = document.querySelector('.gallery');

  // Create tag figure (child div tag gallery)
  const FigureElement = document.createElement('figure');
  FigureElement.dataset.id = newWork.id;

  // Create of tag img and figcation
  const Image = document.createElement('img');
  Image.src = newWork.imageUrl;
  Image.alt = newWork.title;

  const FigCaption = document.createElement('figcaption');
  FigCaption.innerText = newWork.title;

  // Add img and figcaption in figure tag
  FigureElement.appendChild(Image);
  FigureElement.appendChild(FigCaption);

  // Add figure tag in parent div tag
  sectionGallery.appendChild(FigureElement);
}
