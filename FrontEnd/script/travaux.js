//    This function will create html elements that the browser will use to generate the page.
export function genererGalerie(listWorks) {
  //  Remove the old static gallery
  const sectionGallery = document.querySelector('.gallery');
  sectionGallery.textContent = '';

  //  Generated the dynamic gallery
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < listWorks.length; i++) {
    //  Retrieves each element of the table
    const listeTravaux = listWorks[i];

    //  Create tag figure
    const FigureElement = document.createElement('figure');
    FigureElement.dataset.id = listeTravaux.id;

    //  Create of tag img and figcation
    const Image = document.createElement('img');
    Image.src = listeTravaux.imageUrl;
    Image.alt = listeTravaux.title;

    const FigCaption = document.createElement('figcaption');
    FigCaption.innerText = listeTravaux.title;

    //  Add img and figcaption in figure tag
    FigureElement.appendChild(Image);
    FigureElement.appendChild(FigCaption);

    //  Add figure tag in parent div tag
    sectionGallery.appendChild(FigureElement);
  }
}

//  Generated menu category using set object(takes as input the works)
export function GeneratedFilterWithNoAPI(categoryWorks) {
  //  Create a set object
  const categorySet = new Set();
  const asideCategory = document.querySelector('.menuCategory');
  const divcategory = document.createElement('div');

  //  Created Button "Tous"(display all works as default)
  const btnTous = document.createElement('button');
  btnTous.textContent = 'Tous';
  btnTous.dataset.id = 0;
  divcategory.appendChild(btnTous);
  asideCategory.appendChild(divcategory);

  //  Create empty array
  const obj = [];
  /* eslint-disable-next-line no-plusplus */
  for (let j = 0; j < categoryWorks.length; j++) {
    // This array creates a key (corresponds to the category id)
    // And with its value (corresponds to the category name)
    obj[categoryWorks[j].category.id] = categoryWorks[j].category.name;
    // This array will be the element of the set object
    categorySet.add(obj);
  }
  //  This constant retrieves the contents of the set array.
  const category = categorySet.keys().next().value;
  //  This loop will cycle through the Category array
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < category.length; i++) {
    if (category[i]) {
      console.log(category[i]);

      //  Created btn category
      const divcategory1 = document.createElement('div');
      const categoryBouton = document.createElement('button');
      categoryBouton.textContent = category[i];
      categoryBouton.dataset.id = i;

      //  Add elements to the DOM
      divcategory1.appendChild(categoryBouton);
      asideCategory.appendChild(divcategory1);
    }
  }
}

//  Generated menu category using API category(takes as input the category)
export function GeneratedFilterWithAPI(category) {
  const asideCategory = document.querySelector('.menuCategory');
  const divcategory = document.createElement('div');

  //  Created Button "Tous"(display all works as default)
  const btnTous = document.createElement('button');
  btnTous.textContent = 'Tous';
  btnTous.dataset.id = 0;
  divcategory.appendChild(btnTous);
  asideCategory.appendChild(divcategory);

  //  This loop will cycle through the Category array
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < category.length; i++) {
    //  Retrieve each object from the category table
    const categoryName = category[i];

    //  Created btn category
    const divcategory1 = document.createElement('div');
    const categoryBouton = document.createElement('button');
    categoryBouton.textContent = categoryName.name;
    categoryBouton.dataset.id = categoryName.id;

    //  Add elements to the DOM
    divcategory1.appendChild(categoryBouton);
    asideCategory.appendChild(divcategory1);
  }
}

//  Integrate the login page for the site
export function loginConnexion() {
  //  Create parent element for login section()
  const loginSection = document.createElement('section');
  loginSection.id = 'login';

  //  Create the child login section elements
  const h2log = document.createElement('h2');
  h2log.innerHTML = 'Log In';

  const formlog = document.createElement('form');

  //  The way is not defined on the client side (there is no route)
  //  formlog.action="";
  //  The way data is retrieved
  //  formlog.method = "post";

  //  Create child elements of the login form
  const labelmail = document.createElement('label');
  labelmail.htmlFor = 'email';
  labelmail.innerHTML = 'E-mail';

  const Inputmaillog = document.createElement('input');
  Inputmaillog.type = 'email';
  Inputmaillog.id = 'email';
  Inputmaillog.name = 'email';
  Inputmaillog.required = true;

  const labelpassword = document.createElement('label');
  labelpassword.htmlFor = 'password';
  labelpassword.innerHTML = 'Mot de passe';

  const inputpassword = document.createElement('input');
  inputpassword.type = 'password';
  inputpassword.id = 'password';
  inputpassword.name = 'password';
  inputpassword.required = true;

  const spantag = document.createElement('span');

  const inputButton = document.createElement('input');
  inputButton.type = 'submit';
  inputButton.value = 'Se connecter';
  const alog = document.createElement('a');
  /* eslint-disable-next-line no-script-url */
  alog.href = 'javascript:void(0)';
  alog.innerHTML = 'Mot de passe oublié';

  //  Add element in form
  formlog.appendChild(labelmail);
  formlog.appendChild(Inputmaillog);
  formlog.appendChild(labelpassword);
  formlog.appendChild(inputpassword);
  formlog.appendChild(spantag);
  formlog.appendChild(inputButton);
  formlog.appendChild(alog);

  //  Add children from the login section to the parent
  loginSection.appendChild(h2log);
  loginSection.appendChild(formlog);
  document.querySelector('main').appendChild(loginSection);
}


//  Generated the dynamic Banner
export function genererbanniere() {
  const banner = document.querySelector('#bannerSection');

  const abanner = document.createElement('a');
  //  When I click nothing happens (make the a mute)
  /* eslint-disable-next-line no-script-url */
  abanner.href = 'javascript:void(0)';
  const atext = document.createTextNode(' Mode édition');

  const ibanner = document.createElement('i');
  ibanner.className = 'far fa-edit';

  banner.appendChild(ibanner);
  abanner.appendChild(atext);
  banner.appendChild(abanner);
}

//  Generated Modal for view image gallery, add and delete image
export function ajoutModal(listWorks) {
  //  Create div Modal parent on the page
  const maintag = document.querySelector('main');
  const divModal = document.createElement('div');
  divModal.className = 'cont-modal';

  //  Create div tag child of divModal
  const divtag = document.createElement('div');
  divtag.className = 'cont-modal-content';

  //  Create a tag close Modal
  const acloseModal = document.createElement('a');
  /* eslint-disable-next-line no-script-url */
  acloseModal.href = 'javascript:void(0)';
  acloseModal.className = 'icone-topright';

  //  Create i tag
  const icloseModal = document.createElement('i');
  icloseModal.className = 'fa fa-remove';

  //  Create h3 tag
  const h3tag = document.createElement('h3');
  h3tag.innerHTML = 'Galerie photo';

  //  Create tag div
  const divImage = document.createElement('div');
  divImage.className = 'content-img';
  divImage.id = 'sub-container';

  //  Created hr tag
  const hrtag = document.createElement('hr');

  //  Create Button tag add image
  const btnImage = document.createElement('button');
  btnImage.textContent = 'Ajouter une photo';

  //  This loop will cycle through the Works array
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < listWorks.length; i++) {
    //  Retrieves each element of the table
    const listeTravaux = listWorks[i];

    //  Create tag div gallery
    const divgallery = document.createElement('div');
    divgallery.className = 'cont-gallery';
    divgallery.id = 'cont-gallery';

    //  Create of tag image and icone delete image
    const imgtag = document.createElement('img');
    imgtag.src = listeTravaux.imageUrl;
    imgtag.alt = listeTravaux.title;
    imgtag.className = 'z-img';

    const spantag = document.createElement('span');
    spantag.className = 'icone-delete';
    spantag.title = 'Delete image';

    const iconeDelete = document.createElement('i');
    iconeDelete.className = 'fa-solid fa-trash-can';
    iconeDelete.className = 'fa-solid fa-trash-can';
    iconeDelete.dataset.id = listeTravaux.id;
    //  Add image and span in div tag
    divgallery.appendChild(imgtag);
    spantag.appendChild(iconeDelete);
    divgallery.appendChild(spantag);

    //  Add divgallery in parent div tag
    divImage.appendChild(divgallery);
  }

  //  Add children from the Modal for view image gallery section to the parent
  acloseModal.appendChild(icloseModal);
  divtag.appendChild(acloseModal);
  divtag.appendChild(h3tag);
  divtag.appendChild(divImage);
  divtag.appendChild(hrtag);
  divtag.appendChild(btnImage);
  divModal.appendChild(divtag);
  maintag.appendChild(divModal);
}

//  Function Confirm Modal to delete works
export function confirmModal() {
  //  Select div child in the modal gallery
  const divConfirm = document.querySelector('#sub-container');

  //  when the element exists (because when it refreshes the page, it finds that
  // the element does not exist), it returns to execute the instructions
  if (divConfirm) {
    console.log('Hello 2');
    const divold = document.querySelector('.confirm-Modal');

    if (divold) {
      divold.remove();
    }

    //  Create div Modal parent on the page
    const divModal = document.createElement('div');
    divModal.className = 'confirm-Modal';

    //  Create div tag child of divModal
    const divtag = document.createElement('div');
    divtag.className = 'cont-modal-content';
    divtag.style.height = 'auto';

    //  Create tag div
    const divParent = document.createElement('div');
    divParent.id = 'confirm';

    const pTag = document.createElement('p');
    pTag.innerHTML = 'Are you sure to remove this project? ';

    const divClear = document.createElement('div');
    divClear.className = 'close';

    const btnYes = document.createElement('button');
    btnYes.type = 'button';
    btnYes.id = 'btnyes';
    btnYes.textContent = 'Yes';

    const btnNo = document.createElement('button');
    btnNo.type = 'button';
    btnNo.id = 'bntno';
    btnNo.textContent = 'No';

    divClear.appendChild(btnYes);
    divClear.appendChild(btnNo);

    divParent.appendChild(pTag);
    divParent.appendChild(divClear);

    //  Add children from the Modal for view image gallery section to the parent
    divtag.appendChild(divParent);
    divModal.appendChild(divtag);
    divConfirm.appendChild(divModal);
  }
}

//  Function creates Form for send new work to gallery (via the modal )
export function ajoutPhoto(category) {
  //  Retrieve the div tag child of divModal and initialize his contents
  const divSelectParent = document.querySelector('.cont-modal-content');

  const divTag = document.querySelector('#sub-container');
  divTag.className = 'form-modal';
  divTag.innerHTML = ' ';

  //  Create a tag close Modal
  const acloseModal = document.createElement('a');
  /* eslint-disable-next-line no-script-url */
  acloseModal.href = 'javascript:void(0)';
  acloseModal.className = 'icone-topleft';

  //  Create i tag
  const icloseModal = document.createElement('i');
  icloseModal.className = 'fa-solid fa-arrow-left';

  //  change content of h3 tag
  const h3tag = document.querySelector('.cont-modal-content h3');
  h3tag.innerHTML = 'Ajout photo';

  //  Created form modal
  const formtag = document.createElement('form');
  //  The way is not defined on the client side (there is no route)
  //  formlog.action="";
  //  The way data is retrieved
  //  formlog.method = "post";

  //  Create add photo field form
  const inputTag = document.createElement('input');
  inputTag.type = 'file';
  inputTag.accept = 'image/jpg, image/png';
  inputTag.id = 'img-id';
  inputTag.name = 'img-id';
  inputTag.style.display = 'none';

  const labelTag = document.createElement('label');
  labelTag.htmlFor = 'img-id';
  labelTag.className = 'label-form';

  const iTag = document.createElement('i');
  iTag.className = 'fa-regular fa-image   color-faImage';

  const btnTag = document.createElement('a');
  btnTag.type = 'button';
  btnTag.className = 'btn-form';
  btnTag.textContent = '+ Ajouter photo';

  const spanTag = document.createElement('span');
  spanTag.className = 'span-form';
  spanTag.innerHTML = 'jpg, png : 4mo max';

  //  Create span tag for display error message
  const spanForm = document.createElement('span');
  spanForm.id = 'spanErrorMessage';
  spanForm.style.color = '#f5061a';
  spanForm.style.fontSize = '16px';

  //  Create child elements of the modal form
  const labelTitre = document.createElement('label');
  labelTitre.htmlFor = 'title';
  labelTitre.style.color = '#3D3D3D';
  labelTitre.innerHTML = 'Titre';
  labelTitre.className = 'element-form';
  const brTitle = document.createElement('br');

  //  Create input title for form
  const InputTitre = document.createElement('input');
  InputTitre.type = 'title';
  InputTitre.id = 'title';
  InputTitre.name = 'title';
  InputTitre.required = true;

  //  Create label Categorie
  const labelCategorie = document.createElement('label');
  labelCategorie.htmlFor = 'category';
  labelCategorie.style.color = '#3D3D3D';
  labelCategorie.innerHTML = 'Catégorie';
  labelCategorie.className = 'element-form';
  const brCategory = document.createElement('br');

  //  Create select Category for form
  const selectCategorie = document.createElement('select');
  selectCategorie.name = 'category';
  selectCategorie.id = 'category';
  selectCategorie.style.marginBottom = '10px';

  //  First child of select will be empty
  const optionSelect0 = document.createElement('option');
  optionSelect0.value = '';
  optionSelect0.innerHTML = '';
  selectCategorie.appendChild(optionSelect0);

  //  This loop will cycle through the Category array
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < category.length; i++) {
    //  Retrieve each object from the category table
    const categoryName = category[i];
    const optionSelect = document.createElement('option');
    optionSelect.value = categoryName.id;
    optionSelect.innerHTML = categoryName.name;

    selectCategorie.appendChild(optionSelect);
  }

  //  Created hr tag
  const hrtag = document.createElement('hr');
  hrtag.style.width = '100%';
  hrtag.style.marginTop = '20px';
  const htagold = document.querySelector('.cont-modal-content hr');
  htagold.style.display = 'none';

  //  Delete old button for form
  const btnvalider = document.querySelector('.cont-modal-content button');
  btnvalider.style.display = 'none';

  //  Create validate input[type=submit] for form
  const inputValider = document.createElement('input');
  inputValider.type = 'submit';
  inputValider.value = 'Valider';
  inputValider.id = 'id-submit';
  inputValider.style.backgroundColor = '#A7A7A7';
  inputValider.style.margin = '0 auto';
  inputValider.style.width = '250px';

  //  Add children from the Modal for add picture section to the parent
  acloseModal.appendChild(icloseModal);
  divSelectParent.appendChild(acloseModal);

  //  Add children for form
  formtag.appendChild(inputTag);
  labelTag.appendChild(iTag);
  labelTag.appendChild(btnTag);
  labelTag.appendChild(spanTag);

  formtag.appendChild(labelTag);
  formtag.appendChild(labelTitre);
  formtag.appendChild(brTitle);
  formtag.appendChild(InputTitre);
  formtag.appendChild(labelCategorie);
  formtag.appendChild(brCategory);
  formtag.appendChild(selectCategorie);
  formtag.appendChild(spanForm);
  formtag.appendChild(hrtag);
  formtag.appendChild(inputValider);
  divTag.appendChild(formtag);
}

//  Function for Return Gallery Photo Modal and add new project galleryModal
export function returnGalleryModal(listWorks) {
  const iconeArrowLeft = document.querySelector('.icone-topleft');
  const divTag = document.querySelector('#sub-container');
  const hrformtag = document.querySelector('.cont-modal-content form hr');
  //  Delete icon
  iconeArrowLeft.remove();
  //  Clear div contents
  divTag.innerHTML = '';
  divTag.className = 'content-img';

  //  change content of h3 tag
  const h3tag = document.querySelector('.cont-modal-content h3');
  h3tag.innerHTML = 'Galerie photo';

  const htagold = document.querySelector('.cont-modal-content hr');
  htagold.style = '';

  //  Create Button tag add image
  const btnvalider = document.querySelector('.cont-modal-content button');
  btnvalider.style = '';

  //  Delete input[type=submit]

  const inputtag = document.querySelector('#id-submit');
  if (inputtag) {
    inputtag.remove();
    hrformtag.remove();
  }

  //  This loop will cycle through the Works array
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < listWorks.length; i++) {
    //  Retrieves each element of the table
    const listeTravaux = listWorks[i];

    //  Create tag div gallery
    const divgallery = document.createElement('div');
    divgallery.className = 'cont-gallery';
    divgallery.id = 'cont-gallery';

    //  Create of tag image and icone delete image
    const imgtag = document.createElement('img');
    imgtag.src = listeTravaux.imageUrl;
    imgtag.alt = listeTravaux.title;
    imgtag.className = 'z-img';

    const spantag = document.createElement('span');
    spantag.className = 'icone-delete';
    spantag.title = 'Delete image';

    const iconeDelete = document.createElement('i');
    iconeDelete.className = 'fa-solid fa-trash-can';
    iconeDelete.dataset.id = listeTravaux.id;
    //  Add image and span in div tag
    divgallery.appendChild(imgtag);
    spantag.appendChild(iconeDelete);
    divgallery.appendChild(spantag);

    //  Add divgallery in parent div tag
    divTag.appendChild(divgallery);
  }
}
