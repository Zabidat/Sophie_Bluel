

import {genererGalerie} from "./travaux.js"; 


// Retrieve works from the HTTP API (from the JSON file) using the fetch function

const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json(); 
console.log(works[0]);  


//Calls up the function for dynamically generating jobs on the website
genererGalerie(works); 



// Retrieve all Category from API

const reponseCategory = await fetch("http://localhost:5678/api/categories"); 
const categorie = await reponseCategory.json(); 

// Generated menu category using API category 
function GeneratedFilterWithAPI(category)
{
    const asideCategory = document.querySelector(".menuCategory");
    const divcategory = document.createElement("div");
    
    // Created Button "Tous"
    const btnTous = document.createElement("button");
    btnTous.textContent = "Tous";
    btnTous.dataset.id = 0; 
    divcategory.appendChild(btnTous);
    asideCategory.appendChild(divcategory);
    
   //This loop will cycle through the Category array  
   for (let i = 0; i < category.length; i++)
   {
        // Retrieve each object from the category table  
        const categoryName = category[i]; 

        //Created btn category
        const divcategory1 = document.createElement("div");
        const categoryBouton = document.createElement("button");
        categoryBouton.textContent = categoryName.name;
        categoryBouton.dataset.id = categoryName.id;  

        //Add elements to the DOM 
        divcategory1.appendChild(categoryBouton);  
        asideCategory.appendChild(divcategory1);  
   }
  
}

//Call this function to generate menu category
//GeneratedFilterWithAPI(categorie); 



// Generated menu category using set object 
function GeneratedFilterWithNoAPI(categoryWorks)
{
    //Create a set object 
    const categorySet = new Set();
    const asideCategory = document.querySelector(".menuCategory");
    const divcategory = document.createElement("div");
    
    //Created Button "Tous"
    const btnTous = document.createElement("button");
    btnTous.textContent = "Tous";
    btnTous.dataset.id = 0; 
    divcategory.appendChild(btnTous);
    asideCategory.appendChild(divcategory);

    //Create empty array 
    let obj =[];

    for(let j=0; j<categoryWorks.length;j++)
    {
        //This array creates a key (corresponds to the category id) with its value (corresponds to the category name)
        obj[categoryWorks[j].category.id]= categoryWorks[j].category.name;
        // This array will be the element of the set object 
        categorySet.add(obj);
    }
    //This constant retrieves the contents of the set array.
    const category = categorySet.keys().next().value;

   //This loop will cycle through the Category array
   for (let i = 0; i < category.length; i++)
   {
      if(category[i])
      {
        console.log(category[i]);

        //Created btn category
        const divcategory1 = document.createElement("div");
        const categoryBouton = document.createElement("button");
        categoryBouton.textContent = category[i];
        categoryBouton.dataset.id = i;   

        // Add elements to the DOM 
        divcategory1.appendChild(categoryBouton);  
        asideCategory.appendChild(divcategory1);  
      }
   }
  
}

GeneratedFilterWithNoAPI(works); 


 
// Filter (display) works by category
const boutonCategorie = document.querySelectorAll(".menuCategory div button");
let filterWorks;


//Browse each category id to filter workss by project category. 
for(let i= 0 ; i< boutonCategorie.length ;i++)
{
    boutonCategorie[i].addEventListener("click", function()
    {

        //Click on the button( The dataset.id = property is used to retrieve the value of the data id attribute) 
        const id = event.target.dataset.id;
        console.log(id);

        if (id == 0)
        {
            filterWorks = works;
            console.log(filterWorks);
            document.querySelector(".gallery").innerHTML = "";
            genererGalerie(filterWorks); 
        } 
        else 
        {
            filterWorks = works.filter(function(work)
            {
                return work.categoryId == id; 
            });
           
        }
        document.querySelector(".gallery").innerHTML = "";
        genererGalerie(filterWorks); 

    });
}



// Integrate the login page for the site

function loginConnexion()
{
    //Create parent element for login section
   const loginSection= document.createElement("section");
   loginSection.id ="login";

    //Create the child login section elements
   const h2log = document.createElement("h2");
   h2log.innerHTML = "Log In";

   const formlog= document.createElement("form");
   formlog.action="#";
   formlog.method = "post";

   //Create child elements of the login form
   const labelmail = document.createElement("label");
   labelmail.for= "email";
   labelmail.innerHTML = "E-mail";

   const Inputmaillog = document.createElement("input");
   Inputmaillog.type = "email";
   Inputmaillog.id ="email";
   Inputmaillog.name ="email";

   const labelpassword = document.createElement("label");
   labelpassword.for= "password";
   labelpassword.innerHTML = "Mot de passe";

   const inputpassword = document.createElement("input");
   inputpassword.type = "password";
   inputpassword.id ="password";
   inputpassword.name ="password";

   const inputButton= document.createElement("input");
   inputButton.type = "submit";
   inputButton.value="Se connecter";
   
   const alog= document.createElement("a");
   alog.href = "javascript::void()";
   alog.innerHTML = "Mot de passe oublié"; 
   

    //Add element in form
   formlog.appendChild(labelmail);
   formlog.appendChild(Inputmaillog);
   formlog.appendChild(labelpassword);
   formlog.appendChild(inputpassword);
   formlog.appendChild(inputButton);
   formlog.appendChild(alog);

   // Add children from the login section to the parent 
   loginSection.appendChild(h2log);
   loginSection.appendChild(formlog);
   document.querySelector("main").appendChild(loginSection);

}


// Integrate the connection page and attach EventListener to the click event 
const boutonlogin = document.querySelectorAll("nav ul li");
boutonlogin[2].addEventListener("click", function()
{
    document.querySelector("main").innerHTML = "";
    loginConnexion();

});




