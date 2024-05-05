

import {genererGalerie, GeneratedFilterWithNoAPI, loginConnexion, Authentification, genererbanniere} from "./travaux.js"; 

// Retrieve works from the HTTP API (from the JSON file) using the fetch function

const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json(); 
console.log(works[0]);  


//Calls up the function for dynamically generating jobs on the website
genererGalerie(works); 


// Retrieve all Category from API

const reponseCategory = await fetch("http://localhost:5678/api/categories"); 
const categorie = await reponseCategory.json(); 

//Get userID OR token 
const usertoken = localStorage.getItem("usertoken");
console.log(usertoken); 

//Call this function to generate menu category 

if (usertoken == null)
{
    GeneratedFilterWithNoAPI(works); 
}
else
{   
    //Create  the Element "modify" after the projects section
    const divtag = document.querySelector(".portfolio-title");
    const atag = document.createElement("a");
    atag.href = "javascript::void";  

    const aicone = document.createElement("i"); 
    aicone.className = "far fa-edit";
    const atext = document.createTextNode(" modifier"); 
    
    atag.appendChild(aicone);
    atag.appendChild(atext); 
    divtag.appendChild(atag); 
}

//Call this function to generate menu category
//GeneratedFilterWithAPI(categorie); 

 
// Filter (display) works by category
const boutonCategorie = document.querySelectorAll(".menuCategory div button");
let filterWorks;


//Browse each category id to filter workss by project category. 
for(let i= 0 ; i< boutonCategorie.length ;i++)
{
    boutonCategorie[i].addEventListener("click", function(event)
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


// Integrate the connection page and attach EventListener to the click event 
const boutonlogin = document.querySelectorAll("nav ul li");
if (usertoken != null)
{
    boutonlogin[2].innerHTML= "logout";
}

boutonlogin[2].addEventListener("click", function()
{
    if (usertoken == null)
    {
        document.querySelector("main").innerHTML = "";
        loginConnexion();
        Authentification();
    }
    else
    {
        // Call the function Logout
        logout(); 
    }
   
});

// Implement action logout
function logout() 
{
    localStorage.clear(); 
    location.assign('http://127.0.0.1:8080'); 
}

// Call the authentication function : will be executed once when the web page is refreshed 
Authentification();         

// Generated the function banner when user is connecting 
if (usertoken != null)
{
    genererbanniere();
}

//Session Timeout Logout
let timeid;
if (usertoken != null)
{
    // Session expire in 1 minute(1*60*1000 milliseconds)
    timeid = setTimeout(logout, 1*60*1000);
}

const bodytag = document.querySelector("body");
bodytag.addEventListener("mouseover", function (event)
{
    if (usertoken != null)
    {
        // Clears a timer set with the setTimeout method
        clearTimeout(timeid);
        // Reset timer
        timeid = setTimeout(logout, 1*60*1000); 
    }

})



