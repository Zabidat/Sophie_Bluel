

import {recupererDonnees} from "./travaux.js"; 



// Récupération des travaux depuis l API HTTP (depuis le fichier JSON)

const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json(); 


console.log(works[0]); 

//Appel de la function pr genenrer les travaux dans le site web dynamiquement
genererGalerie(works); 


//Function creera des elts html dont le broowzer va generer la page

function genererGalerie(listWorks)
{
    
     // Remove the old static gallery
     const sectionGallery = document.querySelector(".gallery");
     sectionGallery.textContent = "";



    // Generated the dynamic gallery
    for (let i = 0; i < listWorks.length; i++)
    {
        const listeTravaux = listWorks[i]; 

       
        // Creation d une balise figure
        const FigureElement = document.createElement("figure");

        // Creation des balises
        const Image = document.createElement("img");
        Image.src = listeTravaux.imageUrl;
        Image.alt = listeTravaux.title;

        const FigCaption = document.createElement("figcaption");
        FigCaption.innerText = listeTravaux.title;

        // 
        FigureElement.appendChild(Image);
        FigureElement.appendChild(FigCaption); 

        //
        sectionGallery.appendChild(FigureElement); 


    }

}

